import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { useRepo } from './hooks/useRepo';
import { useArticles } from './hooks/useArticles';
import { TokenInput } from './components/TokenInput';
import { ArticleList } from './components/ArticleList';
import { FrontmatterEditor } from './components/FrontmatterEditor';
import { MarkdownPreview } from './components/MarkdownPreview';
import { PublishButton } from './components/PublishButton';
import { parseFrontmatter, stringifyFrontmatter, ArticleFrontmatter } from './lib/frontmatter';
import { Article } from './hooks/useArticles';
import { writeTextFile, readFile } from '@tauri-apps/plugin-fs';

function App() {
  const auth = useAuth();
  const { isAuthenticated, logout } = auth;
  const { repoPath, sync, syncing, error: repoError } = useRepo();
  const { articles } = useArticles(repoPath);

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [body, setBody] = useState('');
  const [frontmatter, setFrontmatter] = useState<ArticleFrontmatter | null>(null);
  const [view, setView] = useState<'edit' | 'preview'>('edit');

  // Sync once after each in-memory authentication session starts.
  useEffect(() => {
    if (isAuthenticated) {
      void sync();
    }
  }, [isAuthenticated, sync]);

  const handleSelectArticle = async (article: Article) => {
    try {
      const contentBytes = await readFile(article.path);
      const content = new TextDecoder().decode(contentBytes);
      const { frontmatter: fm, body: b } = parseFrontmatter(content);
      setSelectedArticle(article);
      setFrontmatter(fm);
      setBody(b);
    } catch (err) {
      console.error('Failed to read article:', err);
    }
  };

  const handleSave = async () => {
    if (!selectedArticle || !frontmatter) return;
    const content = stringifyFrontmatter(frontmatter, body);
    await writeTextFile(selectedArticle.path, content);
  };

  if (!isAuthenticated) {
    return (
      <TokenInput
        login={auth.login}
        loading={auth.loading}
        error={auth.error}
        deviceCode={auth.deviceCode}
        verificationUri={auth.verificationUri}
      />
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left panel - Article list */}
      <aside className="w-64 border-r flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-semibold">Articles</h2>
          <button onClick={logout} className="text-sm text-gray-500 hover:text-gray-700">
            Logout
          </button>
        </div>
        <ArticleList
          articles={articles}
          selectedPath={selectedArticle?.path || null}
          onSelect={handleSelectArticle}
          onNew={() => {
            // TODO: handle new article
          }}
        />
        {repoError && <p className="p-3 text-xs text-red-600">{repoError}</p>}
      </aside>

      {/* Right panel - Editor */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {syncing ? (
          <div className="flex-1 flex items-center justify-center text-gray-400">Syncing repository...</div>
        ) : selectedArticle && frontmatter ? (
          <>
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setView('edit')}
                  className={`px-3 py-1 rounded ${view === 'edit' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => setView('preview')}
                  className={`px-3 py-1 rounded ${view === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                >
                  Preview
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
                >
                  Save
                </button>
                <PublishButton
                  filePath={selectedArticle.path}
                  content={stringifyFrontmatter(frontmatter, body)}
                  onSuccess={() => alert('Published!')}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-3xl mx-auto">
                <FrontmatterEditor
                  frontmatter={frontmatter}
                  onChange={(fm) => setFrontmatter(fm)}
                />
                <div className="mt-6">
                  {view === 'edit' ? (
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="w-full h-96 p-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 font-mono"
                    />
                  ) : (
                    <MarkdownPreview content={body} />
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400">
            Select an article to edit
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

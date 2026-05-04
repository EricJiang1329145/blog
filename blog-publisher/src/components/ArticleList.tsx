import { Article } from '../hooks/useArticles';

interface Props {
  articles: Article[];
  selectedPath: string | null;
  onSelect: (article: Article) => void;
  onNew: () => void;
}

export function ArticleList({ articles, selectedPath, onSelect, onNew }: Props) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={onNew}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          新建文章
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {articles.map(article => (
          <div
            key={article.path}
            onClick={() => onSelect(article)}
            className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
              selectedPath === article.path ? 'bg-blue-50 dark:bg-blue-900/20' : ''
            }`}
          >
            <h3 className="font-medium text-gray-900 dark:text-gray-100">{article.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{article.date}</p>
            {article.category && (
              <span className="inline-block mt-2 text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                {article.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
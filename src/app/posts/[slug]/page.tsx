import Link from "next/link";
import { getPostBySlug } from "../../../../lib/posts";
import type { Metadata } from "next";
import ReadingProgressBar from "../../../components/ReadingProgressBar";
import ShareButton from "../../../components/ShareButton";
import PageViews from "../../../components/PageViews";
import PostEffects from "../../../components/PostEffects";
import ImageLightbox from "../../../components/ImageLightbox";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata | undefined> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return;
  return {
    title: post.title,
    description: post.description,
    keywords: [...post.tags],
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-16">
        <ReadingProgressBar />
        <h1 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-serif)' }}>文章不存在</h1>
        <p className="text-text-secondary mb-8 font-[family-name:var(--font-sans)]">该文章可能已被删除或移动</p>
        <Link href="/" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors font-[family-name:var(--font-sans)] text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回首页
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <ReadingProgressBar />

      <div className="mb-10 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 leading-snug" style={{ fontFamily: 'var(--font-serif)' }}>
          {post.title}
        </h1>
        <div className="flex flex-wrap justify-center gap-3 text-text-muted text-xs font-[family-name:var(--font-sans)] mb-5">
          <span>{new Date(post.date).toISOString().split('T')[0]}</span>
          <span>·</span>
          <span>{post.readingTime}</span>
          <span>·</span>
          <PageViews />
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {post.tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="tag-pill">
              {tag}
            </Link>
          ))}
        </div>
      </div>

      <article className="card-paper p-6 md:p-10 mb-12">
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content || '' }} />
      </article>

      <PostEffects />
      <ImageLightbox />

      <ShareButton slug={slug} title={post.title} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: { '@type': 'Person', name: 'Eric Jiang' },
          }),
        }}
      />

      <div className="flex justify-center">
        <Link href="/" className="inline-flex items-center gap-1.5 text-accent hover:text-accent-secondary transition-colors font-[family-name:var(--font-sans)] text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          返回首页
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const { getAllPosts } = await import("../../../../lib/posts");
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ArticleFrontmatter } from '../lib/frontmatter';
import { generateSlug } from '../lib/frontmatter';

interface Props {
  frontmatter: ArticleFrontmatter;
  onChange: (fm: ArticleFrontmatter) => void;
}

export function FrontmatterEditor({ frontmatter, onChange }: Props) {
  const { register, watch, setValue, reset } = useForm<ArticleFrontmatter>({
    defaultValues: frontmatter,
  });

  const title = watch('title');

  // Sync form with prop changes
  useEffect(() => {
    reset(frontmatter);
  }, [frontmatter, reset]);

  // Auto-generate slug from title
  useEffect(() => {
    if (title && !frontmatter.slug) {
      setValue('slug', generateSlug(title));
    }
  }, [title, frontmatter.slug, setValue]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">标题</label>
        <input
          {...register('title')}
          onChange={(e) => onChange({ ...frontmatter, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Slug</label>
        <input
          {...register('slug')}
          onChange={(e) => onChange({ ...frontmatter, slug: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">日期</label>
        <input
          type="date"
          {...register('date')}
          onChange={(e) => onChange({ ...frontmatter, date: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">分类</label>
        <input
          {...register('category')}
          onChange={(e) => onChange({ ...frontmatter, category: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">标签 (逗号分隔)</label>
        <input
          {...register('tags')}
          onChange={(e) => onChange({
            ...frontmatter,
            tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
          })}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">描述</label>
        <textarea
          {...register('description')}
          onChange={(e) => onChange({ ...frontmatter, description: e.target.value })}
          rows={3}
          className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
        />
      </div>
    </div>
  );
}
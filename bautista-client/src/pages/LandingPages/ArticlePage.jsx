import { useParams } from 'react-router-dom';
import Button from '../../components/Button';
import articles from '../../assets/article-content.js';

function ArticlePage() {
  const { name } = useParams();
  const article = articles.find(article => article.name === name);

  if (!article) {
    return (
      <div className="flex w-full flex-col gap-6">
        <section className="border-y-2 border-pink-100 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
              Error
            </p>
            <h1 className="text-3xl font-bold text-gray-900">Article Not Found</h1>
            <p className="mt-3 text-sm text-gray-400">
              The article you're looking for doesn't exist or may have been removed.
            </p>
            <div className="mt-6">
              <Button to="/articles">← Back to Articles</Button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">

      {/* Header Section */}
      <section className="border-y-2 border-pink-100 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6">
            <Button to="/articles">← Back to Articles</Button>
          </div>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
            Article
          </p>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            {article.name.split('-').map(word => word.charAt(0).toUpperCase() +
            word.slice(1)).join(' ')}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="border-y-2 border-pink-100 bg-pink-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto max-w-3xl">

          {/* Article Image */}
          {article.image && (
            <div className="mb-8 rounded-3xl border-2 border-pink-100 bg-white p-3">
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-2xl object-cover h-72"
              />
            </div>
          )}

          {/* Article Content */}
          <div className="space-y-4">
            {article.content.map((paragraph, index) => (
              <p key={index} className="text-base leading-7 text-gray-500 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-8 border-t-2 border-pink-100 pt-6">
            <Button to="/articles">← Back to Articles</Button>
          </div>

        </div>
      </section>

    </div>
  );
}

export default ArticlePage;
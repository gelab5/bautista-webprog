import { Link } from 'react-router-dom';
import Button from './Button';

const ArticleList = ({ articles }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article, index) => (
        <article key={article.name} className="rounded-3xl border-2 border-pink-100 bg-white p-5 flex flex-col">

          {/* Image */}
          {article.image ? (
            <img
              src={article.image}
              alt={article.title}
              className="w-full rounded-2xl object-cover h-40"
            />
          ) : (
            <div className="flex h-40 items-center justify-center rounded-2xl bg-pink-50 border-2 border-pink-100">
              <div className="h-12 w-12 rounded-full bg-pink-200" />
            </div>
          )}

          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-pink-400">
            Article {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900">{article.title}</h3>
          <p className="mt-3 text-sm leading-6 text-gray-500 flex-1">
            {article.content[0].substring(0, 150)}...
          </p>
          <Link to={`/articles/${article.name}`}>
            <Button className="mt-4">Read More</Button>
          </Link>

        </article>
      ))}
    </div>
  );
};

export default ArticleList;
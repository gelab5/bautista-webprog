import Button from '../components/Button';

const articles = [
  {
    id: 1,
    category: 'Web Development',
    title: 'Getting Started with React',
    description: 'Learn the basics of React including components, props, and state management for building modern web apps.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80',
  },
  {
    id: 2,
    category: 'Styling',
    title: 'Why I Use Tailwind CSS',
    description: 'Tailwind CSS makes styling fast and consistent. Here\'s why it\'s my go-to CSS framework for every project.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80',
  },
  {
    id: 3,
    category: 'Tools',
    title: 'Setting Up Vite for React',
    description: 'Vite is a blazing fast build tool. Here\'s how to set it up with React and Tailwind CSS from scratch.',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80',
  },
  {
    id: 4,
    category: 'Career',
    title: 'Life as an IT Student',
    description: 'Sharing my experience as an IT student — the challenges, learnings, and tips to survive and thrive.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80',
  },
];

const ArticlePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-pink-100 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
              Articles
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Thoughts, Learnings & Tech Writeups
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
              A collection of articles about web development, design, tools, and life as an IT student. Written from personal experience and curiosity.
            </p>
            <div className="mt-6">
              <Button to="/">Back Home</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80"
              alt="Articles"
              className="w-full rounded-2xl object-cover h-64"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="border-y-2 border-pink-100 bg-pink-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
            Featured Articles
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">Latest Posts</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {articles.map((article) => (
            <article key={article.id} className="rounded-3xl border-2 border-pink-100 bg-white p-5 flex flex-col">
              <img
                src={article.image}
                alt={article.title}
                className="w-full rounded-2xl object-cover h-40"
              />
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-pink-400">
                {article.category}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">{article.title}</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500 flex-1">{article.description}</p>
              <Button className="mt-4" variant="primary">Read More</Button>
            </article>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ArticlePage;
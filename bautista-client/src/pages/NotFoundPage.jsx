import Button from '../components/Button';

function NotFoundPage() {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-pink-100 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
              Error
            </p>
            <h1 className="max-w-xl text-6xl font-black leading-tight text-gray-900">
              404
            </h1>
            <h2 className="mt-2 text-2xl font-bold text-gray-700">
              Page Not Found
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
              Oops! The page you're looking for doesn't exist or the link may be broken. Let's get you back on track.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">← Back Home</Button>
              <Button to="/articles">Browse Articles</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-8 flex flex-col items-center justify-center gap-4">
            <p className="text-[120px] font-black leading-none text-pink-100 select-none">
              :(
            </p>
            <p className="text-sm text-gray-400 text-center">
              The link you followed must be broken.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default NotFoundPage;
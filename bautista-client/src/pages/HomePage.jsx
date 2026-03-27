import Button from '../components/Button';

const HomePage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-pink-100 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
              Welcome to my Portfolio
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Hi, I'm Angela Mae Bautista
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
              An IT Student passionate about web development, design, and technology. I build clean, functional, and user-friendly interfaces.
            </p>
            <div className="mt-6 flex gap-3 flex-wrap">
              <Button to="/about" variant="primary">About Me</Button>
              <Button to="/articles">Read Articles</Button>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80"
              alt="Hero"
              className="w-full rounded-2xl object-cover h-64"
            />
          </div>
        </div>
      </section>

      {/* KPI Section */}
      <section className="border-y-2 border-pink-100 bg-pink-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
            My Progress
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">Quick Overview</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">12+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Projects</p>
          </div>
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">08+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Courses</p>
          </div>
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">24+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Screens</p>
          </div>
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">04+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Tech Stacks</p>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="border-y-2 border-pink-100 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
            What I Do
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">My Skills & Interests</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-5">
            <img
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80"
              alt="Web Development"
              className="w-full rounded-2xl object-cover h-44"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Web Development</h3>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Building modern and responsive web applications using React, HTML, CSS, and JavaScript.
            </p>
            <Button className="mt-4" variant="primary">Learn More</Button>
          </article>

          <article className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-5">
            <img
              src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&q=80"
              alt="UI/UX Design"
              className="w-full rounded-2xl object-cover h-44"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">UI/UX Design</h3>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Designing clean and user-friendly interfaces with a focus on layout, spacing, and usability.
            </p>
            <Button className="mt-4" variant="primary">Learn More</Button>
          </article>

          <article className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-5">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=80"
              alt="Continuous Learning"
              className="w-full rounded-2xl object-cover h-44"
            />
            <h3 className="mt-4 text-lg font-semibold text-gray-900">Continuous Learning</h3>
            <p className="mt-3 text-sm leading-6 text-gray-500">
              Always exploring new technologies, frameworks, and tools to grow as an IT professional.
            </p>
            <Button className="mt-4" variant="primary">Learn More</Button>
          </article>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
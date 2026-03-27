import Button from '../components/Button';

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">

      {/* Hero Section */}
      <section className="border-y-2 border-pink-100 bg-white px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-4">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80"
              alt="About Me"
              className="w-full rounded-2xl object-cover h-72"
            />
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
              About Me
            </p>
            <h1 className="max-w-xl text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Passionate IT Student focused on building meaningful digital experiences.
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-7 text-gray-500 sm:text-base">
              I'm Angela Mae Bautista, an IT student with a love for web development and design. I enjoy turning ideas into reality through clean code and thoughtful UI.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">Back Home</Button>
              <Button to="/articles">View Articles</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y-2 border-pink-100 bg-pink-50 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mb-6">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
            My Journey
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-gray-900">Quick Summary</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">05+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Years Studying</p>
          </div>
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">16+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Projects Done</p>
          </div>
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">09+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Subjects Taken</p>
          </div>
          <div className="rounded-3xl border-2 border-pink-200 bg-white p-5">
            <p className="text-2xl font-bold text-pink-400">03+</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">Focus Areas</p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="border-y-2 border-pink-100 bg-white px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
              More About Me
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-gray-900">My Background</h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-5">
                <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Currently taking up Bachelor of Science in Information Technology, with a focus on web and software development.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-5">
                <h3 className="text-lg font-semibold text-gray-900">Experience</h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Hands-on experience through school projects, lab activities, and personal projects using React, Tailwind CSS, and more.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-5">
                <h3 className="text-lg font-semibold text-gray-900">Goals</h3>
                <p className="mt-3 text-sm leading-6 text-gray-500">
                  Aspiring to become a full-stack web developer and contribute to innovative tech solutions in the future.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-pink-100 bg-pink-50 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-pink-400">
              Tech Stack
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {[
                { name: 'HTML', bg: 'bg-orange-100', text: 'text-orange-500' },
                { name: 'CSS', bg: 'bg-blue-100', text: 'text-blue-500' },
                { name: 'JavaScript', bg: 'bg-yellow-100', text: 'text-yellow-600' },
                { name: 'React', bg: 'bg-cyan-100', text: 'text-cyan-500' },
              ].map((tech) => (
                <div key={tech.name} className={`flex aspect-square items-center justify-center rounded-2xl border-2 border-pink-100 ${tech.bg}`}>
                  <p className={`text-sm font-bold ${tech.text}`}>{tech.name}</p>
                </div>
              ))}
            </div>
            <Button className="mt-5" variant="primary">View Projects</Button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
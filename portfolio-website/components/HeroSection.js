export default function HeroSection() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-indigo-50 to-white">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
        Hi, I&apos;m <span className="text-indigo-600">Your Name</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-xl mb-8">
        Full-Stack Developer &mdash; building modern, scalable web experiences.
      </p>
      <div className="flex gap-4">
        <a
          href="/projects"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          View Projects
        </a>
        <a
          href="/contact"
          className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}

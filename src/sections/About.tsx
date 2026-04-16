function About() {
  return (
    <section id="about" className="max-w-5xl mx-auto py-24 px-4">
      <p className="text-sm text-blue-500 font-mono mb-2">01 · about</p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">About me</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

        <div className="text-gray-600 dark:text-gray-400 space-y-4 text-lg leading-relaxed">
          <p>
            I'm a software development student at NTNU Trondheim, passionate about
            building clean and useful software.
          </p>
          <p>
            I enjoy working across the stack — from designing systems in Java to
            building interfaces for the web. I care about writing code that is
            readable, maintainable, and actually solves a problem.
          </p>
          <p>
            Outside of coding I'm interested in investing and personal finance.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-mono text-gray-500 dark:text-gray-500 uppercase tracking-widest mb-6">Currently</p>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-blue-500">▹</span>
              <span className="text-gray-700 dark:text-gray-300">Studying at NTNU Trondheim</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">▹</span>
              <span className="text-gray-700 dark:text-gray-300">Building a stock market simulator in Java</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">▹</span>
              <span className="text-gray-700 dark:text-gray-300">Learning React and web development</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-500">▹</span>
              <span className="text-gray-700 dark:text-gray-300">Open to freelance projects</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About
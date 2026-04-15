function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-gray-950">
      <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
        Hi, I'm Marius
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
        Software Development Student at NTNU
      </p>
      <p className="text-gray-500 dark:text-gray-500 mb-8 max-w-md">
        I build clean and useful software. Passionate about web development and Java.
      </p>
      <div className="flex gap-4">
        <a href="#projects" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition">
          See my work
        </a>
        <a href="#contact" className="border border-gray-300 dark:border-gray-600 hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition">
          Contact me
        </a>
      </div>
    </section>
  )
}

export default Hero
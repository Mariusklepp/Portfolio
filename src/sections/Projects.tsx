import { Link } from 'react-router-dom'

const projects = [
  {
    id: 'millions',
    title: 'Millions',
    description: 'A stock market simulator built in Java with JavaFX. Implements design patterns like Observer, Factory, and dependency injection.',
    tags: ['Java', 'JavaFX', 'OOP', 'Design Patterns'],
    github: 'https://github.com/mappe-2026/Millions',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Personal portfolio website built with React and Tailwind CSS. Features dark/light mode and responsive design.',
    tags: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Mariusklepp/portfolio',
  },
]

function Projects() {
  return (
    <section id="projects" className="max-w-5xl mx-auto py-24 px-4">
      <p className="text-sm text-blue-500 font-mono mb-2">03 · projects</p>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 flex flex-col gap-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a href={project.github} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:text-blue-400 transition">
                GitHub →
              </a>
              <Link to={`/projects/${project.id}`} className="text-sm text-gray-500 hover:text-gray-300 transition">
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
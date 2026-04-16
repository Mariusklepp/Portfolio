import { useParams, Link } from 'react-router-dom'

interface Project {
  title: string
  description: string
  longDescription: string
  tags: string[]
  github: string
}

const projectData: Record<string, Project> = {
  millions: {
    title: 'Millions',
    description: 'A stock market simulator built in Java with JavaFX.',
    longDescription: `Millions is a stock market simulator developed as part of a group project at NTNU. 
    The application allows users to buy and sell stocks, track their portfolio, and simulate market movements.
    
    The project follows object-oriented design principles and implements several design patterns including 
    Observer for real-time updates, Factory for creating transactions, and dependency injection for testability.`,
    tags: ['Java', 'JavaFX', 'OOP', 'Design Patterns'],
    github: 'https://github.com/mappe-2026/Millions',
  },
  portfolio: {
    title: 'Portfolio',
    description: 'Personal portfolio website built with React and Tailwind CSS.',
    longDescription: `This portfolio was built from scratch using React and Tailwind CSS. 
    It features a dark/light mode toggle that remembers the user's preference, 
    smooth animations, and a fully responsive design.`,
    tags: ['React', 'Tailwind CSS', 'Vite'],
    github: 'https://github.com/Mariusklepp/portfolio',
  },
}

function ProjectPage() {
const { id } = useParams<{ id: string }>()
const project = id ? projectData[id] : undefined

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Project not found</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-400">← Back to home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-blue-500 hover:text-blue-400 text-sm mb-8 block">← Back</Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line mb-8">
          {project.longDescription}
        </p>
        <a href={project.github} target="_blank" rel="noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition">
          View on GitHub →
        </a>
      </div>
    </div>
  )
}

export default ProjectPage
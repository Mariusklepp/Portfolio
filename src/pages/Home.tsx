import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

// ── Skills data ──────────────────────────────────────────
interface Skill {
  name: string
  icon: string
}

const skills: Skill[] = [
  { name: 'Java', icon: 'devicon:java' },
  { name: 'JavaScript', icon: 'devicon:javascript' },
  { name: 'HTML', icon: 'devicon:html5' },
  { name: 'CSS', icon: 'devicon:css3' },
  { name: 'React', icon: 'devicon:react' },
  { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
  { name: 'Git', icon: 'devicon:git' },
  { name: 'GitHub', icon: 'devicon:github' },
  { name: 'SQL', icon: 'devicon:mysql' }
]

// ── Projects data ─────────────────────────────────────────
interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  github: string
}

const projects: Project[] = [
  {
    id: 'millions',
    title: 'Millions',
    description: 'A stock market simulator built in Java with JavaFX. Implements design patterns like Observer, Factory, and dependency injection.',
    tags: ['Java', 'JavaFX', 'OOP', 'Design Patterns'],
    github: 'https://github.com/Mariusklepp/millions',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    description: 'Personal portfolio website built with React and Tailwind CSS. Features dark/light mode and responsive design.',
    tags: ['React', 'Tailwind CSS', 'TypeScript'],
    github: 'https://github.com/Mariusklepp/portfolio',
  },
]

// ── SkillCard ─────────────────────────────────────────────
function SkillCard({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        boxShadow: hovered ? '0 0 12px rgba(59, 130, 246, 1)' : 'none',
        borderColor: hovered ? 'rgba(59, 130, 246, 1)' : '',
      }}
      className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3"
    >
      <Icon icon={skill.icon} width={24} height={24} />
      <span className="text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
    </div>
  )
}

// ── Home ──────────────────────────────────────────────────
function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">Hi, I'm Marius</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">Software Development Student at NTNU</p>
        <p className="text-gray-500 mb-8 max-w-md">I build clean and useful software. Passionate about web development and Java.</p>
        <div className="flex gap-4">
          <a href="#projects" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition">See my work</a>
          <a href="#contact" className="border border-gray-300 dark:border-gray-600 hover:border-gray-500 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg transition">Contact me</a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-5xl mx-auto py-24 px-4">
        <p className="text-sm text-blue-500 font-mono mb-2">01 · about</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">About me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="text-gray-600 dark:text-gray-400 space-y-4 text-lg leading-relaxed">
            <p>I'm a software development student at NTNU Trondheim, passionate about building clean and useful software.</p>
            <p>I enjoy working across the stack — from designing systems in Java to building interfaces for the web.</p>
            <p>Outside of coding I'm interested in investing and personal finance.</p>
          </div>
          <div className="space-y-4">
            <p className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-6">Currently</p>
            <div className="space-y-3">
              {['Studying at NTNU Trondheim', 'Building a stock market simulator in Java', 'Learning React and web development', 'Open to freelance projects'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="text-blue-500">▹</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-gray-50 dark:bg-gray-900 py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-sm text-blue-500 font-mono mb-2">02 · tech stack</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {skills.map((skill) => <SkillCard key={skill.name} skill={skill} />)}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto py-24 px-4">
        <p className="text-sm text-blue-500 font-mono mb-2">03 · projects</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 flex flex-col gap-4 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-1">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full">{tag}</span>
                ))}
              </div>
              <div className="flex gap-3">
                <a href={project.github} target="_blank" rel="noreferrer" className="text-sm text-blue-500 hover:text-blue-400 transition">GitHub →</a>
                <Link to={`/projects/${project.id}`} className="text-sm text-gray-500 hover:text-gray-300 transition">Read more →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-gray-50 dark:bg-gray-900 py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-blue-500 font-mono mb-2">04 · contact</p>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Get in touch</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Have a project in mind or just want to say hi? My inbox is always open.</p>
          <a href="mailto:Marius.s.klepp@gmail.com" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition">Say hello</a>
        </div>
      </section>
    </>
  )
}

export default Home
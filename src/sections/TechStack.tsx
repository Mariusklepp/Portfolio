import { Icon } from '@iconify/react'
import { useState } from 'react'

const skills = [
  { name: 'Java', icon: 'devicon:java' },
  { name: 'JavaScript', icon: 'devicon:javascript' },
  { name: 'HTML', icon: 'devicon:html5' },
  { name: 'CSS', icon: 'devicon:css3' },
  { name: 'React', icon: 'devicon:react' },
  { name: 'Tailwind CSS', icon: 'devicon:tailwindcss' },
  { name: 'Git', icon: 'devicon:git' },
  { name: 'GitHub', icon: 'devicon:github' },
  { name: 'SQL', icon: 'devicon:mysql' },
]

interface Skill {
  name: string
  icon: string
}

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
        borderColor: hovered ? 'rgba(59, 130, 246, 1)' : ''
        }}
      className="flex items-center gap-3 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg px-4 py-3 hover:border-blue-500 dark:hover:border-blue-500"
    >
      <Icon icon={skill.icon} width={24} height={24} />
      <span className="text-gray-700 dark:text-gray-300 text-sm">{skill.name}</span>
    </div>
  )
}

function TechStack() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-blue-500 font-mono mb-2">02 · tech stack</p>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TechStack
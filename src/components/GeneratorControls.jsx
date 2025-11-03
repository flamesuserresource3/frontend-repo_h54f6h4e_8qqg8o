import { Shuffle } from 'lucide-react'
import { useState } from 'react'

export default function GeneratorControls({ onGenerate }) {
  const [gender, setGender] = useState('unisex')
  const [style, setStyle] = useState('any')
  const [length, setLength] = useState('any')
  const [count, setCount] = useState(6)
  const [includeSurname, setIncludeSurname] = useState(true)

  const handleGenerate = (e) => {
    e.preventDefault()
    const n = Math.min(30, Math.max(1, Number(count) || 1))
    onGenerate({ gender, style, length, count: n, includeSurname })
  }

  return (
    <section id="generator" className="w-full">
      <form
        onSubmit={handleGenerate}
        className="grid md:grid-cols-5 gap-3 bg-white/80 backdrop-blur rounded-xl p-4 border border-black/5"
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Gender</label>
          <select
            className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900/10"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="unisex">Unisex</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Style</label>
          <select
            className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900/10"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="traditional">Traditional</option>
            <option value="modern">Modern</option>
            <option value="cute">Cute</option>
            <option value="cool">Cool</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Length</label>
          <select
            className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900/10"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          >
            <option value="any">Any</option>
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">How many</label>
          <input
            type="number"
            min={1}
            max={30}
            className="h-10 rounded-lg border-gray-200 focus:ring-2 focus:ring-gray-900/10"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Options</label>
          <div className="h-10 px-3 flex items-center gap-2 rounded-lg border border-gray-200">
            <input
              id="surname"
              type="checkbox"
              checked={includeSurname}
              onChange={(e) => setIncludeSurname(e.target.checked)}
            />
            <label htmlFor="surname" className="text-sm text-gray-700">Include surname</label>
          </div>
        </div>
        <div className="md:col-span-5 flex gap-2">
          <button
            type="submit"
            className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Shuffle size={16} /> Generate
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="px-4 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            Shuffle
          </button>
        </div>
      </form>
    </section>
  )
}

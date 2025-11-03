import { Sparkles } from 'lucide-react'

export default function Header() {
  return (
    <header className="w-full border-b border-black/5 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-fuchsia-500 to-blue-500 grid place-items-center text-white">
            <Sparkles size={18} />
          </div>
          <div className="leading-tight">
            <p className="font-semibold text-gray-900">Nippon Name Studio</p>
            <p className="text-xs text-gray-500">Japanese Name Generator</p>
          </div>
        </div>
        <a
          href="#generator"
          className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors px-4 py-2 rounded-lg"
        >
          Try it now
        </a>
      </div>
    </header>
  )
}

import { Copy } from 'lucide-react'

function NameCard({ name }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(name.full)
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="group p-4 rounded-xl border border-gray-200 bg-white/80 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-gray-900 text-lg">{name.full}</p>
          {name.kana && (
            <p className="text-sm text-gray-600">{name.kana}</p>
          )}
          {name.kanji && (
            <p className="text-sm text-gray-800">{name.kanji}</p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-gray-900"
          aria-label="Copy to clipboard"
        >
          <Copy size={16} />
        </button>
      </div>
      {name.meaning && (
        <p className="text-xs text-gray-500 mt-2">{name.meaning}</p>
      )}
    </div>
  )
}

export default function NameList({ names }) {
  if (!names || names.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        Your names will appear here. Use the generator above to create beautiful Japanese names.
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {names.map((n, i) => (
        <NameCard key={i + n.full} name={n} />
      ))}
    </div>
  )
}

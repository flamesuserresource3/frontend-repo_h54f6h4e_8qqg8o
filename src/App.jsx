import { useMemo, useState } from 'react'
import Header from './components/Header'
import GeneratorControls from './components/GeneratorControls'
import NameList from './components/NameList'
import Footer from './components/Footer'

// Minimal curated dataset with light metadata for quality results
const DATA = {
  surnames: [
    'Sato', 'Suzuki', 'Takahashi', 'Tanaka', 'Watanabe', 'Ito', 'Nakamura', 'Kobayashi',
    'Yamamoto', 'Kato', 'Yoshida', 'Yamada', 'Sasaki', 'Yamaguchi', 'Matsumoto'
  ],
  given: [
    { romaji: 'Akira', kana: 'あきら', kanji: '明・晃', meaning: 'bright, clear', gender: 'unisex', tags: ['traditional','cool'], length: 'medium' },
    { romaji: 'Hikaru', kana: 'ひかる', kanji: '光', meaning: 'light', gender: 'unisex', tags: ['modern','cool'], length: 'medium' },
    { romaji: 'Kaoru', kana: 'かおる', kanji: '薫・馨', meaning: 'fragrance', gender: 'unisex', tags: ['traditional'], length: 'medium' },
    { romaji: 'Rei', kana: 'れい', kanji: '玲・礼・零', meaning: 'grace; bell; zero', gender: 'unisex', tags: ['cool','modern'], length: 'short' },
    { romaji: 'Jun', kana: 'じゅん', kanji: '純・潤・淳', meaning: 'pure; moisten', gender: 'unisex', tags: ['traditional'], length: 'short' },
    { romaji: 'Nao', kana: 'なお', kanji: '直・尚', meaning: 'honest; esteem', gender: 'unisex', tags: ['modern'], length: 'short' },

    { romaji: 'Sakura', kana: 'さくら', kanji: '桜', meaning: 'cherry blossom', gender: 'female', tags: ['cute','traditional'], length: 'medium' },
    { romaji: 'Hana', kana: 'はな', kanji: '花', meaning: 'flower', gender: 'female', tags: ['cute','traditional'], length: 'short' },
    { romaji: 'Yui', kana: 'ゆい', kanji: '結衣・唯', meaning: 'bind; only', gender: 'female', tags: ['cute','modern'], length: 'short' },
    { romaji: 'Aoi', kana: 'あおい', kanji: '葵', meaning: 'hollyhock; blue/green', gender: 'female', tags: ['modern','cool'], length: 'short' },
    { romaji: 'Mei', kana: 'めい', kanji: '芽依', meaning: 'sprout, rely', gender: 'female', tags: ['cute','modern'], length: 'short' },
    { romaji: 'Haruka', kana: 'はるか', kanji: '遥・春香', meaning: 'distant; spring fragrance', gender: 'female', tags: ['traditional'], length: 'long' },
    { romaji: 'Akari', kana: 'あかり', kanji: '灯・明里', meaning: 'light; brightness', gender: 'female', tags: ['cute','modern'], length: 'medium' },

    { romaji: 'Haru', kana: 'はる', kanji: '春', meaning: 'spring', gender: 'male', tags: ['traditional','cute'], length: 'short' },
    { romaji: 'Hiro', kana: 'ひろ', kanji: '宏・寛・広', meaning: 'broad; generous', gender: 'male', tags: ['traditional'], length: 'short' },
    { romaji: 'Ren', kana: 'れん', kanji: '蓮', meaning: 'lotus', gender: 'male', tags: ['cool','modern'], length: 'short' },
    { romaji: 'Sora', kana: 'そら', kanji: '空', meaning: 'sky', gender: 'male', tags: ['cool','modern'], length: 'short' },
    { romaji: 'Yuki', kana: 'ゆうき/ゆき', kanji: '勇気・雪', meaning: 'courage; snow', gender: 'male', tags: ['cool','traditional'], length: 'medium' },
    { romaji: 'Daichi', kana: 'だいち', kanji: '大地', meaning: 'great earth', gender: 'male', tags: ['traditional'], length: 'medium' },
    { romaji: 'Kaito', kana: 'かいと', kanji: '海斗・快斗', meaning: 'sea/big dipper; fast', gender: 'male', tags: ['modern','cool'], length: 'medium' },
    { romaji: 'Takumi', kana: 'たくみ', kanji: '匠', meaning: 'artisan', gender: 'male', tags: ['traditional'], length: 'medium' }
  ]
}

function pickWeighted(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function filterGiven({ gender, style, length }) {
  return DATA.given.filter((g) => {
    const genderOk = gender === 'unisex' ? true : g.gender === gender || g.gender === 'unisex'
    const styleOk = style === 'any' ? true : g.tags.includes(style)
    const lengthOk = length === 'any' ? true : g.length === length
    return genderOk && styleOk && lengthOk
  })
}

function generateNames(options, count) {
  const givenPool = filterGiven(options)
  const backupPool = filterGiven({ gender: options.gender, style: 'any', length: 'any' })
  const names = []

  for (let i = 0; i < count; i++) {
    const given = (givenPool.length ? pickWeighted(givenPool) : pickWeighted(backupPool))
    const surname = options.includeSurname ? pickWeighted(DATA.surnames) : ''
    const full = options.includeSurname ? `${surname} ${given.romaji}` : given.romaji

    names.push({
      full,
      kana: options.includeSurname ? undefined : given.kana, // keep list clean; focus on given kana
      kanji: given.kanji,
      meaning: given.meaning,
    })
  }

  return names
}

export default function App() {
  const [names, setNames] = useState([])

  const initial = useMemo(() => generateNames({ gender: 'unisex', style: 'any', length: 'any', includeSurname: true }, 6), [])

  const handleGenerate = (opts) => {
    const result = generateNames(opts, opts.count)
    setNames(result)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-blue-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4">
        <section className="py-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-black text-white">
            New • Japanese Name Generator
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Generate authentic-sounding Japanese names in seconds
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Choose style, gender and length — then spin up beautiful, culturally grounded name ideas for characters, brands and more.
          </p>
        </section>

        <GeneratorControls onGenerate={handleGenerate} />

        <section className="mt-6">
          <NameList names={names.length ? names : initial} />
        </section>
      </main>
      <Footer />
    </div>
  )
}

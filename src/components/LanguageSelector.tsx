import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLanguages, languageLabels, type SupportedLanguage } from '../i18n/config'

const languageFlags: Record<SupportedLanguage, string> = {
  en: '🇺🇸',
  'zh-CN': '🇨🇳',
  'zh-TW': '🇹🇼',
  ja: '🇯🇵',
  ko: '🇰🇷',
  es: '🇪🇸',
}

export default function LanguageSelector() {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentLang = (i18n.language || 'en') as SupportedLanguage

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSelect(lang: SupportedLanguage) {
    i18n.changeLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t('language.label')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          height: 36,
          padding: '0 10px',
          borderRadius: 8,
          border: '1px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text)',
          cursor: 'pointer',
          fontSize: 14,
          transition: 'background-color 0.3s, border-color 0.3s, color 0.3s',
        }}
      >
        <span style={{ fontSize: 16 }}>{languageFlags[currentLang]}</span>
        <span>{languageLabels[currentLang]}</span>
        <span style={{ fontSize: 10, marginLeft: 2 }}>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t('language.label')}
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 4,
            padding: 4,
            minWidth: 160,
            borderRadius: 8,
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
            listStyle: 'none',
            zIndex: 100,
          }}
        >
          {supportedLanguages.map((lang) => (
            <li key={lang}>
              <button
                role="option"
                aria-selected={lang === currentLang}
                onClick={() => handleSelect(lang)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  width: '100%',
                  padding: '8px 10px',
                  border: 'none',
                  borderRadius: 6,
                  background: lang === currentLang ? 'var(--color-border)' : 'transparent',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: 14,
                  textAlign: 'left',
                  transition: 'background-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (lang !== currentLang) {
                    e.currentTarget.style.backgroundColor = 'var(--color-border)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (lang !== currentLang) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <span style={{ fontSize: 16 }}>{languageFlags[lang]}</span>
                <span>{languageLabels[lang]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

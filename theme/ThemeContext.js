import React, { createContext, useCallback, useEffect, useState } from 'react'

const defaultState = {
  auto: false,
  dark: false,
  toggleDark: () => {},
  toggleAuto: () => {},
}

const ThemeContext = createContext(defaultState)

const ThemeProvider = ({ children }) => {
  const [auto, setAuto] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const lsDark = localStorage.getItem('dark')
    if (lsDark === null) {
      setAuto(true)
      console.log('[Detect System] Follow System preference')
    } else {
      setDark(JSON.parse(lsDark))
      console.log('[Detect System] Follow LocalStorage i.e:%s', lsDark)
    }
  }, [])

  const handleMediaQuery = useCallback(
    (e) => {
      const isDark = e.matches
      console.log(
        '[Update Theme] Setting theme from mq.. systemPrefersDark:%s',
        isDark
      )
      setTheme(isDark)
    },
    [auto]
  )

  useEffect(() => {
    if (!auto) {
      return
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', handleMediaQuery)
    handleMediaQuery(media)
    return () => media.removeEventListener('change', handleMediaQuery)
  }, [handleMediaQuery])

  const setTheme = (dMode) => {
    setDark(dMode)
    const doc = document.documentElement
    const themes = ['light', 'dark']
    if (dMode) {
      doc.classList.remove(...themes)
      doc.classList.add('dark')
    } else {
      doc.classList.remove(...themes)
      doc.classList.add('light')
    }
  }

  const toggleAuto = () => {
    if (!auto) {
      localStorage.removeItem('dark')
      setAuto(!auto)
    } else {
      localStorage.setItem('dark', dark)
      setAuto(!auto)
    }
  }

  const toggleDark = () => {
    localStorage.setItem('dark', JSON.stringify(!dark))
    console.log('[Update Theme] Setting theme from ls.. lsDark:%s', !dark)
    setTheme(!dark)
  }

  return (
    <ThemeContext.Provider
      value={{
        auto,
        dark,
        toggleDark,
        toggleAuto,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeContext
export { ThemeProvider }

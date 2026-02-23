import { createContext, useContext, useEffect, useState } from "react"

const ThemeProviderContext = createContext({})

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem(storageKey)
    return stored || defaultTheme
  })

  // Debug: Log when theme changes
  useEffect(() => {
    console.log("Theme state changed to:", theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
      console.log("Applied system theme:", systemTheme)
      return
    }

    root.classList.add(theme)
    console.log("Applied theme:", theme)
  }, [theme])

  const value = {
    theme,
    setTheme: (newTheme) => {
      console.log("Setting theme to:", newTheme) // Debug log
      localStorage.setItem(storageKey, newTheme)
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
import { useEffect, useState } from "react"

const useDarkMode = () => {

  const [state, setState] = useState(false)

  // Initialize
  useEffect(() => {
    const enabled = window.localStorage.getItem("dark-mode-enabled")
    if (enabled !== undefined) {
      setState(JSON.parse(enabled))
    }
  }, [])

  // Update when state changes
  useEffect(() => {
    if (state)
      window.document.body.classList.add("dark-mode")
    else
      window.document.body.classList.remove("dark-mode")
  }, [state])

  const toggle = () => {
    window.localStorage.setItem("dark-mode-enabled", (!state).toString())
    setState(!state)
  }

  const setDark = () => {
    if (!state) {
      window.localStorage.setItem("dark-mode-enabled", true.toString())
      setState(true)
    }
  }

  const setLight = () => {
    if (state) {
      window.localStorage.setItem("dark-mode-enabled", false.toString())
      setState(false)
    }
  }

  return { state, toggle, setDark, setLight }
}

export default useDarkMode
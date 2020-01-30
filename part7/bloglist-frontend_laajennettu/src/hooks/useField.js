import { useState } from "react"

const useField = (type) => {
  const [value, setValue] = useState("")

  const onChange = event => setValue(event.target.value)

  const reset = () => setValue("")

  const inputParams = { type, value, onChange }

  return { type, value, onChange, reset, inputParams }
}

export default useField
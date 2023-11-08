import { useState } from "react"

interface ComponentProps {
  defaultState?: boolean
}

const useLoading = ({ defaultState = false }: ComponentProps) => {
  const [loading, setLoading] = useState(defaultState)
  const toggleLoading = () => setLoading((prev) => !prev)
  const updLoading = (condition: boolean) => setLoading(condition)
  return { loading, toggleLoading, updLoading }
}

export default useLoading

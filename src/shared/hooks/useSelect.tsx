import { useState } from "react"

interface SelectedItemProps {
  label: string
  value: string
}

export const useSelect = () => {
  const [selected, selectedSet] = useState<SelectedItemProps | null>(null)
  const selectHandler = (item: SelectedItemProps | null) => {
    selectedSet(item)
  }
  
  return {
    selectedItems: selected,
    onSelect: selectHandler,
  }
}

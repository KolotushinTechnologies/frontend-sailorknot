import { useState } from "react"

interface SelectedItemProps {
  label: string
  value: string
}

export const useMultiSelect = () => {
  const [selected, selectedSet] = useState<SelectedItemProps[]>([])
  const selectHandler = (item: SelectedItemProps) => {
    const match = selected.find((findItem) => findItem.value === item.value)
    if (!match) {
      selectedSet((prev) => [...prev, item])
    } else {
      const filtered = selected.filter((findItem) => findItem.value !== item.value)
      selectedSet(filtered)
    }
  }

  return {
    selectedItems: selected,
    onSelect: selectHandler,
  }
}

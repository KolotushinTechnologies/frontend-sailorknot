export interface DocumentProps {
  title: string
  documents: DocumentItem[]
}

export interface DocumentItem {
  name: string
  additionDocuments?: string[]
}

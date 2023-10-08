import { Store, registerInDevtools } from "pullstate"
import { ReactNode } from "react"
import { SelectFileProps } from "../types"

interface ModalStoreProps {
  modalStoreIsActive: boolean
  modalStoreTitle: ReactNode
  modalStoreConfirm?: () => Promise<void | undefined>
  modalStoreCancel?: () => Promise<void | undefined>

  documentModalIsActive: boolean
  selectedFile: SelectFileProps | null
}

export const ModalStore = new Store<ModalStoreProps>({
  modalStoreIsActive: false,
  modalStoreTitle: "",
  modalStoreConfirm: undefined,
  modalStoreCancel: undefined,

  documentModalIsActive: false,
  selectedFile: null,
})

export const modalStoreToggle = (condition: boolean) => {
  ModalStore.update((store) => {
    store.modalStoreIsActive = condition
  })
}

export const documentModalIsActiveToggle = (condition: boolean) => {
  ModalStore.update((store) => {
    store.documentModalIsActive = condition
  })
}

export const selectedFileHandler = (file: SelectFileProps | null) => {
  ModalStore.update((store) => {
    store.selectedFile = file
  })
}

registerInDevtools({
  ModalStore,
})

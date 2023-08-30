import { Store, registerInDevtools } from "pullstate"
import { ReactNode } from "react"

interface ModalStoreProps {
  modalStoreIsActive: boolean
  modalStoreTitle: ReactNode
  modalStoreConfirm?: () => Promise<void | undefined>
  modalStoreCancel?: () => Promise<void | undefined>
}

export const ModalStore = new Store<ModalStoreProps>({
  modalStoreIsActive: false,
  modalStoreTitle: "",
  modalStoreConfirm: undefined,
  modalStoreCancel: undefined,
})

export const modalStoreToggle = (condition: boolean) => {
  ModalStore.update((store) => {
    store.modalStoreIsActive = condition
  })
}

registerInDevtools({
  ModalStore,
})

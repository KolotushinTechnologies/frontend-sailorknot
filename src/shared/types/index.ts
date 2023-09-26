import { GetUserResponse } from "../http/services/authService/types/getUser"

export type ProfileProps = {
  [K in keyof GetUserResponse]: K extends "data" ? GetUserResponse["data"] | null : GetUserResponse[K]
}

export interface SelectFileProps {
  file: File
  name: string
  isNew: boolean
  url?: string
}

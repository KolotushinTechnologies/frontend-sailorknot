export interface GetOneResponse {
  _id: string
  name: string
  lastname: string
  surname: string
  dateBirth: string
  speciality: string
  phoneNumber: string
  city: string
  balance: number
  roles: string[]
  documents: Array<{
    name: string
    link: string
    _id: string
    manualFirstField?: string
    manualSecondField?: string
  }>
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UpdateUserParams {
  user_id: string
}

export interface UpdateUserBody {
  name: string
  lastname: string
  surname: string
  dateBirth: string
  speciality: string
  phoneNumber: string
  city: string
}

export interface UpdateUserResponse {
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
  documents: string[]
  createdAt: string
  updatedAt: string
  __v: number
  comment: string
}

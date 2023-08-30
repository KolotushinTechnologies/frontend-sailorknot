export interface GetAllResponse {
  meta: Meta
  users: User[]
}

export interface User {
  id: string
  email: string
  isActivated: boolean
  roles: Role[]
}

interface Role {
  id: number
  name: string
}

interface Meta {
  page: number
  total: number
  pageSize: number
  pageCount: number
}

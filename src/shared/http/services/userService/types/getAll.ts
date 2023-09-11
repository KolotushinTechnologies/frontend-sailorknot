export interface GetAllResponse {
  meta: Meta
  users: User[]
}

interface Meta {
  page: number
  total: number
  pageSize: number
  pageCount: number
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

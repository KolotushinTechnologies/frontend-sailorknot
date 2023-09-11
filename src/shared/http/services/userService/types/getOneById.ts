export interface GetOneResponse {
  id: string
  email: string
  isActivated: boolean
  profile: Profile
  roles: Role[]
}

interface Role {
  id: number
  name: string
}

interface Profile {
  clientProfile: ClientProfile
  sellerProfile: ClientProfile
}

interface ClientProfile {
  id: string
  content: string
  name: string
}

export interface CreateAdRequest {
  title: string
  companyName: string
  ship: string
  typeOfFishing: string
  flightDuration: string
  jobTitle: string
  salaryPerMonth: string
  description?: string // This field is optional
}

export interface CreateAdResponse {
  data: {
    title: string
    companyName: string
    ship: string
    typeOfFishing: string
    flightDuration: string
    jobTitle: string
    salaryPerMonth: string
    description?: string // This field is optional
    agentProfile: string
    _id: string
    createdAt: string
    updatedAt: string
    __v: number
  }
}

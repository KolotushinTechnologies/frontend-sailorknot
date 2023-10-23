export interface UpdateAdByIdRequest {
  ad_id: string // The ID of the ad you want to update
  title: string
  companyName: string
  ship: string
  typeOfFishing: string
  flightDuration: string
  jobTitle: string
  salaryPerMonth: string
  description?: string // This field is optional
}

export interface UpdateAdByIdResponse {
  _id: string
  title: string
  companyName: string
  ship: string
  typeOfFishing: string
  flightDuration: string
  jobTitle: string
  salaryPerMonth: string
  description?: string // This field is optional
  agentProfile: string
  createdAt: string
  updatedAt: string
  __v: number
}

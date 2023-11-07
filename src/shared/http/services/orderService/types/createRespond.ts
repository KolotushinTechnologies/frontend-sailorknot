export interface CreateRespondParams {
  ad_id: string | number
}

export interface CreateRespondBody {
  description?: string
}

export interface CreateRespondResponse {
  _id: string;
  title: string;
  companyName: string;
  ship: string;
  typeOfFishing: string;
  flightDuration: string;
  jobTitle: string;
  salaryPerMonth: string;
  description: string;
  agentProfile: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  responses: Response[];
}

interface Response {
  _id: string;
  user: string;
  ad: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
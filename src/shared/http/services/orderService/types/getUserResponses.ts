export interface GetUserResponsesParams {
  ad_id: string | number
}

export interface GetUserResponsesResponse {
  _id: string;
  user: User;
  ad: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface User {
  _id: string;
  name: string;
  lastname: string;
  surname: string;
  dateBirth: string;
  speciality: string;
  phoneNumber: string;
  city: string;
  balance: number;
  roles: string[];
  documents: Document[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Document {
  name: string;
  link: string;
  _id: string;
}
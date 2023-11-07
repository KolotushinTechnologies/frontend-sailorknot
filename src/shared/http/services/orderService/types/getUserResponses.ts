export interface GetUserResponsesParams {
  ad_id: string | number
}

export interface GetUserResponsesResponse {
  _id: string;
  user: string;
  ad: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
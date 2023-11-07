export interface GetAgentResponsesParams {
  ad_id: string | number
}

export interface GetAgentResponsesResponse {
  _id: string;
  user: string;
  ad: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
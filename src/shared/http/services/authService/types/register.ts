export interface RegisterRequest {
  name: string;
  lastname: string;
  surname: string;
  dateBirth: string;
  speciality: string;
  phoneNumber: string;
  city: string;
  balance: string;
  password: string;
}

export interface RegisterResponse {
  token: string
}

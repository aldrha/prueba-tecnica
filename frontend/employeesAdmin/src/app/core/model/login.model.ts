export class LoginRequestModel {
  email: string;
  password?: string;
}

export class LoginResponseModel  {
  status:  string;
  code: number;
  message: string;
  data:    Response;
}

export class Response {
  token: string;
  user:  User;
}

export class User  {
  id:                number;
  name:              string;
  email:             string;
  email_verified_at: null;
  created_at:        Date;
  updated_at:        Date;
}

 
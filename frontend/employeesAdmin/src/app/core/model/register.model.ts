export class RegisterRequestModel {
    name: string;
    email: string;
    password?: string;
    password_confirmation?: string;
  }

export class RegisterModel  {
    status:  string;
    code:    number;
    message: string;
    data:    Response;
    error?: Error;
}

export class Response {
    token: string;
    user:  User;
}

export class User  {
    name:       string;
    email:      string;
    updated_at: Date;
    created_at: Date;
    id:         number;
}

export class Error {
    name:     string[];
    email:    string[];
    password: string[];
}
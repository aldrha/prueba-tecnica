export class ResponseModel<T> {
  code: number;
  message: string;
  data: T;
  token?: string;
  new_birthdate?: string;
}

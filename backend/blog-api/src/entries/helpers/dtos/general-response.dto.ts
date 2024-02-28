export interface GeneralResponse<T> {
  code: number;
  messsage: string;
  data: T;
}

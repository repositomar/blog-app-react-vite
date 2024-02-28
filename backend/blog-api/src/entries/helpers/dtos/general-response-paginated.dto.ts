import { GeneralResponse } from './general-response.dto';

export interface GeneralResponsePaginated<T> extends GeneralResponse<T> {
  totalRecords: number;
  page: number;
}

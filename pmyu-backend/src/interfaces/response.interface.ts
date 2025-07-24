import { STATUS_CODES } from "../enums";
export interface IResponse {
  code: STATUS_CODES;
  data: unknown;
  error: unknown;
  message: string;
}

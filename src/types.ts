export type JsonObject = Record<string, unknown>;

export interface ApiResponse<T = unknown> {
  code: number;
  status: string;
  message: string;
  data?: T;
}

export interface BSICardsConfig {
  publicKey?: string;
  secretKey?: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
}

export interface CardCreationPayload extends JsonObject {
  useremail: string;
  nameoncard: string;
  pin: string;
}

export interface VisaCreatePayload extends JsonObject {
  useremail: string;
  nameoncard: string;
  nationalidnumber: string;
  nationalidimage: string;
  userphoto: string;
  dob: string;
}

export interface DigitalCreateVirtualPayload extends JsonObject {
  useremail: string;
  firstname: string;
  lastname: string;
  dob: string;
  address1: string;
  postalcode: string;
  city: string;
  country: string;
  state: string;
  countrycode: string;
  phone: string;
}

export interface DigitalVisaCreateVirtualPayload extends JsonObject {
  useremail: string;
  firstname: string;
  lastname: string;
}


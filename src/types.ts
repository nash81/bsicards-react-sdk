// Wallet Withdrawal Fee
export interface WalletWithdrawalFeePayload extends JsonObject {
  uuid: string;
  to_address: string;
  amount: string;
  coin: string;
  useremail: string;
}

export interface WalletWithdrawalFeeResponse extends JsonObject {
  fee: string;
  [key: string]: unknown;
}

// Wallet Withdraw
export interface WalletWithdrawPayload extends JsonObject {
  uuid: string;
  to_address: string;
  amount: string;
  coin: string;
  useremail: string;
  memo?: string;
}

export interface WalletWithdrawResponse extends JsonObject {
  tx_hash: string;
  [key: string]: unknown;
}

// Wallet Withdraw Status
export interface WalletWithdrawStatusPayload extends JsonObject {
  tx_hash: string;
  coin: string;
}

export interface WalletWithdrawStatusResponse extends JsonObject {
  status: string;
  [key: string]: unknown;
}

// Wallet Get Specific Address
export interface WalletGetSpecificAddressResponse extends JsonObject {
  uuid: string;
  address: string;
  coin: string;
  created_at?: string;
  balances?: Record<string, string>;
}

// Wallet Get Balance
export interface WalletGetBalanceResponse extends JsonObject {
  balances: Record<string, string>;
}
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

// Wallet
export interface CreateWalletAddressPayload extends JsonObject {
  useremail: string;
  coin: string;
}

export interface WalletAddress {
  uuid: string;
  address: string;
  coin: string;
  useremail: string;
  mnemonic?: string | null;
  private_key?: string;
}

// Swap
export interface SwapCurrenciesResponse extends JsonObject {
  currencies: string[];
}

export interface SwapStatusResponse extends JsonObject {
  status: string;
  transaction_id: string;
  [key: string]: unknown;
}

export interface SwapEstimatePayload extends JsonObject {
  from: string;
  to: string;
  network_from: string;
  network_to: string;
  amount: number;
}

export interface SwapEstimateResponse extends JsonObject {
  estimated_amount: number;
  rate: number;
  [key: string]: unknown;
}

export interface SwapCreatePayload extends JsonObject {
  coin_from: string;
  coin_to: string;
  network_from: string;
  network_to: string;
  deposit_amount: number;
  withdrawal: string;
  withdrawal_extra_id?: string;
}

export interface SwapCreateResponse extends JsonObject {
  transaction_id: string;
  deposit_address: string;
  [key: string]: unknown;
}

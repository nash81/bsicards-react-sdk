import { BSICardsError, BSICardsValidationError } from "./errors";
import {
  ApiResponse,
  BSICardsConfig,
  CardCreationPayload,
  DigitalCreateVirtualPayload,
  DigitalVisaCreateVirtualPayload,
  VisaCreatePayload
} from "./types";

const DEFAULT_BASE_URL = "https://cards.bsigroup.tech/api/";

interface RuntimeEnv {
  BSICARDS_PUBLIC_KEY?: string;
  BSICARDS_SECRET_KEY?: string;
}

function getRuntimeEnv(): RuntimeEnv {
  return (globalThis as typeof globalThis & { process?: { env?: RuntimeEnv } }).process?.env ?? {};
}

export class BSICardsClient {
  private publicKey: string;
  private secretKey: string;
  private baseUrl: string;
  private fetchImpl: typeof fetch;

  constructor(config: BSICardsConfig = {}) {
    const env = getRuntimeEnv();
    this.publicKey = config.publicKey ?? env.BSICARDS_PUBLIC_KEY ?? "";
    this.secretKey = config.secretKey ?? env.BSICARDS_SECRET_KEY ?? "";
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    this.fetchImpl = config.fetchImpl ?? fetch;
  }

  setPublicKey(publicKey: string): this {
    this.publicKey = publicKey;
    return this;
  }

  setSecretKey(secretKey: string): this {
    this.secretKey = secretKey;
    return this;
  }

  getPublicKey(): string {
    return this.publicKey;
  }

  getSecretKey(): string {
    return this.secretKey;
  }

  // MasterCard
  mastercardCreateCard(useremail: string, nameoncard: string, pin: string) {
    const body: CardCreationPayload = { useremail, nameoncard, pin };
    return this.post("newcard", body);
  }

  mastercardGetAllCards(useremail: string) {
    return this.post("getallcard", { useremail });
  }

  mastercardGetPendingCards(useremail: string) {
    return this.post("getpendingcards", { useremail });
  }

  mastercardGetCard(useremail: string, cardid: string) {
    return this.post("getcard", { useremail, cardid });
  }

  mastercardGetTransactions(useremail: string, cardid: string) {
    return this.post("getcardtransactions", { useremail, cardid });
  }

  mastercardChangePin(useremail: string, cardid: string, pin: string) {
    return this.post("changepin", { useremail, cardid, pin });
  }

  mastercardFreezeCard(useremail: string, cardid: string) {
    return this.post("blockcard", { useremail, cardid });
  }

  mastercardUnfreezeCard(useremail: string, cardid: string) {
    return this.post("unblockcard", { useremail, cardid });
  }

  mastercardFundCard(useremail: string, cardid: string, amount: string) {
    return this.post("fundcard", { useremail, cardid, amount });
  }

  // Visa
  visaCreateCard(
    useremail: string,
    nameoncard: string,
    nationalidnumber: string,
    nationalidimage: string,
    userphoto: string,
    dob: string
  ) {
    const body: VisaCreatePayload = {
      useremail,
      nameoncard,
      nationalidnumber,
      nationalidimage,
      userphoto,
      dob
    };
    return this.post("visanewcard", body);
  }

  visaGetAllCards(useremail: string) {
    return this.post("visagetallcard", { useremail });
  }

  visaGetPendingCards(useremail: string) {
    return this.post("visagetpendingcards", { useremail });
  }

  visaGetCard(useremail: string, cardid: string) {
    return this.post("visagetcard", { useremail, cardid });
  }

  visaGetTransactions(useremail: string, cardid: string) {
    return this.post("visagetcardtransactions", { useremail, cardid });
  }

  visaFreezeCard(useremail: string, cardid: string) {
    return this.post("visablockcard", { useremail, cardid });
  }

  visaUnfreezeCard(useremail: string, cardid: string) {
    return this.post("visaunblockcard", { useremail, cardid });
  }

  visaFundCard(useremail: string, cardid: string, amount: string) {
    return this.post("visafundcard", { useremail, cardid, amount });
  }

  // Digital Wallet
  digitalCreateVirtualCard(payload: DigitalCreateVirtualPayload) {
    return this.post("digitalnewvirtualcard", payload);
  }

  digitalGetAllCards(useremail: string) {
    return this.post("digitalgetallvirtualcards", { useremail });
  }

  digitalGetCard(useremail: string, cardid: string) {
    return this.post("digitalgetvirtualcard", { useremail, cardid });
  }

  digitalFundCard(useremail: string, cardid: string, amount: string) {
    return this.post("digitalfundcard", { useremail, cardid, amount });
  }

  digitalFreezeCard(useremail: string, cardid: string) {
    return this.post("digitalblockcard", { useremail, cardid });
  }

  digitalUnfreezeCard(useremail: string, cardid: string) {
    return this.post("digitalunblockcard", { useremail, cardid });
  }

  digitalCheck3DS(useremail: string) {
    return this.post("checkwallet", { useremail });
  }

  digitalApprove3DS(useremail: string, cardid: string, eventId: string) {
    return this.post("approve3ds", { useremail, cardid, eventId });
  }

  digitalTerminateCard(useremail: string, cardid: string) {
    return this.post("terminatedigitalcard", { useremail, cardid });
  }

  digitalCreateAddonCard(useremail: string, cardid: string) {
    return this.post("createaddon", { useremail, cardid });
  }

  digitalGetLoyaltyPoints(useremail: string, cardid: string) {
    return this.post("digitalcardpoints", { useremail, cardid });
  }

  digitalRedeemPoints(useremail: string, cardid: string) {
    return this.post("redeempoints", { useremail, cardid });
  }

  // Digital Visa Wallet
  digitalVisaCreateVirtualCard(payload: DigitalVisaCreateVirtualPayload) {
    return this.post("digital-wallet-visa/create-card", payload);
  }

  digitalVisaGetAllCards(useremail: string) {
    return this.post("digital-wallet-visa/get-all-cards", { useremail });
  }

  digitalVisaGetCard(useremail: string, cardid: string) {
    return this.post("digital-wallet-visa/get-card", { useremail, cardid });
  }

  digitalVisaFundCard(useremail: string, cardid: string, amount: string) {
    return this.post("digital-wallet-visa/fund-card", { useremail, cardid, amount });
  }

  digitalVisaGetOtp(useremail: string, cardid: string) {
    return this.post("digital-wallet-visa/get-otp", { useremail, cardid });
  }

  digitalVisaFreezeCard(useremail: string, cardid: string) {
    return this.post("digital-wallet-visa/block-card", { useremail, cardid });
  }

  digitalVisaUnfreezeCard(useremail: string, cardid: string) {
    return this.post("digital-wallet-visa/unblock-card", { useremail, cardid });
  }

  // Administrator
  getWalletBalance() {
    return this.get("admin/balance");
  }

  getDeposits() {
    return this.get("admin/deposits");
  }

  getTransactions() {
    return this.get("admin/transactions");
  }

  getAllVisaCards() {
    return this.get("admin/visacards");
  }

  getAllMastercards() {
    return this.get("admin/mastercards");
  }

  getAllDigitalCards() {
    return this.get("admin/digitalcards");
  }

  private async get<T = unknown>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>("GET", endpoint);
  }

  private async post<T = unknown>(endpoint: string, body: object): Promise<ApiResponse<T>> {
    return this.request<T>("POST", endpoint, body);
  }

  private async request<T = unknown>(
    method: "GET" | "POST",
    endpoint: string,
    body?: object
  ): Promise<ApiResponse<T>> {
    this.validateCredentials();

    const url = new URL(endpoint, this.baseUrl).toString();
    const response = await this.fetchImpl(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        publickey: this.publicKey,
        secretkey: this.secretKey
      },
      body: body ? JSON.stringify(body) : undefined
    });

    const json = (await response.json()) as ApiResponse<T>;

    if (!response.ok) {
      throw new BSICardsError(json.message || "Request failed", json.code || response.status);
    }

    return json;
  }

  private validateCredentials(): void {
    if (!this.publicKey || !this.secretKey) {
      throw new BSICardsValidationError(
        "Missing API keys. Provide publicKey and secretKey in client config or environment variables."
      );
    }
  }
}


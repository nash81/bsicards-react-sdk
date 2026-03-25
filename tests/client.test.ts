import { describe, expect, it, vi } from "vitest";
import { BSICardsClient } from "../src/client";
import { BSICardsValidationError } from "../src/errors";

function mockFetch(json: unknown, ok = true, status = 200) {
  return vi.fn(async () => ({
    ok,
    status,
    json: async () => json
  })) as unknown as typeof fetch;
}

describe("BSICardsClient", () => {
  it("throws when credentials are missing", async () => {
    const client = new BSICardsClient({ fetchImpl: mockFetch({}) });
    await expect(client.getWalletBalance()).rejects.toBeInstanceOf(BSICardsValidationError);
  });

  it("calls visa get all endpoint with required payload", async () => {
    const fetchImpl = mockFetch({ code: 200, status: "success", message: "ok", data: [] });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    await client.visaGetAllCards("test@bsigroup.tech");

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url)).toContain("visagetallcard");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual({ useremail: "test@bsigroup.tech" });
  });

  it("implements administrator GET endpoint", async () => {
    const fetchImpl = mockFetch({ code: 200, status: "success", message: "ok", data: [] });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    await client.getDeposits();

    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url)).toContain("admin/deposits");
    expect(init.method).toBe("GET");
  });

  it("implements digital 3ds approval endpoint", async () => {
    const fetchImpl = mockFetch({ code: 200, status: "success", message: "ok" });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    await client.digitalApprove3DS("test@bsigroup.tech", "card-1", "evt-1");

    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url)).toContain("approve3ds");
    expect(JSON.parse(init.body as string)).toEqual({
      useremail: "test@bsigroup.tech",
      cardid: "card-1",
      eventId: "evt-1"
    });
  });

  it("implements digital visa virtual card creation endpoint", async () => {
    const fetchImpl = mockFetch({ code: 201, status: "success", message: "created" });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    const payload = {
      useremail: "test@bsigroup.tech",
      firstname: "John",
      lastname: "Doe"
    };

    await client.digitalVisaCreateVirtualCard(payload);

    const [url, init] = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls[0];
    expect(String(url)).toContain("digital-wallet-visa/create-card");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body as string)).toEqual(payload);
  });

  it("implements digital visa wallet lookup endpoints", async () => {
    const fetchImpl = mockFetch({ code: 200, status: "success", message: "ok" });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    await client.digitalVisaGetAllCards("test@bsigroup.tech");
    await client.digitalVisaGetCard("test@bsigroup.tech", "card-1");

    const calls = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls;
    expect(String(calls[0][0])).toContain("digital-wallet-visa/get-all-cards");
    expect(JSON.parse(calls[0][1].body as string)).toEqual({ useremail: "test@bsigroup.tech" });

    expect(String(calls[1][0])).toContain("digital-wallet-visa/get-card");
    expect(JSON.parse(calls[1][1].body as string)).toEqual({
      useremail: "test@bsigroup.tech",
      cardid: "card-1"
    });
  });

  it("implements digital visa wallet management endpoints", async () => {
    const fetchImpl = mockFetch({ code: 200, status: "success", message: "ok" });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    await client.digitalVisaFundCard("test@bsigroup.tech", "card-1", "50.00");
    await client.digitalVisaGetOtp("test@bsigroup.tech", "card-1");
    await client.digitalVisaFreezeCard("test@bsigroup.tech", "card-1");
    await client.digitalVisaUnfreezeCard("test@bsigroup.tech", "card-1");

    const calls = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls;
    expect(String(calls[0][0])).toContain("digital-wallet-visa/fund-card");
    expect(JSON.parse(calls[0][1].body as string)).toEqual({
      useremail: "test@bsigroup.tech",
      cardid: "card-1",
      amount: "50.00"
    });

    expect(String(calls[1][0])).toContain("digital-wallet-visa/get-otp");
    expect(JSON.parse(calls[1][1].body as string)).toEqual({
      useremail: "test@bsigroup.tech",
      cardid: "card-1"
    });

    expect(String(calls[2][0])).toContain("digital-wallet-visa/block-card");
    expect(JSON.parse(calls[2][1].body as string)).toEqual({
      useremail: "test@bsigroup.tech",
      cardid: "card-1"
    });

    expect(String(calls[3][0])).toContain("digital-wallet-visa/unblock-card");
    expect(JSON.parse(calls[3][1].body as string)).toEqual({
      useremail: "test@bsigroup.tech",
      cardid: "card-1"
    });
  });

  it("implements Wallet As A Service - Swap endpoints", async () => {
    const fetchImpl = mockFetch({ code: 200, status: "success", message: "ok", data: [] });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    await client.swapGetCurrencies();
    await client.swapGetStatus("txid-123");
    await client.swapGetEstimate({ from: "BTC", to: "USDT-TRC20", network_from: "BTC", network_to: "TRC20", amount: 0.5 });
    await client.swapCreate({ coin_from: "BTC", coin_to: "USDT-TRC20", network_from: "BTC", network_to: "TRC20", deposit_amount: 0.5, withdrawal: "address", withdrawal_extra_id: "NA" });

    const calls = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls;
    expect(String(calls[0][0])).toContain("exchange/currencies");
    expect(calls[0][1].method).toBe("GET");
    expect(String(calls[1][0])).toContain("exchange/status?transaction_id=txid-123");
    expect(calls[1][1].method).toBe("GET");
    expect(String(calls[2][0])).toContain("exchange/estimate");
    expect(calls[2][1].method).toBe("POST");
    expect(JSON.parse(calls[2][1].body as string)).toEqual({ from: "BTC", to: "USDT-TRC20", network_from: "BTC", network_to: "TRC20", amount: 0.5 });
    expect(String(calls[3][0])).toContain("exchange/create");
    expect(calls[3][1].method).toBe("POST");
    expect(JSON.parse(calls[3][1].body as string)).toEqual({ coin_from: "BTC", coin_to: "USDT-TRC20", network_from: "BTC", network_to: "TRC20", deposit_amount: 0.5, withdrawal: "address", withdrawal_extra_id: "NA" });
  });

  it("implements Wallet As A Service - Wallet endpoints", async () => {
    const fetchImpl = mockFetch({ code: 200, status: "success", message: "ok", data: [] });
    const client = new BSICardsClient({
      publicKey: "pk_test",
      secretKey: "sk_test",
      fetchImpl
    });

    await client.walletCreateAddress({ useremail: "test@bsigroup.tech", coin: "PAXG" });
    await client.walletGetAllAddresses("test@bsigroup.tech");

    // New endpoints
    await client.walletGetSpecificAddress("uuid-123", "test@bsigroup.tech");
    await client.walletGetBalance("uuid-123", "test@bsigroup.tech");
    await client.walletWithdrawalFee({ uuid: "uuid-123", to_address: "address", amount: "10.0", coin: "PAXG", useremail: "test@bsigroup.tech" });
    await client.walletWithdraw({ uuid: "uuid-123", to_address: "address", amount: "10.0", coin: "PAXG", useremail: "test@bsigroup.tech" });
    await client.walletWithdrawStatus({ tx_hash: "0xabc", coin: "PAXG" });

    const calls = (fetchImpl as unknown as ReturnType<typeof vi.fn>).mock.calls;
    expect(String(calls[0][0])).toContain("wallet/create-address");
    expect(calls[0][1].method).toBe("POST");
    expect(JSON.parse(calls[0][1].body as string)).toEqual({ useremail: "test@bsigroup.tech", coin: "PAXG" });
    expect(String(calls[1][0])).toContain("wallet/addresses?useremail=test%40bsigroup.tech");
    expect(calls[1][1].method).toBe("GET");
    expect(String(calls[2][0])).toContain("wallet/address/uuid-123?useremail=test%40bsigroup.tech");
    expect(calls[2][1].method).toBe("GET");
    expect(String(calls[3][0])).toContain("wallet/balance?uuid=uuid-123&useremail=test%40bsigroup.tech");
    expect(calls[3][1].method).toBe("GET");
    expect(String(calls[4][0])).toContain("wallet/withdrawal-fee");
    expect(calls[4][1].method).toBe("POST");
    expect(JSON.parse(calls[4][1].body as string)).toEqual({ uuid: "uuid-123", to_address: "address", amount: "10.0", coin: "PAXG", useremail: "test@bsigroup.tech" });
    expect(String(calls[5][0])).toContain("wallet/withdraw");
    expect(calls[5][1].method).toBe("POST");
    expect(JSON.parse(calls[5][1].body as string)).toEqual({ uuid: "uuid-123", to_address: "address", amount: "10.0", coin: "PAXG", useremail: "test@bsigroup.tech" });
    expect(String(calls[6][0])).toContain("wallet/withdrawal-status");
    expect(calls[6][1].method).toBe("POST");
    expect(JSON.parse(calls[6][1].body as string)).toEqual({ tx_hash: "0xabc", coin: "PAXG" });
  });
});

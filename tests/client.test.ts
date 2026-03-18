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
});


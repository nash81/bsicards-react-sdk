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
});


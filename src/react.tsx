import React, { createContext, ReactNode, useContext, useMemo } from "react";
import { BSICardsClient } from "./client";
import { BSICardsConfig } from "./types";

const BSICardsContext = createContext<BSICardsClient | null>(null);

export interface BSICardsProviderProps {
  config: BSICardsConfig;
  children: ReactNode;
}

export function BSICardsProvider({ config, children }: BSICardsProviderProps) {
  const client = useMemo(() => new BSICardsClient(config), [config]);
  return <BSICardsContext.Provider value={client}>{children}</BSICardsContext.Provider>;
}

export function useBSICardsClient(): BSICardsClient {
  const client = useContext(BSICardsContext);
  if (!client) {
    throw new Error("useBSICardsClient must be used within BSICardsProvider");
  }
  return client;
}

export function useBSICards() {
  const client = useBSICardsClient();
  return {
    // MasterCard
    mastercardCreateCard: client.mastercardCreateCard.bind(client),
    mastercardGetAllCards: client.mastercardGetAllCards.bind(client),
    mastercardGetPendingCards: client.mastercardGetPendingCards.bind(client),
    mastercardGetCard: client.mastercardGetCard.bind(client),
    mastercardGetTransactions: client.mastercardGetTransactions.bind(client),
    mastercardChangePin: client.mastercardChangePin.bind(client),
    mastercardFreezeCard: client.mastercardFreezeCard.bind(client),
    mastercardUnfreezeCard: client.mastercardUnfreezeCard.bind(client),
    mastercardFundCard: client.mastercardFundCard.bind(client),

    // Visa
    visaCreateCard: client.visaCreateCard.bind(client),
    visaGetAllCards: client.visaGetAllCards.bind(client),
    visaGetPendingCards: client.visaGetPendingCards.bind(client),
    visaGetCard: client.visaGetCard.bind(client),
    visaGetTransactions: client.visaGetTransactions.bind(client),
    visaFreezeCard: client.visaFreezeCard.bind(client),
    visaUnfreezeCard: client.visaUnfreezeCard.bind(client),
    visaFundCard: client.visaFundCard.bind(client),

    // Digital Wallet
    digitalCreateVirtualCard: client.digitalCreateVirtualCard.bind(client),
    digitalGetAllCards: client.digitalGetAllCards.bind(client),
    digitalGetCard: client.digitalGetCard.bind(client),
    digitalFundCard: client.digitalFundCard.bind(client),
    digitalFreezeCard: client.digitalFreezeCard.bind(client),
    digitalUnfreezeCard: client.digitalUnfreezeCard.bind(client),
    digitalCheck3DS: client.digitalCheck3DS.bind(client),
    digitalApprove3DS: client.digitalApprove3DS.bind(client),
    digitalTerminateCard: client.digitalTerminateCard.bind(client),
    digitalCreateAddonCard: client.digitalCreateAddonCard.bind(client),
    digitalGetLoyaltyPoints: client.digitalGetLoyaltyPoints.bind(client),
    digitalRedeemPoints: client.digitalRedeemPoints.bind(client),

    // Digital Visa Wallet
    digitalVisaCreateVirtualCard: client.digitalVisaCreateVirtualCard.bind(client),
    digitalVisaGetAllCards: client.digitalVisaGetAllCards.bind(client),
    digitalVisaGetCard: client.digitalVisaGetCard.bind(client),
    digitalVisaFundCard: client.digitalVisaFundCard.bind(client),
    digitalVisaGetOtp: client.digitalVisaGetOtp.bind(client),
    digitalVisaFreezeCard: client.digitalVisaFreezeCard.bind(client),
    digitalVisaUnfreezeCard: client.digitalVisaUnfreezeCard.bind(client),

    // Administrator
    getWalletBalance: client.getWalletBalance.bind(client),
    getDeposits: client.getDeposits.bind(client),
    getTransactions: client.getTransactions.bind(client),
    getAllVisaCards: client.getAllVisaCards.bind(client),
    getAllMastercards: client.getAllMastercards.bind(client),
    getAllDigitalCards: client.getAllDigitalCards.bind(client)
  };
}


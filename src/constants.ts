export const EDSOTOKEN = "0x7c6831403FDB8D2e19fDD4EDDAeB1ccCC34c3A16"
export const FAUCET = "0x6D228ccb80427d152D36B3079CF027327783BEae"

export type nftSearchType = {
  total?: number | undefined;
  page?: number | undefined;
  page_size?: number | undefined;
  result?: ({
      token_address: string;
      token_id: string;
      contract_type: string;
      token_uri: string;
      metadata: string;
      synced_at: string;
  } & {
      token_hash: unknown;
  })[] | undefined;
}

export type resultType = {
  token_address: string;
  token_id: string;
  contract_type: string;
  token_uri?: string | undefined;
  metadata?: string | undefined;
  synced_at?: string | undefined;
  amount?: string | undefined;
  name: string;
  symbol: string;
}
export interface PriceLevel{
  price: number,
  quantity: number
}

export interface OrderBook{
  symbol: string,
  bids: PriceLevel[],
  asks: PriceLevel[]
}

'use client'
import React, {useEffect, useRef} from 'react';
import {OrderBook} from "@/types";
import {useGlobal} from "@/hooks/useGlobal";

interface OrderBookComponentProps {
}


export const OrderBookComponent = (props: OrderBookComponentProps) => {
  const {
    orderBook
  } = useGlobal();
  if (!orderBook || !orderBook.sellBook || !orderBook.buyBook) return null

  return (
    <div className='w-full h-full overflow-y-auto'>
      <p>{orderBook.symbol}</p>
      <p>SELL</p>
      {orderBook.sellBook
        .sort((a: any, b: any) => b.price - a.price)
        .map((item: any, index: number) => (
          <div key={index}>
            {item.price} {item.totalQuantity}
          </div>
        ))}
      <p>BUY</p>
      {orderBook.buyBook
        .sort((a: any, b: any) => b.price - a.price)
        .map((item: any, index: number) => (
          <div key={index}>
            {item.price} {item.totalQuantity}
          </div>
        ))}
    </div>
  );
};

'use client'
import {CandlestickComponent} from "@/components/CandlestickComponent";
import {OrderBookComponent} from "@/components/OrderBookComponent";
import {CreateOrderComponent} from "@/components/CreateOrderComponent";
import {GlobalProvider} from "@/hooks/useGlobal";

export default function Home() {
  return (
    <GlobalProvider>
      <main className="flex w-full h-full flex-col items-center justify-between p-4 bg-white">
        <div className='flex w-full'>
          <CreateOrderComponent/>
        </div>
        <div className='flex w-full h-full'>
          <div className='w-4/5'>
            <CandlestickComponent/>
          </div>
          <div className='w-1/5 h-full overflow-y-auto'>
            <OrderBookComponent/>
          </div>
        </div>
      </main>
    </GlobalProvider>
  );
}

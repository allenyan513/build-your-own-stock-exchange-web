'use client'
import {createContext, useContext, useEffect, useState} from 'react';

interface GlobalProps {
  handleChange: any;
  handleSubmit: any;
  formData: any;
  candlestickData: any;
  orderBook: any;
}

const GlobalContext = createContext<GlobalProps | null>(null);

export function GlobalProvider({children}: { children: any }) {

  const symbol = 'APPLE'
  const interval = '1m'
  const startOfThisDay = new Date()
  startOfThisDay.setHours(0, 0, 0, 0)
  const endOfThisDay = new Date()
  endOfThisDay.setHours(23, 59, 59, 999)

  const [formData, setFormData] = useState({
    side: '',
    symbol: '',
    price: 0,
    quantity: 0,
  });
  const [candlestickData, setCandlestickData] = useState([])
  const [orderBook, setOrderBook] = useState({});

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // 在这里处理表单提交，例如发送数据到服务器
    console.log('Form submitted:', formData);
    try {
      const response = await fetch('http://localhost:3000/orders/random', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          symbol: formData.symbol,
          side: formData.side,
          price: Number(formData.price),
          quantity: Number(formData.quantity),
          orderType: 'LIMIT',
        }),
      });
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  ///:symbol/:interval'
  const fetchCandlestickData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/market-data/candlestick/${symbol}/${interval}?startTime=${startOfThisDay.toISOString()}&endTime=${endOfThisDay.toISOString()}`);
      const data = await response.json();
      setCandlestickData(data)
      setTimeout(() => {
        fetchCandlestickData()
      }, 2000)
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const fetchOrderBook = async () => {
    try {
      //'/order-book/:level/:symbol/:depth'
      const response = await fetch(`http://localhost:3000/market-data/order-book/L2/${symbol}/8`);
      const data = await response.json();
      console.log('data:', data)
      setOrderBook(data)
      setTimeout(() => {
        fetchOrderBook()
      }, 2000)
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    fetchCandlestickData()
    fetchOrderBook()
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        handleChange,
        handleSubmit,
        formData,
        candlestickData,
        orderBook,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobal() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
}

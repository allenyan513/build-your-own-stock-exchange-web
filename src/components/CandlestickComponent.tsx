'use client'
import {createChart, ColorType} from 'lightweight-charts';
import React, {useEffect, useRef} from 'react';
import {useGlobal} from "@/hooks/useGlobal";

interface CandlestickComponentProps {
}

export const CandlestickComponent = (props: CandlestickComponentProps) => {
  const backgroundColor = 'white';
  const lineColor = '#2962FF';
  const textColor = 'black';
  const areaTopColor = '#2962FF';
  const areaBottomColor = 'rgba(41, 98, 255, 0.28)';
  const candlestickRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  const {
    candlestickData,
  } = useGlobal()

  useEffect(() => {
    if (!candlestickRef.current || !volumeRef.current) {
      return;
    }
    const handleResize = () => {
      chart.applyOptions({width: candlestickRef?.current?.clientWidth});
    };

    const chart = createChart(candlestickRef.current, {
      layout: {
        background: {type: ColorType.Solid, color: backgroundColor},
        textColor,
      },
      width: candlestickRef.current.clientWidth,
      height: 300,
      timeScale:{
        timeVisible: true,
        secondsVisible: true,
      }
    });
    chart.timeScale().fitContent();
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    })
    const candlestickSeriesData = candlestickData.map((item: any) => {
      return {
        time: Date.parse(item.timestamp)/1000,
        open: Number(item.open),
        high: Number(item.high),
        low: Number(item.low),
        close: Number(item.close),
      };
    })

    candlestickSeries.setData(candlestickSeriesData);
    chart.timeScale().fitContent();


    const volumeChart = createChart(volumeRef.current, {
      layout: {
        background: {type: ColorType.Solid, color: backgroundColor},
        textColor,
      },
      width: volumeRef.current.clientWidth,
      height: 300,
      timeScale:{
        timeVisible: true,
        secondsVisible: true,
      }
    });
    volumeChart.timeScale().fitContent();
    const areaSeries = volumeChart.addAreaSeries({
      lineColor, topColor: areaTopColor,
      bottomColor: areaBottomColor
    });
    const areaSeriesData = candlestickData.map((item: any) => {
      return {time: Date.parse(item.timestamp)/1000, value: item.volume};
    })
    areaSeries.setData(areaSeriesData);
    volumeChart.timeScale().fitContent();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
      volumeChart.remove();
    };
  }, [candlestickData]);

  return (
    <div className='w-full h-full'>
      <div
        className='w-full h-96 '
        ref={candlestickRef}/>
      <div
        className='w-full h-96'
        ref={volumeRef}/>
    </div>
  );
};

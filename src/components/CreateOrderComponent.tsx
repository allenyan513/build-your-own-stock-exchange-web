'use client'
import React, {useEffect, useRef, useState} from 'react';
import {OrderBook} from "@/types";
import {useGlobal} from "@/hooks/useGlobal";

interface CreateOrderComponentProps {
}

export const CreateOrderComponent = (props: CreateOrderComponentProps) => {

  const {
    handleChange,
    handleSubmit,
    formData,
  } = useGlobal();

  return (
    <div className='w-full h-full'>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="side" className='w-8'>Side:</label>
          <input
            type="text"
            id="side"
            name="side"
            value={formData.side}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="symbol" className='w-16'>Symbol:</label>
          <input
            type="text"
            id="symbol"
            name="symbol"
            value={formData.symbol}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

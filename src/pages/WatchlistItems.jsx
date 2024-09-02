import React from 'react';
import { Second } from './Portfolio';
import { First,Flex } from '../components/Helpers2';




export default function WatchlistItems({stock}) {
  return (
    <div>
      <Flex>
        <First>
        <p>Name: {stock.name}</p>
        <p>Price: {stock.price}</p>
        </First>
        <Second>
        <p>Market Cap: {stock.market_cap}</p>
        </Second>
      </Flex>
      
      
    </div>
  )
}

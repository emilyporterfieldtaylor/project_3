import React from 'react';
import Header from '../../components/Header/index';
import HotItemsList from '../../components/HottemsList/index'
import './style.css';

function HotItems () {
  return (
    <div className='main'>
      <Header />
      <HotItemsList />
    </div>
  )
}


export default HotItems;
// components/BarCard.js
'use client'

import { baseRoute } from '@/utils/route';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const BarCard = ({ bar }:any) => {
  const [enabled, setEnabled] = useState(bar.is_active);
  console.log(bar,'bar')
  const toggleEnabled = (id:any) => {
    setEnabled(!enabled);
    console.log(enabled,'enable')
    // is_active
    var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "id": id,
  "is_active":!enabled ? '1' : '0'
});

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseRoute}togglebar`, requestOptions)
  .then(response => response.json())
  .then((result )=> {
    toast.success(result.message)
  
    console.log(result)})
  .catch(error => console.log('error', error));
  };

  return (
    <div className={`bg-white p-4 shadow-md rounded-lg ${enabled ? '' : 'opacity-50'}`}>
      <img src={bar.image} alt={bar.title} className="w-full h-32 object-cover rounded-lg mb-4" />
      <h2 className="text-xl font-semibold mb-2">{bar.title}</h2>
      <p className="text-gray-600 mb-2">{bar.description}</p>
      <p className="text-gray-600 mb-4">Rating: {bar.rating}</p>
      <button onClick={()=>toggleEnabled(bar.bar_id)} className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none ${enabled ? 'hover:bg-blue-600' : 'cursor-not-allowed'}`}>
        {enabled ? 'Disable' : 'Enable'}
      </button>
      <ToastContainer/>
    </div>
  );
};

export default BarCard;

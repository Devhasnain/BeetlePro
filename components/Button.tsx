'use client'

import React from 'react'

const Button = ({children,className,onClick,type}:any) => {
  return (
    <button onClick={onClick} type={type} className={`text-white font-inter py-2 px-4 rounded-3xl bg-[#4100FA] hover:bg-[#4300fab7] ${className}`}>{children}</button>
  )
}

export default Button
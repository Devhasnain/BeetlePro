'use client'
import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Button from '@/components/Button'
import { redirect, useRouter } from 'next/navigation'
import { CounterContext } from '@/ThemeContext'
import { baseRoute } from '@/utils/route'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Signup = () => {
  const router = useRouter() 

  const {dispatch,state} = useContext(CounterContext);
    const [loginUser, setLoginUser] = useState<any>({
      firstname:'',lastname:'', email:'', password:'',mobile:"", confirmPassword:"" 
    });
  
    const [error, setError] = useState<any>('');

    const handlerChange = (e:any) =>{
      const {value,name} = e.target
      setLoginUser({...loginUser,[name]:value})
    }
  
   
  const handleSubmit = async (e:any) => {
    const {mobile,firstname,lastname,email,password} = loginUser
    e.preventDefault();

    if (!mobile||!lastname||!firstname||!email||!password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "role_type": "3",
  "signup_type": "Email",
  mobile,lastname,firstname,email,password
})

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch(`${baseRoute}user-register`, requestOptions)
  .then(response => response.json())
  .then((result) =>{
    if (!result.status) {
      toast.error('Email already registered ')
      return
    } 
    if(result.status){
      toast.success('User Create Successfull')
      setLoginUser({
          firstname:'',lastname:'', email:'', password:'',mobile:"", confirmPassword:"" 
      })
      dispatch({type:'USER',payload:{...result.token_detail,...result.detail}})
      localStorage.setItem('token',JSON.stringify(result.token_detail.access_token))
      localStorage.setItem('user',JSON.stringify(result.detail))
      router.push("home");
    }
    console.log(result)
  })
  .catch(error => console.log('error', error));
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('token')
    if(token) router.push('home')
}, [])


  
  return (
    <div className=" mx-auto mt-8 max-w-[1500px]  min-h-screen relative flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-8">
      <div>
        <h2 className="mt-4 text-start text-[40px] font-medium font-poppin uppercase text-white">sign up</h2>
        <div className="text-start  text-white text-[18px] font-medium font-poppin uppercase text-greentext">
        Already Member?
        <Link href="/login">
      <span className=' text-[#4100FA] ml-4 cursor-pointer'>Sign in</span>
          </Link> 
      </div>
      </div>
      <form className="mt-8 space-y-6" >
       <div className="flex gap-4 items-center">
       <div className='w-full'>
          <label htmlFor="firstname" className="block text-sm font-medium text-white">
          First Name
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
          placeholder='First Name'
            className="text-white mt-1 py-3 px-4 bg-[#8560ed42] focus:ring-indigo-500 outline-none focus:border-indigo-500 block  shadow-sm sm:text-sm border-gray-300 rounded-2xl"
            value={loginUser.firstname}
            onChange={handlerChange}
          />
        </div>
        <div className='w-full'>
          <label htmlFor="lastname" className="block text-sm font-medium text-white">
          Last Name
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder='Last Name'
            className="text-white mt-1 py-3 px-4 bg-[#8560ed42] focus:ring-indigo-500 outline-none focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-2xl"
            value={loginUser.lastname}
            onChange={handlerChange}
          />
        </div>
       </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white">
             Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder='Email Address'
            autoComplete="email"
            className="text-white mt-1 py-3 px-4 bg-[#8560ed42] focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-2xl"
            value={loginUser.email}
            onChange={handlerChange}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-white">
               Password
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder='**************'
            className="text-white mt-1 py-3 px-4 bg-[#8560ed42] focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-2xl"
            value={loginUser.password}
            onChange={handlerChange}
          />
        </div>
        <div>
          <div className="flex justify-between">
            <label htmlFor="mobile" className="block text-sm font-medium text-white">
            Mobile Number
            </label>
          </div>
          <input
            id="mobile"
            name="mobile"
            type="text"
            placeholder='+1 (205) 201-0933'
            className="text-white mt-1 py-3 px-4 bg-[#8560ed42] focus:ring-indigo-500 outline-none focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-2xl"
            value={loginUser.mobile}
            onChange={handlerChange}
          />
        </div>
        {error&&<span className='pt-2 text-red-600'>{error}</span>}
        <div className='flex flex-col sm:flex-row gap-2'>
          {/* <Link href="/form" className={` flex items-center justify-center gap-2  sm:w-auto font-poppin bg-btnOrange px-12 text-btntext tracking-normal leading-snug text-btnsize font-large  rounded-sm`}>  */}
            <Button className="shadow-[0px_1px_24px_0px_#1F51FF99] !rounded-md" onClick={handleSubmit}>Sign Up</Button>
          {/* </Link> */}
          
          {/* <Link href="https://localhost/beetlepro.com/admin/login/google"> */}
          <button  className='flex items-center justify-center gap-2 px-4 py-2 text-gray-600 bg-gray-300 rounded-md sm:w-auto'>
            <Image src={'/google-icon 1.png'} width={20} height={20} alt=''/>
            Sign up with Google
          </button>
          {/* </Link> */}
        </div>
      </form>
    </div>
    <ToastContainer/>
  </div>
  )
}


export default Signup
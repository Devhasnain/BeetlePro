'use client'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import AdminCompmonent from './AdminComponent';
import { redirect, useRouter } from 'next/navigation';
import { baseRoute } from '@/utils/route';
import { ToastContainer, toast } from 'react-toastify';

const AdminCom = () => {
      const [toggle,setToggle] = useState(false)
      const [getUser,setUser] = useState({
        image:'',
        name:''
      })
      useLayoutEffect(() => {
        let token = localStorage.getItem('token')
        let user:any = JSON.parse(localStorage.getItem('user') as any)
        console.log(user,'getUser')
        if(!token) redirect('/login')
        if(user?.role_type =='3'||user?.role_type =='2')redirect('/login')
        setUser({image:user.image,name:user.firstname})
    }, [])
    const router = useRouter()
    const CreateBar = ()=>{
        const [getImage,setImage] = useState<any>(null)
        const [getUserImage,setUserImage] = useState<any>(null)
      const [values, setValues] = useState<any>({
        title:"",
        description:"",
        rating:"",
        latitude:"40.0",
        longitude:"40.0",
        offers:"",
        email:"",
        is_active:false,
        password:'',
        number:'',
        fistname:'',
        lastname:''
      });
    console.log(getImage)
    
        const handleSubmit = (e:any)=>{
    e.preventDefault()
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    var formdata = new FormData();
    formdata.append("title",values.title);
    formdata.append("description",values.description);
    formdata.append("barimage",getImage );
    formdata.append("userimage",getUserImage );
    formdata.append("rating", values.rating);
    formdata.append("latitude", values.latitude);
    formdata.append("longitude", values.longitude);
    formdata.append("offers", values.offers);
    formdata.append("waitTime", "00:00");
    formdata.append("volume", "0");
    formdata.append("lineQueue", "0");
    formdata.append("is_active", values.is_active ? '1' : '0');
    formdata.append("email", values.email);
    formdata.append("password",values.password);
    formdata.append("firstname",values.firstname);
    formdata.append("lastname",values.lastname);
    formdata.append("number",values.number);
    console.log(getImage)
    
    var requestOptions:any = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${baseRoute}bars`, requestOptions)
      .then(response => response.json())
      .then((result:any) => {
        toast.success(result.message)

        setValues({
          title:"",
          description:"",
          rating:"",
          latitude:"40.0",
          longitude:"40.0",
          offers:"",
          email:"",
          is_active:false,
          password:'',
          number:'',
          fistname:'',
          lastname:''
          })
          setImage(null)

        console.log(result)})
      .catch(error => console.log('error', error));
        
      }
    const handlerChange = (e:any)=>{
        const {name,value,checked,type,files} = e.target
        // if (type === 'file') {
        //     // Store the selected image file
        //     // setValues((prevData:any) => ({
        //     //     ...prevData,
        //     //     [name]: files[0], // Only allow a single image to be selected
        //     // }));
        //     setImage(files[0])
        // }{
            setValues({
                ...values,[name]: type === 'checkbox' ? checked : value
            })
        // }
        console.log(values,'image')
    }
    
    console.log(values.image,'img')
        return(
            <form onSubmit={handleSubmit} className="ml-8 max-w-[45rem] bg-white p-4 shadow-md rounded-lg">
                <h1 className="block text-gray-700 text-2xl font-bold mb-2">
                    Bar Create
                </h1>
            <div className="flex item-center gap-2">
              <div className="">
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                <input
                  value={values.title}
                  onChange={handlerChange}
                  type="text"
                  id="title"
                  name="title"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
           
              
              <div className="mb-4">
                <label htmlFor="rating" className="block text-gray-700 text-sm font-bold mb-2">Rating</label>
                <input
                  value={values.rating}
                  onChange={handlerChange}
                  type="text"
                  id="rating"
                  name="rating"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Bar Image</label>
                <input
                  onChange={(e:any)=>setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="offers" className="block text-gray-700 text-sm font-bold mb-2">Offers</label>
                <input
                  value={values.offers}
                  onChange={handlerChange}
                  type="text"
                  id="offers"
                  name="offers"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                <textarea
                  value={values.description}
                  onChange={handlerChange}
                  id="description"
                  name="description"
                  rows={3}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className='flex gap-2 item-center'>
                <label htmlFor="is_active" className="lock text-gray-700 text-sm font-bold">
                  Active
                </label>
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={values.is_active}
                  onChange={handlerChange}
                  className="mr-2"
                />
              </div>
              
              </div>
              <div className="">
              <div className="mb-4">
              <label htmlFor="firstname" className="block text-gray-700 text-sm font-bold mb-2">Firstname</label>
              <input
                value={values.firstname}
                onChange={handlerChange}
                type="text"
                id="firstname"
                name="firstname"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
              <div className="mb-4">
              <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Lastname</label>
              <input
                value={values.lastname}
                onChange={handlerChange}
                type="text"
                id="lastname"
                name="lastname"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">User Image</label>
                <input
                  onChange={(e:any)=>setUserImage(e.target.files[0])}
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input
                value={values.email}
                onChange={handlerChange}
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                value={values.password}
                onChange={handlerChange}
                type="password"
                id="password"
                name="password"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">Number</label>
              <input
                value={values.number}
                onChange={handlerChange}
                type="text"
                id="number"
                name="number"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
              </div>
            </div>
            <div>
              <button type="submit" className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full focus:outline-none hover:bg-blue-600">
                Submit
              </button>
            </div>
          </form>
          
        )
      }
     const handlerLogout =()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
     }

  return (
         <div className='flex w-full  bg-black'>
            <div className="bg-[#212429] w-[17%]  h-[60rem]">
                <div className="flex justify-center">
                    <Image src={'/logo.png'} width={120} height={120} alt='' />
                </div>
                <nav>
                    <ul className='flex flex-col gap-2 mt-8'>
                        <li onClick={()=>setToggle(false)} className='px-4 py-2 cursor-pointer text-white flex items-center gap-1'>
                            <Image src={'/home.png'} width={25} height={25} alt='' />
                            Home</li>
                        <li onClick={()=>setToggle(true)} className='px-4 py-2 cursor-pointer text-white flex items-center gap-1'>
                            <Image src={'/Vector (3).png'} width={25} height={25} alt='' />
                            Bars</li>
                        <li className='px-4 py-2 cursor-pointer text-white flex items-center gap-1'>
                            <Image src={'/Vector (4).png'} width={25} height={25} alt='' />
                            Settings</li>
                    </ul>
                </nav>
            </div>
            <div className="w-[83%]">
                <div className="flex w-full h-12 justify-end items-center gap-8 px-8">
                    <h1 className='text-white cursor-pointer' onClick={handlerLogout}>Logout</h1>
                    <h1 className='text-white'>{getUser.name}</h1>
                </div>
                {!toggle?(
                <AdminCompmonent/>
                ):(
                    <CreateBar/>
                )}
            </div>
            <ToastContainer/>
        </div>
  )
}

export default AdminCom
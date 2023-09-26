'use client'

import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Image from 'next/image'
import { baseRoute } from '@/utils/route';
import SubComponent from '@/components/SubComponent';
import { redirect ,useRouter} from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

const SubACom = () => {
  const router = useRouter()
    const [toggle,setToggle] = useState(false)
    const [getUser,setUser] = useState<any>({
      image:'',
      name:'',
      email:''
     })
    const [barData,setBarData] = useState<any>({})

    const Offers = ()=>{
        const [formData, setFormData] = useState<any>({
            bar_id: 1,
            name: '',
            image: null, // Use null to store the selected image file
            description: '',
            is_active: true,
            price: 19.99,
          });
        
          const handleChange = (e:any) => {
            const { name, value, type, checked, files } = e.target;
            if (type === 'file') {
              // Store the selected image file
              setFormData((prevData:any) => ({
                ...prevData,
                [name]: files[0], // Only allow a single image to be selected
              }));
            } else {
              setFormData((prevData:any) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
              }));
            }
          };
        
          const handleSubmit = (e:any) => {
            e.preventDefault();
            // Send the formData (including the image file) to your API or perform any necessary actions.
            console.log(formData);
            var myHeaders = new Headers();
var formdata = new FormData();
formdata.append("bar_id", barData.id);
formdata.append("name", formData.name);
formdata.append("image", formData.image);
formdata.append("description", formData.description);
formdata.append("is_active", formData.is_active ? '1' : '0');
formdata.append("price", formData.price);

var requestOptions:any = {
  method: 'POST',
  headers: myHeaders,
  mode: 'cors',
  body: formdata,
  redirect: 'follow'
};

fetch(`${baseRoute}offers`, requestOptions)
  .then(response => response.json())
  .then((result) => {
    toast.success(result.message)
    console.log(result)})
  .catch(error => console.log('error', error));
          };
       
        return (
            <div className="max-w-lg mx-auto ">
                <button onClick={()=>setToggle(!toggle)}
            className="bg-[#E1E1E1] text-black rounded-lg px-4 py-2 hover:bg-[#E1E1E1]"
          >
           Back
          </button>
                <h1 className='text-white text-center text-[3rem]'>Offers</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-white">
            Offer Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-white">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*" // Specify accepted file types (images)
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
          {/* Display the selected image preview */}
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)} // Create a URL for the selected image
              alt="Selected Image"
              className="mt-2 max-h-40"
            />
          )}
        </div>
        <div>
          <label htmlFor="description" className="block text-white">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        
       <div className="flex item-center gap-2">
       <div>
          <label htmlFor="price" className="block text-white">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className=''>
          <label htmlFor="is_active" className="block text-white">
            Active
          </label>
          <input
            type="checkbox"
            id="is_active"
            name="is_active"
            checked={formData.is_active}
            onChange={handleChange}
            className="mr-2"
          />
        </div>
       </div>
        <div>
          <button
            type="submit"
            className="bg-[#E1E1E1] text-black rounded-lg px-4 py-2 hover:bg-[#E1E1E1]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
        )
    }
  
      useLayoutEffect(() => {
        let token = localStorage.getItem('token')
        let user:any = JSON.parse(localStorage.getItem('user') as any)
        console.log(user,'getUser')
        if(!token) redirect('/login')
        if(user?.role_type =='3'||user?.role_type =='1')redirect('/login')
        setUser({image:user.image,name:user.firstname,email:user.email})
        var requestOptions:any = {
          method: 'GET',
          redirect: 'follow'
        };
        fetch(`${baseRoute}bar/${user.email}`, requestOptions)
          .then(response => response.json())
          .then((result) =>{
            setBarData(result.data)
            console.log(result)})
          .catch(error => console.log('error', error));
    }, [])
    const handlerLogout =()=>{
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      router.push('/login')
     }
  return (
    <div className='flex w-full '>
    <div className="bg-[#212429] w-[17%] h-[60rem]">
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
                    Offers</li>
                <li className='px-4 py-2 cursor-pointer text-white flex items-center gap-1'>
                    <Image src={'/Vector (4).png'} width={25} height={25} alt='' />

                    Settings</li>
            </ul>
        </nav>
    </div>
    <div className="w-[83%] bg-black">
        <div className="flex w-full h-12 justify-end items-center gap-2 px-8">
            <h1 className='text-white cursor-pointer' onClick={handlerLogout}>Logout</h1>
            <h1 className='text-white'>{getUser?.firstname}</h1>
        </div>
      {toggle? <div className="w-[50%]">
       <Offers/>
       </div>:(
        <SubComponent />
       )}
    </div>
    <ToastContainer/>
</div>
  )
}

export default SubACom
'use client'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import Header3 from './Header3'
import ProductDetail from './ProductDetail'
import { CounterContext } from '@/ThemeContext'
import ProductDetailGuest from './ProductDetailGuest'
import Card from '@/components/Card'
import { baseRoute } from '@/utils/route'

const HomeComponent = () => {

  const [GetId, setId] = useState('')

  const [loading, setLoading] = useState<any>(false);
  const [resultFound, setResultFound] = useState<any>(false);
  const [inputSearch, setInputSearch] = useState('')
  const [filteredItems, setFilteredItems] = useState([])
  const { dispatch, state } = useContext(CounterContext);
  const [checkAuth, setCheckAuth] = useState(false)
  console.log(state, 'home')
  useEffect(() => {
    let token: any = JSON.parse(localStorage.getItem('token') as any);
    if (token) {
      setCheckAuth(true)
    }
    console.log('You are on the server')
  }, [])

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        var myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions: any = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch(`${baseRoute}allbars`, requestOptions)
          .then(response => response.json())
          .then((result) => {
            console.log(result)
            dispatch({ type: "OFFERS", payload: result.data.offers })
            dispatch({ type: "barsWithDistance", payload: result.data.bars })
            setFilteredItems(result.data.bars)
            setLoading(false)
          })
          .catch(error => console.log('error', error));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  if (loading) return <h1>loading....</h1>
  const applyFilters = (value: any) => {
    setInputSearch(value)
    let updatedList = filteredItems;
    // search Filter
    updatedList = updatedList.filter(
      (items: any) =>
        items.title.toLowerCase().search(value.toLowerCase().trim()) !==
        -1
    );
    setFilteredItems(updatedList);
    !updatedList.length ? setResultFound(false) : setResultFound(true);
  };

  return (
    <div className='bg-white'>
      <div className="">
        <Header3 applyFilters={applyFilters} inputSearch={inputSearch} />
        <div>{GetId != '' ? (
          <div className="w-[90%] mx-auto my-0">

            {!checkAuth ? <ProductDetailGuest id={GetId} setId={setId} /> : <ProductDetail setId={setId} id={GetId} />}
            {/* <div className="mt-8 flex items-center gap-1 w-full">
    {state.offers&&state.offers.map((items:any,index:number)=>(
        <div key={index} className="relative h-[200px] w-[320px]  rounded-lg ">
        <Image src={items.image}  className='rounded-lg' fill alt=''/>
        </div>
    ))}
    </div> */}
          </div>
        ) : (
          <div className="mt-4">
            {/* <div className="flex justify-center items-center mb-8">
            <div className="flex gap-2 relative rounded-md p-2 w-[500px] h-[45px] bg-[#E8EBEB]">
        <Image src={'/search.png'}  className='rounded-lg ' width={20} height={20} alt=''/>
                <input type="text"  value={inputSearch}
        onChange={(e) =>applyFilters(e.target.value)} className='bg-[#E8EBEB] w-full h-full px-2' placeholder='Search Popeyes Louisiana Kitchen' />
            </div>
        </div> */}
            <div className="w-[90%] mx-auto my-0">
              <div className="flex items-center gap-1 w-full">
                {state.offers && state.offers.map((items: any, index: number) => (
                  <div key={index} className="relative h-[200px] w-[320px]  rounded-lg ">
                    <Image src={items.image} className='rounded-lg' fill alt='' />
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <div className="flex items-center gap-4">
                  <h1 className='text-[25px] font-bold'>All Bars</h1>
                </div>
                <div className="my-2 flex gap-4 items-center">
                  {filteredItems && filteredItems.map((items: any, index: number) => (
                    <Card key={index} setId={setId} image={items.image} id={items.bar_id} waitTime={items.waitTime} offers={items.offers} title={items.title} rating={items.rating} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}</div>
        {/* <BarChart/> */}
      </div>
    </div>
  )
}

export default HomeComponent
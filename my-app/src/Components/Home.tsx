import React, { useEffect, useState } from 'react'
import Nav from './Nav';
import { useDispatch } from 'react-redux';
import { addToCart, CartItems } from '../store/UserSlice/UserSlice';


interface ProductData {
  _id: string,
  name: string,
  price: string,
  imageUrl: string,
}

const Home = () => {
  const [products, setProducts] = useState<Array<ProductData> | null>([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('http://localhost:10000/api/v1/product/getdata');
        const data: { succes: boolean, data: Array<ProductData> } = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }

    })()

  }, []);
  const [message, setMessae] = useState<string>("");
  const dispatch = useDispatch();

  async function handleClick({ price, _id, imageUrl }: { price: string, _id: string, imageUrl: string }) {

    if (localStorage.getItem("token")) {
      dispatch(addToCart({ price, _id, imageUrl }));
    }
    else {
      //user is not logged in 
      setMessae("Login Required");
    }
  }

  return (
    <div>
      <Nav />
      <p className='text-red-500 text-xl text-center'>{message.length > 0 && message}</p>
      <div className="flex justify-around my-5 flex-wrap items-center">
        {
          products && products.map((item: ProductData) => {
            return (<div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img className="w-full h-80 " src={item.imageUrl} alt="Sunset in the mountains" />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">${item.price}</div>
                <p className="text-gray-700 text-base">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                </p>
                <button onClick={() => handleClick(item)} className='h-12 p-2 rounded my-2 bg-green-500 text-white  w-full border'>Add To Cart</button>
              </div>

            </div>)
          })
        }
      </div>
    </div>

  )

}

export default Home

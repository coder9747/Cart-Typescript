import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { addToCart, adjustQuantity, removeToCart } from '../store/UserSlice/UserSlice';
import Nav from "./Nav";

const Cart = () => {
    const dispatch = useDispatch();
    const product = useSelector((state: any) => state.cartReducer.cart);
    if (!localStorage.getItem("token")) {
        return <Navigate to={'/login'} />
    }
    function handleQuantityAdjust(item: any, sign: number) {
        dispatch(adjustQuantity({ ...item, sign }));
    }
    return (
        <div >


            <Nav />
            <div className="h-screen bg-gray-100 pt-20">
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3">
                        {product && product.map((item: any) => {
                            return (<div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                <img src={item.imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                    <div className="mt-5 sm:mt-0">
                                        <h2 className="text-lg font-bold text-gray-900">Lorem, ipsum.</h2>
                                        <p onClick={() => dispatch(removeToCart({ _id: item._id }))} className="mt-1 text-xs hover:text-bold text-red-500">Remove </p>
                                    </div>
                                    <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                        <div className="flex items-center border-gray-100">
                                            <span onClick={() => handleQuantityAdjust(item, -1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                            <input className="h-8 w-12 border bg-white text-center text-sm outline-none" value={item.quantity} />
                                            <span onClick={() => handleQuantityAdjust(item, 1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <p className="text-sm">{item.price * item.quantity}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                        })}

                    </div>
                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">


                        <hr className="my-4" />
                        <div className="flex justify-between">
                            <p className="text-lg font-bold">Total</p>
                            <div className="">
                                <p className="mb-1 text-lg font-bold">{product && product.reduce((pre: any, acc: any) => {

                                    return pre + (acc.quantity * acc.price);

                                }, 0)
                                }</p>
                                <p className="text-sm text-gray-700">including VAT</p>
                            </div>
                        </div>
                        <button onClick={() => alert("Checkout Not Implemented")} className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Cart

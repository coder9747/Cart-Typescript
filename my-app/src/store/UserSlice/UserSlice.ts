import { createSlice } from "@reduxjs/toolkit";
import { sign } from "crypto";

export interface CartItems {
    _id: string,
    quantity: number,
    price: number,
    name: string,
};

export interface Cart {
    cart: Array<CartItems>
}

const initialState: Cart = {
    cart: localStorage.getItem("cart")?JSON.parse(localStorage.getItem("cart") || ""):[],
};
export const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers:
    {
        addToCart: (state, action) => {
            const data: CartItems = action.payload;
            const isAvailable = state.cart.findIndex(ele => ele._id == data._id);
            if (isAvailable >= 0) {
                //means item already exists increase quantity
                state.cart[isAvailable].quantity += 1;
            } else {
                state.cart.push({ ...data, quantity: 1 });
            }
            localStorage.setItem("cart",JSON.stringify(state.cart));
        },
        removeToCart: (state, action) => {
            const id = action.payload._id;
            console.log(id)
            state.cart = state.cart.filter((item: any) => {
                return item._id != id;
            });
            localStorage.setItem("cart",JSON.stringify(state.cart));
        },
        adjustQuantity: (state, action) => {
            console.log(action.payload);
            const data = action.payload;
            const idx = state.cart.findIndex((item) => item._id == data._id);
            if (idx >= 0) {
                state.cart[idx].quantity += data.sign;
                state.cart[idx].quantity = Math.max(state.cart[idx].quantity, 0);
            }
            localStorage.setItem("cart",JSON.stringify(state.cart));

        }


    }
})

export const { addToCart, removeToCart, adjustQuantity } = CartSlice.actions;


export default CartSlice.reducer;
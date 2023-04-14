import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { MAIN_URL } from './products.slice';
import { getConfig } from '../../utils/getConfig';

export const itemsCartSlice = createSlice({
    name: 'itemsCart',
    initialState: [],
    reducers: {
        setItemsCart: (state, action) => {
            return action.payload;
        }
    }
})

export const getItemsCartThunk = () => (dispatch) => {
    axios
        .get(`${MAIN_URL}/cart`, getConfig())
        .then(res => dispatch(setItemsCart(res.data)))
        .catch(err => console.error(err));
}

export const addItemToCartThunk = (data) => (dispatch) => {
    axios
        .post(`${MAIN_URL}/cart`, data, getConfig())
        .then(res => dispatch(getItemsCartThunk()))
        .catch(err => console.error(err));
}

export const removeItemFromCartThunk = (data) => (dispatch) => {
    axios
        .put(`${MAIN_URL}/cart`, data, getConfig())
        .then(res => dispatch(getItemsCartThunk()))
        .catch(err => console.error(err));
}

export const cartCheckoutThunk = () => (dispatch) => {
    axios
        .post(`${MAIN_URL}/purchases`, null, getConfig())
        .then(res => dispatch(getItemsCartThunk()))
        .catch(err => console.error(err));
}

export const { setItemsCart } = itemsCartSlice.actions;

export default itemsCartSlice.reducer;
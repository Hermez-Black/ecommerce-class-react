import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'

// Cambiamos mySlice por el nombre de nuestro slice (usersSlice, toDosSlice...)
export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload;
        }
    }
})

const url = "https://e-commerce-api-v2.academlo.tech/api/v1/products";

export const getProductsThunk = () => (dispatch) => {
    return axios
        .get(url)
        .then(res => dispatch(setProducts(res.data)))
        .catch(err => console.error(err))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
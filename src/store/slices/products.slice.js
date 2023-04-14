import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { setIsLoading } from './isLoading.slice';

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

export const MAIN_URL = "https://e-commerce-api-v2.academlo.tech/api/v1";
export const PRODUCTS_URL = `${MAIN_URL}/products`;
export const CATEGORIES_URL = `${MAIN_URL}/categories`;

export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get(PRODUCTS_URL)
        .then(res => dispatch(setProducts(res.data)))
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)));
}

export const filterCategoriesThunk = (id) => dispatch => {
    dispatch(setIsLoading(true));
    axios
        .get(`${PRODUCTS_URL}?categoryId=${id}`)
        .then(res => dispatch(setProducts(res.data)))
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)));
}

export const searchByTextThunk = valueInput => (dispatch) => {
    dispatch(setIsLoading(true));
    axios
        .get(`${PRODUCTS_URL}?title=${valueInput}`)
        .then(res => dispatch(setProducts(res.data)))
        .catch(err => console.error(err))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
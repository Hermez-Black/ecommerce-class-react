import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { MAIN_URL, PRODUCTS_URL } from "../store/slices/products.slice";
import { useSetState } from "../hooks/useSetState";
import { getConfig } from "../utils/getConfig";
import { useDispatch } from "react-redux";
import { addItemToCartThunk } from "../store/slices/itemsCart.slice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(1);
  const url = `${PRODUCTS_URL}/${id}`;

  const dispatch = useDispatch();

  useEffect(() => {
    useSetState(url, setProduct);
  }, [url])

  const addToCart = () => {
    const data = {
      quantity: counter,
      productId: id
    };
    dispatch(addItemToCartThunk(data));
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>price: { product.price }</p>
      <p>brand: { product.brand }</p>

      <div>
        <button onClick={() => {setCounter(counter - 1)}}>-</button>
        {' '}{counter}{' '}
        <button onClick={() => {setCounter(counter + 1)}}>+</button>
      </div>

      { product?.images?.map(
        (image) => {
          return (
            <img
              key={image.id}
              src={image.url}
              alt="image product"
              style={{
                height: 250,
                width: 250,
              }}/>
          );
        }
      ) }
      <Button onClick={addToCart}>add to cart</Button>
    </div>
  )
}

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCartThunk } from "../store/slices/itemsCart.slice";
import { Button } from "react-bootstrap";
import axios from "axios";
import { getConfig } from "../utils/getConfig";
import { MAIN_URL } from "../store/slices/products.slice";

export default function Counter({ productId, quantity }) {
    const [counter, setCounter] = useState(quantity);
    const dispatch = useDispatch();
    const styleButton = {
        width: 30,
        height: 30
    }
    const url = `${MAIN_URL}/cart/${productId}`;
    useEffect(() => {
            const data = {
                "quantity": counter
            };
            axios
                .put(url, data, getConfig())
                .then(res => console.log(res))
                .catch(err => console.error(err))
    }, [counter]);

  return (
    <div className="box-counter">
        <Button
            style={styleButton}
            onClick={() => {setCounter(counter - 1)}}>-</Button>
            {counter}
        <Button
            style={styleButton}
            onClick={() => {setCounter(counter + 1)}}>+</Button>
    </div>
  )
}

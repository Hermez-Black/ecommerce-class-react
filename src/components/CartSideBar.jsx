import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsCartThunk, cartCheckoutThunk } from "../store/slices/itemsCart.slice";
import Counter from "./Counter";
import { Button } from "react-bootstrap";
import axios from "axios";
import { getConfig } from "../utils/getConfig";
import { MAIN_URL } from "../store/slices/products.slice";

export default function CartSideBar({ title, show, handleClose }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItemsCartThunk());
  }, []);
  const itemsCart = useSelector(state => state.itemsCart);
  const removeItem = (id) => {
    const url = MAIN_URL + "/cart/" + id;
    axios
      .delete(url, getConfig())
      .then(r => dispatch(getItemsCartThunk()))
      .catch(e => console.error(e))
  }

  return (
    <SideBar
      title={title}
      show={show}
      handleClose={handleClose}>
          <ul style={{
            padding: 0
          }}>
            {
              itemsCart?.map(
                (item) => {
                  return (
                  <li key={item.id} style={{
                    border: 'none',
                    listStyleType: "none",
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}>
                    <img src={item?.product?.images[0].url} width={70} height={70} alt="product" style={{
                      objectFit: "contain"
                    }}/>
                    <div style={{
                      flexDirection: "column !important"
                    }}>
                      <h6>{item?.product?.title}</h6>
                      <Counter productId={item.id} quantity={item?.quantity}></Counter>
                    </div>
                    <Button style={{
                      width: 35,
                      height: 35,
                      marginLeft: 10
                    }}
                      onClick={() => removeItem(item.id)}>X</Button>
                  </li>
                  )
                }
              )
            }
          </ul>
          <Button color="success" onClick={() => dispatch(cartCheckoutThunk())}>Checkout</Button>
    </SideBar>
  )
}

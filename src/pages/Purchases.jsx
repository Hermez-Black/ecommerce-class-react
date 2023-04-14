import axios from 'axios';
import {useState, useEffect} from 'react';
import { getConfig } from '../utils/getConfig';
import { MAIN_URL } from '../store/slices/products.slice';

export default function Purchases() {
  const [purchases, setPurchases] = useState([]);
  useEffect(() => {
    const url = MAIN_URL + '/purchases';
    axios
      .get(url, getConfig())
      .then((res) => { console.log(res);
        setPurchases(res.data)})
      .catch((err) => console.error(err))
  }, [])
  return (
      <tbody style={{
        width: "100%",
      }}>
      {
        purchases.map( (item) => {
          const { product } = item;
          return (
            <tr key={item.id} className='table-light itemPurchase' style={{
              width: "100% !important"
            }}>
              <td>
                <span style={{
                  fontSize: 18
                }}>{item.product?.title}</span>
                <br />
                <span>{product?.createdAt}</span>
                <br />
                <span>{product?.price}</span>
                <br />
                {item.quantity}
              </td>
              <td>
                <img src={product?.images[0]?.url} alt="" width={120} height={90} style={{
                  objectFit: "contain",
                }}/>
              </td>
            </tr>
          )
        })
      }
      </tbody>
  )
}

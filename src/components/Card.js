import React, { useState, useRef, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer.js';

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const options = props.options;
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size
        });
        return
      }
      return
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size
    });
    //await console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])
  return (
    <div>
      <div style={{ margin: "50px" }} className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
        <div >
          <h2 >{props.foodItem.name}</h2>
          <img style={{width:"200px"}} src={props.foodItem.img} className='img-fluid newimg' alt='no img' />
        </div>

        <div className='flex-container'>
          <div className='w-100 m-1'>
            <p>variants</p>
            <select className='form-control'  ref={priceRef} onChange={(e) => setSize(e.target.value)}>
              {priceOptions.map((data) => {
                return <option key={data} value={data}>{data}</option>
              })}
            </select>
          </div>
          <div className='w-100 m-1'>
            <p>Quantity</p>
            <select className='form-control '  onChange={(e) => setQty(e.target.value)}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>
          </div>
        </div>

        <div className='flex-container'>
          <div className='w-100 m-1'>
            <h2 className='mt-1'>Price: {finalPrice} Rs/-</h2>
          </div>
          <div className='w-100 m-1'>
            <button className='btn' onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>


    </div>

  );

}
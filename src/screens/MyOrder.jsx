import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
    console.log(localStorage.getItem('userEmail'));
    const response = await fetch("http://localhost:5000/api/myorderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: localStorage.getItem('userEmail')
      })
    });
    const data = await response.json();
    setOrderData(data);
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className='container'>
        <div className='row'>
          {Object.keys(orderData).length !== 0 && orderData.orderData ? (
            Object.values(orderData.orderData).map((data) =>
              data.order_data
                ? data.order_data
                    .slice(0)
                    .reverse()
                    .map((item) =>
                      item.map((arrayData) => {
                        const data = arrayData.Order_date;
                        return (
                          <div key={arrayData.id}>
                            {data ? (
                              <div className='m-auto mt-5'>
                                {data}
                                <hr />
                              </div>
                            ) : (
                              <div className='col-12 col-md-6 col-lg-3'>
                                <div
                                  className='card mt-3'
                                  style={{ width: '16rem', maxHeight: '360px' }}
                                >
                                  <img
                                    src={arrayData.img}
                                    className='card-img-top'
                                    alt='...'
                                    style={{ height: '120px', objectFit: 'fill' }}
                                  />
                                  <div className='card-body'>
                                    <h5 className='card-title'>{arrayData.name}</h5>
                                    <div
                                      className='container w-100 p-0'
                                      style={{ height: '38px' }}
                                    >
                                      <span className='m-1'>{arrayData.qty}</span>
                                      <span className='m-1'>{arrayData.size}</span>
                                      <span className='m-1'>{data}</span>
                                      <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                        ₹{arrayData.price}/-
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })
                    )
                : ''
            )
          ) : (
            ''
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}


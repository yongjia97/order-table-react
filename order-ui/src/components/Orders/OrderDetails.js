import React from 'react';
import '../Orders/OrderDetails.css';
import image from '../../images/orderid-1.jpeg';

function OrderDetails({ order }) {
  const { lineItems, Image } = order;
  return (
    <div className="order-details">
      <div className="left-section">
        <h2>Line Items</h2>
        {lineItems.length > 0 ? (
          <table width={"100%"} >
            <thead>
              <tr  className="order-details-header">
                {/* <th> Order ID</th> */}
                <th> ID</th>
                <th> Item</th>
                <th> Profit</th>
                <th> Sales</th>
              </tr>
            </thead>
            <tbody>
              {lineItems.map((item, index) => (
                <tr key={`${index}-${item.ID}`}>
                  {/* <td>{item.OrderID}</td> */}
                  <td>{item.ID}</td>
                  <td>{item.Item}</td>
                  <td>{`$${item.Profit}`}</td>
                  <td>{`$${item.Sales}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items</p>
        )}
      </div>
      <div className="right-section">
        <h2>Image</h2>
        {Image ? (
          <img src={image} alt="Order Image" width={"50%"} />
        ) : (
          <p>No image</p>
        )}
      </div>
    </div>
  );
}

export default OrderDetails;
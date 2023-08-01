import React, {useState, useEffect} from 'react';
import OrderDetails from './OrderDetails';
import '../Orders/OrderTable.css';
import moment from 'moment';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

const columns = [
  { label: 'ID', id: 'orderId' },
  { label: 'Category', id: 'orderCategory' },
  { label: 'Sub-Category', id: 'orderSubCategory' },
  { label: 'Segment', id: 'orderSegment' },
  { label: 'Product Name', id: 'orderProdutName' },
  { label: 'Order Date', id: 'orderDate' },
  { label: 'Region', id: 'orderRegion' },
  { label: 'Profit', id: 'orderProfit' },
  { label: 'Sales', id: 'orderSales' }
];
const  OrderTable = props => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const {orderList, search, isLoading, sortConfig, setSortConfig } = props;
  
  useEffect(() => {
    search();
}, [sortConfig.key,sortConfig.direction]);

   const requestSort = key => {
    let direction = 'ASC';
    if (sortConfig && sortConfig.key === key) {
      if (sortConfig.direction === 'ASC') {
        direction = 'DESC';
      }
    }
      setSortConfig({ key, direction });
};

  const handleOrderClick = (orderId) => {
    if(selectedOrders.includes(orderId)){
      setSelectedOrders(selectedOrders.filter((id)=> id !== orderId))
    }else{
      setSelectedOrders([...selectedOrders,orderId])
    }
  };

  return (
    <table className="order-table">
      <thead>
        <tr className="order-table-header">
          {columns && columns.length >0 && columns.map(c =>(
            <th key={c.id}  onClick={e => {requestSort(c.id);}}>
              {c.label || ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!isLoading && orderList.map((order) => (
          <React.Fragment key={order.ID}>
          <tr>
            <td  onClick={() => handleOrderClick(order.ID)}>{order.ID }</td>
            <td>{order.Category}</td>
            <td>{order.SubCategory}</td>
            <td>{order.Segment}</td>
            <td>{order.ProductName}</td>
            <td>{moment(order.OrderDate).format('DD-MM-YYYY HH:mm')}</td>
            <td>{order.Region}</td>
           {/* always in number format */}
            <td>${order.Profit}</td>
            {/* value can sometimes be non-numeric or different format */}
            <td>{typeof order.Sales === 'number' ? `$${order.Sales}` : order.Sales}</td>
          </tr>
            {selectedOrders.includes(order.ID) && (
              <tr>
                <td colSpan="9">
                <OrderDetails order={order} isLoading={isLoading}/>
                </td>
              </tr>
            )}
            </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}


const mapState = state => {
  return {
    orderList: state.OrdersModel.orderList,
    isLoading: state.OrdersModel.isLoading,
    sortConfig: state.OrdersModel.sortConfig
  };
};

const mapDispatch = dispatch => {
  return {
      search: dispatch.OrdersModel.search,
      setSortConfig: dispatch.OrdersModel.setSortConfig
  };
};

export default connect(mapState, mapDispatch)((OrderTable));

OrderTable.propTypes = {
  orderList: propTypes.array,
  search:propTypes.func,
  isLoading: propTypes.bool,
  sortConfig: propTypes.object,
  setSortConfig: propTypes.func,
};

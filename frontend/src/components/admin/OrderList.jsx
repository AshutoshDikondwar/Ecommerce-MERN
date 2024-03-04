import React, { Fragment, useEffect } from 'react'
import './productList.css'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert'
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import { clearError, getAllOrders, deleteOrder } from '../../actions/OrderAction'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DELETE_ORDER_RESET } from '../../constatnts/OrderConstant'


const OrderList = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { error, orders } = useSelector((state) => state.allOrders)
  const { error: deleteError, isDeleted } = useSelector((state) => state.order)

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id))
  }




  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.3, },
    {
      field: "status", headerName: "Status", minWidth: 150, flex: 0.3, cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
    { field: "amount", headerName: "Amount", type: "number", minWidth: 220, flex: 0.3 },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    }

  ]

  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice
    })
    });

  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearError())
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearError())
    }
    if (isDeleted) {
      alert.success("Order Deleted Successfully")
      navigate("/admin/orders")
      dispatch({ type: DELETE_ORDER_RESET })
    }
    dispatch(getAllOrders())
  }, [dispatch, error, alert, deleteError, isDeleted, navigate])

  return (
    <Fragment>
      <MetaData title="ALL ORDERS - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            className='productsListTable'
            autoHeight
          />
        </div>

      </div>



    </Fragment>
  )
}

export default OrderList
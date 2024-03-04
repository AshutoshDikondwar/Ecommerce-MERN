import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './dashboard.css'
import Sidebar from './Sidebar'
import { Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from 'chart.js'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrders } from '../../actions/OrderAction'

import { getAllProductsForAdmin } from '../../actions/ProductAction'
import { getAllUsers } from '../../actions/UserAction'


ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement, Tooltip, Legend
)




const Dashboard = () => {
  const { products } = useSelector((state) => state.products)
  const { users } = useSelector((state) => state.allUsers)
  const { orders } = useSelector((state) => state.allOrders)
  const dispatch = useDispatch()

  let outOfStock = 0

  products && products.forEach((item) => {
    if (item.stock === 0) {
      outOfStock += 1
    }
  })
  let inStock = products && products.length

  useEffect(() => {

    dispatch(getAllProductsForAdmin())
    dispatch(getAllOrders())
    dispatch(getAllUsers())
  }, [dispatch])

  let totalAmount=0;
  orders && orders.forEach(item=>{
    totalAmount+=item.totalPrice
  })

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, inStock - outOfStock],
      },
    ],
  }

  
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{products && products.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{users && users.length}</p>
            </Link>
          </div>
        </div>
        <div className="lineChart">
          <Line data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
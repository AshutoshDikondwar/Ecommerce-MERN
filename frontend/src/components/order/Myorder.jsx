import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { DataGrid } from '@mui/x-data-grid'
import { Typography } from '@mui/material'
import Loader from '../layout/loader/Loader'
import { useAlert } from 'react-alert'
import { myOrders, clearError } from '../../actions/OrderAction'
import { Link } from 'react-router-dom'
import { MdLaunch } from 'react-icons/md'
import './myrder.css'


const Myorder = () => {
    const { loading, error, orders } = useSelector((state) => state.myOrder)
    const { user } = useSelector((state) => state.user)
    const alert = useAlert()
    const dispatch = useDispatch()
    const rows = []
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 0.3, },
        {
            field: "actions", headerName: "Actions", type: "number", minWidth: 150, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <MdLaunch />
                    </Link>
                );
            },

        },
        {
            field: "status", headerName: "Status", minWidth: 150, flex: 0.3, cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.3 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 220, flex: 0.3 },

    ]

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice
        })
    })
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        dispatch(myOrders())
    }, [dispatch, alert, error])
    return (


        <Fragment>
            <MetaData title={`${user.name}'s - Orders`} />
            {loading ? <Loader /> :
                <div className="myOrderPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='myOrdesTable'
                        autoHeight
                    />
                    <Typography id="myOrderHeading">{user.name}</Typography>
                </div>
            }



        </Fragment>

    )
}

export default Myorder
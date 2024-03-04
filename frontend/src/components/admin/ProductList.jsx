import React, { Fragment, useEffect } from 'react'
import './productList.css'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert'
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import { clearError, getAllProductsForAdmin, deleteProduct } from '../../actions/ProductAction'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DELETE_PRODUCT_RESET } from '../../constatnts/ProductConstants'

const ProductList = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { error, products } = useSelector((state) => state.products)
  const { error: deleteError, isDeleted } = useSelector((state) => state.productDelete)

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }




  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.stock,
        price: item.price,
        name: item.name,
      });
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
      alert.success("Product Deleted Successfully")
      navigate("/admin/dashboard")
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
    dispatch(getAllProductsForAdmin())
  }, [dispatch, error, alert, deleteError, isDeleted, navigate])

  return (
    <Fragment>
      <MetaData title="ALL PRODUCTS - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default ProductList
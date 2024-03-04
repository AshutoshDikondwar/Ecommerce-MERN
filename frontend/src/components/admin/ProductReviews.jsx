import React, { Fragment, useEffect, useState } from 'react'
import './productReviews.css'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert'
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import { clearError, getAllReviews, deleteReviews } from '../../actions/ProductAction'
import {  DELETE_REVIEW_RESET } from '../../constatnts/ProductConstants'
import Star from '@mui/icons-material/Star'
import DeleteIcon from '@mui/icons-material/Delete';


const ProductReviews = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { error, reviews, loading} = useSelector((state) => state.productReviews)
  const { error: deleteError, isDeleted } = useSelector((state) => state.review)

  const[productId,setProductId]=useState("")

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId,productId))
  }




  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.3,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.5,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },

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

            <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  useEffect(() => {

    if(productId.length===24){
      dispatch(getAllReviews(productId))

    }

    if (error) {
      alert.error(error)
      dispatch(clearError())
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearError())
    }
    if (isDeleted) {
      alert.success("Review Deleted Successfully")
      navigate("/admin/reviews")
      dispatch({ type: DELETE_REVIEW_RESET })
    }
    // dispatch(getAllProductsForAdmin())
  }, [dispatch, error, alert, deleteError, isDeleted, navigate,productId])


  const productReviewsSubmitHandler=(e)=>{
    e.preventDefault();
    dispatch(getAllReviews(productId))

  }

  return (
    <Fragment>
      <MetaData title="ALL REVIEWS - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">

        <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className='productReviewsFormHeading'>ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>
                      


                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false || productId === "" ? true : false}
                        >
                            Search
                        </Button>
                    </form>

         {
          reviews && reviews.length > 0 ?
          <DataGrid
          rows={rows}
          columns={columns}
          disableSelectionOnClick
          className='productsListTable'
          autoHeight
        />
        :
        <h1>No Reviews Found</h1>
         }


        </div>

      </div>



    </Fragment>
  )
}

export default ProductReviews;
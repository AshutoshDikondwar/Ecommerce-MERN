import React, { Fragment, useEffect } from 'react'
import './productList.css'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector, useDispatch } from "react-redux"
import { useAlert } from 'react-alert'
import { useNavigate, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Button } from '@mui/material'
import MetaData from '../layout/MetaData'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getAllUsers, clearError, deleteUser } from '../../actions/UserAction'
import { DELETE_USER_RESET } from '../../constatnts/UserConstants'
const UsersList = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const navigate = useNavigate()
  const { error, users } = useSelector((state) => state.allUsers)
  const { error: deleteError, isDeleted, message } = useSelector((state) => state.profile)

  const deleteUserHandeler = (id) => {
    dispatch(deleteUser(id))
  }




  const columns = [
    { field: "id", headerName: "Usrr ID", minWidth: 180, flex: 0.8 },

    {
      field: "email",
      headerName: "Email",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 0.5,
    },

    {
      field: "role",
      headerName: "Role",
      minWidth: 120,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
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
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button onClick={() => deleteUserHandeler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
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
      alert.success(message)
      navigate("/admin/users")
      dispatch({ type: DELETE_USER_RESET })
    }
    dispatch(getAllUsers())
  }, [dispatch, error, alert, deleteError, isDeleted, navigate,message])

  return (
    <Fragment>
      <MetaData title="ALL Users - ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL Users</h1>
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

export default UsersList
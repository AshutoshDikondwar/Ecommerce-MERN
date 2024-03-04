import React from 'react'
import { MdAdd, MdPostAdd } from 'react-icons/md'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom'
import './sidebar.css'
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { TreeView, TreeItem } from '@mui/lab'
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import DashboardIcon from '@mui/icons-material/Dashboard';
const Sidebar = () => {
    return (
        <div className='sidebar'>
            <Link to="/">
                <img src="../images/logo2.png" alt="Ecommerce" />
            </Link>
            <Link to="/admin/dashboard">
                <p>
                    <DashboardIcon />Dashboard
                </p>
            </Link>
            <Link to="">
                <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ImportExportIcon />}
                >
                    <TreeItem nodeId="1" label="Products">
                        <Link to="/admin/products">
                            <TreeItem nodeId="2" label="All" icon={<MdPostAdd />} />
                        </Link>

                        <Link to="/admin/product">
                            <TreeItem nodeId="3" label="Create" icon={<MdAdd />} />
                        </Link>
                    </TreeItem>
                </TreeView>

            </Link>
            <Link to="/admin/orders">
                <p>
                    <ListAltIcon />
                    Orders
                </p>
            </Link>
            <Link to="/admin/users">
                <p>
                    <PeopleIcon /> Users
                </p>
            </Link>
            <Link to="/admin/reviews">
                <p>
                    <RateReviewIcon />
                    Reviews
                </p>
            </Link>

        </div>
    )
}

export default Sidebar
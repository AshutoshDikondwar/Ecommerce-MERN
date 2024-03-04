import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, element: Component, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <Routes>
            {loading === false && (
                <Route
                    {...rest}
                    render={(props) => {
                        if (isAuthenticated === false) {
                            return <Navigate replace to="/login" />;
                        }

                        if (isAdmin === true && user.role !== "admin") {
                            return <Navigate replace to="/login" />;
                        }

                        return <Component {...props} />;
                    }}
                />
            )}
        </Routes>
    );
};

export default ProtectedRoute
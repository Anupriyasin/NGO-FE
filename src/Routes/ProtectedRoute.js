import React from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar/Navbar';

const ProtectedRoute = ({ component: Component, totalItems, role, userData, allowedRoles, onChildData, mainId }) => {

    if (role) {
        if (allowedRoles.includes(role)) {
            return (
                <div className='App'>
                    <div className="AppGlass">
                        <Sidebar role={role} />
                        <div className='MainDash mb-4'>
                            <Navbar totalItems={totalItems} role={role} userData={userData} />
                            <Component totalItems={totalItems} role={role} userData={userData} onChildData={onChildData} mainId={mainId} />
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Navigate to="/dashboard" replace={true} />
        }
    }
    else {
        localStorage.setItem("alert", "Please login to continue!");
        return <Navigate to="/login" replace={true} />
    }
};

export default ProtectedRoute;

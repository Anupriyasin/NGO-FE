import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from '../components/Auth/Login'
import Dashboard from '../Pages/Dashboard'
import PageNotFound from '../Pages/PageNotFound'
import ForgetPassword from '../Pages/ForgetPassword'
import { getUserDetails } from '../api/Users'
import FullPageSpinner from '../components/Loader/FullPageSpinner'
import { get_cart_items } from '../api/Products'

import ProtectedRoute from './ProtectedRoute'
import Requirements from '../Pages/Requirements'
import TrackRequirements from '../Pages/TrackRequirements'
import RejectedRequirements from '../Pages/RejectedRequirements'
import AddAssetType from '../Pages/AddAssetType'

const AppRoutes = () => {
    const [childData, setChildData] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [role, setRole] = useState("");
    const [userData, setUserData] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    const [mainId, setMainId] = useState("");

    const handleChildData = (data) => {
        setChildData(data);
    };

    const fetchCartItems = () => {
        return get_cart_items().then(res => {
            if (res.status === "success") {
                setTotalItems(res.data.length);
            } else {
                setTotalItems(0);
            }
        });
    };

    async function fetchRole() {
        setIsLoading(true);
        await getUserDetails().then(res => {
            setRole(res.data.role_id);
            setMainId(res.data.user_id);
            setUserData(res);
        }).catch(err => {
            console.log(err);
        })
        setIsLoading(false);
    }

    useEffect(() => {
        fetchRole();
    }, [])
    useEffect(() => {
        if (role === 5) {
            fetchCartItems();
            setChildData(false);
        }
    }, [childData, role]);

    const PrivateRoutesData = [
        {
            path: '/dashboard',
            component: Dashboard,
            allowedRoles: [1]
        },
        {
            path: '/new-requirements',
            component: Requirements,
            allowedRoles: [1]
        },
        {
            path: '/track-requirements',
            component: TrackRequirements,
            allowedRoles: [1]
        },
        {
            path: '/rejected-requirements',
            component: RejectedRequirements,
            allowedRoles: [1]
        },
        {
            path: '/addassettype',
            component: AddAssetType,
            allowedRoles: [1]
        },
        {
            path: '/rejected-requirements',
            component: RejectedRequirements,
            allowedRoles: [1]
        }
    ];

    return (
        <>
            {isLoading ?
                <FullPageSpinner />
                :
                <Router>
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/login" />} />
                        <Route path='/login' element={<Login onChildData={fetchRole} role={role} />} />
                        <Route path='/forgotpassword' element={<ForgetPassword />} />
                        <Route path='*' element={<PageNotFound role={role} />} />
                        {
                            PrivateRoutesData.map((data) => {
                                return (
                                    <Route key={data.path} path={data.path} element={
                                        <ProtectedRoute
                                            component={data.component}
                                            totalItems={totalItems}
                                            role={role}
                                            userData={userData}
                                            allowedRoles={data.allowedRoles}
                                            onChildData={handleChildData}
                                            mainId={mainId}
                                        />
                                    } />
                                );
                            })
                        }
                    </Routes>
                </Router>
            }
        </>
    )
}

export default AppRoutes
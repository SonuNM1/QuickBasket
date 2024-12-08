import { createBrowserRouter } from "react-router-dom";
import App from '../App.jsx'
import Home from "../pages/Home.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import OtpVerification from "../pages/OtpVerification.jsx";
import ResetPassword from "../pages/ResetPassword.jsx";
import UserMenuMobile from "../pages/UserMenuMobile.jsx";
import Dashboard from "../layouts/Dashboard.jsx";
import Profile from "../pages/Profile.jsx";
import MyOrder from "../pages/MyOrder.jsx";
import Address from "../pages/Address.jsx";
import CategoryPage from "../pages/CategoryPage.jsx";
import SubCategoryPage from "../pages/SubCategoryPage.jsx";
import UploadProduct from "../pages/UploadProduct.jsx";
import ProductAdmin from "../pages/ProductAdmin.jsx";
import AdminPermission from "../layouts/AdminPermission.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: 'search',
                element: <SearchPage/>
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'register',
                element: <Register/>
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword/>
            },
            {
                path: 'verification-otp',
                element: <OtpVerification/>
            },
            {
                path: 'reset-password',
                element: <ResetPassword/>
            },
            {
                path: 'user',
                element: <UserMenuMobile/>
            },
            {
                path: 'dashboard',
                element: <Dashboard/>,
                children: [
                    {
                        path: 'profile',
                        element: <Profile/>
                    }, 
                    {
                        path: 'myorders',
                        element: <MyOrder/>
                    }, 
                    {
                        path: 'address',
                        element: <Address/>
                    }, 
                    {
                        path: 'category',
                        element: <AdminPermission>
                            <CategoryPage/>
                        </AdminPermission>
                    }, 
                    {
                        path: 'subcategory',
                        element: <AdminPermission>
                            <SubCategoryPage/>
                        </AdminPermission>
                    }, 
                    {
                        path: 'upload-product',
                        element: <AdminPermission>
                            <UploadProduct/>
                        </AdminPermission>
                    }, 
                    {
                        path: 'product',
                        element: <AdminPermission>
                            <ProductAdmin/>
                        </AdminPermission>
                    }, 
                ]
            },
        ]
    }
])

export default router 

// 3.12 
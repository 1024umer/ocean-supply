import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Subscription from "./pages/Subscription";
import { useSelector } from 'react-redux';
import Login from "./pages/Login";
import { Provider } from "react-redux";
import {store, persistor } from "./redux/store";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/PublicRoute";
import Profile from "./pages/Profile";
import SubscriptionForm from "./pages/Admin/Subscription/subscriptionForm";
import SubscriptionList from "./pages/Admin/Subscription/subscriptionList";
import { PersistGate } from 'redux-persist/integration/react';
import UserList from "./pages/Admin/User/UserList";
import EditUser from "./pages/Admin/User/editUser";
import { PreviewUser } from "./pages/Admin/User/PreviewUser";
import InventoryList from "./pages/Admin/Inventory/InventoryList";
import InventoryPreview from "./pages/Admin/Inventory/InventoryPreview";
import CloverUsers from "./pages/Admin/User/cloverUsers";
import CreateOrder from "./pages/Admin/Order/CreateOrder";
import BigCommerceUsers from "./pages/Admin/User/bigCommerceUsers";
import GetOrders from "./pages/Admin/Order/GetOrders";
import Loading from "./components/Loading";
const Main = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<PublicRoute />}>
                            <Route path='/' element={<Subscription />}></Route>
                            <Route path='/signup/:subscriptionId' element={<SignUp />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                        </Route>
                        <Route element={<PrivateRoute />}>
                            <Route path="/dashboard" element={<Dashboard />}></Route>
                            <Route path="/profile" element={<Profile />}></Route>
                            <Route path="/subscription" element={<SubscriptionForm />}></Route>
                            <Route path="/subscription/:id" element={<SubscriptionForm />}></Route>
                            <Route path="/subscription-list" element={<SubscriptionList />}></Route>
                            <Route path="/user/list" element={<UserList />}></Route>
                            <Route path="/clover/user/list" element={<CloverUsers />}></Route>
                            <Route path="/big-commerce/user/list" element={<BigCommerceUsers />}></Route>
                            <Route path="/user/edit/:id" element={<EditUser />}></Route>
                            <Route path="/user/preview/:id" element={<PreviewUser />}></Route>
                            <Route path="/inventory/list" element={<InventoryList />}></Route>
                            <Route path="/inventory/:id" element={<InventoryPreview/>}></Route>
                            <Route path="/order" element={<CreateOrder/>}></Route>
                            <Route path="/get/orders" element={<GetOrders/>}></Route>
                        </Route>
                        <Route path="*" element={<div>Not Found</div>}>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    );
};
export default Main;

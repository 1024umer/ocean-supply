import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Subscription from "./pages/Subscription";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./redux/store";
const Main = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Subscription />}></Route>
                    <Route path='/signup/:subscriptionId' element={<SignUp />}></Route>
                    <Route path="/login" element={<Login/>}></Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};
export default Main;

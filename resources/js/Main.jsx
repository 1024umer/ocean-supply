import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Subscription from "./pages/Subscription";

const Main = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Subscription />}></Route>
                <Route path='/signup/:subscriptionId' element={<SignUp />}></Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Main;

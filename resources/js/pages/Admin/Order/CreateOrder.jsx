import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import ProductModal from "../../../components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../redux/cart/cartSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function CreateOrder() {
    const [users, setUsers] = useState([]);
    const [userPoints, setUserPoints] = useState(0);
    const [setting, setSetting] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart } = useSelector((state) => state.cart);
    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
    const [points, setPoints] = useState(0);
    const [value, setValue] = useState(0);
    const [amount, setAmount] = useState(0);
    const [formData, setFormData] = useState({
        title: '',
        note: '',
        discount: '',
        totalPrice:totalPrice,
        cart:cart,
    });
    const dispatch = useDispatch()
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await service.post('/api/create-order', formData);

            if (response.status === 200) {
                const { token, user } = response.data.data;
                localStorage.setItem('token', JSON.stringify(token));
                navigate('/order');
                setFormData({
                    title: '',
                    note: '',
                    discount: '',
                    cart:'',
                    totalPrice:'',
                    user:'',

                });
                toast.success('Signup successful!', {
                    position: 'top-center'
                });
            } else {
                toast.error(response.data.message, {
                    position: 'top-center'
                });
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: 'top-center'
                });
            } else {
                toast.error('An error occurred. Please try again later.', {
                    position: 'top-center',
                    autoClose: 2000
                });
            }
        }
    };
    const getUsers = async () => {
        const response = await service.get("/api/user");
        setUsers(response.data.data);
        setLoading(false)
    };

    const getSetting = async () => {
        const response = await service.get("/api/setting");
        response.data.data.forEach((item, index) => {

            if (index === 0) {
                setPoints(item.value);
            }

            if (index === 1) {
                setValue(item.value);
            }

            if (index === 2) {
                setAmount(item.value);
            }
        });
        setSetting(response.data.data);
        setLoading(false)
    };
    const getUserPoints = async (data,id) => {
        const points = data;
        setFormData({ ...formData, user: id });
        setUserPoints(points);
    };
    const handleCart = () => {
        dispatch(clearCart());
    }
    useEffect(() => {
        getSetting();
        getUsers();
    }, []);

    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                        <div class="col-lg-9 col-md-9 dashboard-right-sec products-sec  ">
                            <div class="row dashboard-right-top-sec">
                                <div class="col-lg-12">
                                    <div class="products-search-box cart-box ">
                                        <h3>Selected Products</h3>
                                        {cart?.length > 0 && <button onClick={() => handleCart()} className="t-btn t-btn-gradient my-2">Clear Cart</button>}
                                        <div class="products select-check-box">
                                            <form action="">
                                                <div class="scroll-box">
                                                    <div class="many-check-boxes">
                                                        {cart.map((product) => (
                                                            <div key={product.id} class="box-check">
                                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                                                <label for="vehicle1">
                                                                    <div class="pro-details">
                                                                        <h6>{product.name}</h6>
                                                                        <div class="code-price">
                                                                            <p>Code : {product.code}</p>
                                                                            <p>Price : ${product.price}</p>
                                                                        </div>
                                                                        <div class="in-stock-or-not">
                                                                            <p>{product.available === true ? "In Stock" : "Out of Stock"}</p>
                                                                        </div>
                                                                        <button type="button" class="btn btn-primary" data-toggle="modal" data-target={"#myModal" + product.id}>
                                                                            <img src="/front/images/modal-plus-icon.png" alt="" />
                                                                        </button>
                                                                    </div>
                                                                </label>
                                                                <ProductModal key={product.id} item={product} />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div class="cart-details">
                                            <form onSubmit={handleSubmit}>

                                                <div class="select-user-box">
                                                    <label for="user">Select User</label>
                                                    <select name="user" id="user" onChange={(e) => getUserPoints(e.target.selectedOptions[0].dataset.points, e.target.value)}>
                                                        <option value="" selected disabled>Select User</option>
                                                        {users.map((user) => (
                                                            <option key={user.id} value={user.id} data-points={user.point[0] ? user.point[0].remaining_points : 0}>
                                                                {user.first_name} {user.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div class="select-user-box pricing-details">
                                                    <label for="cars">Pricing Details</label>
                                                    <div class="three-input-boxes">
                                                        <input onChange={handleChange} type="text" name="title" placeholder="Title" />
                                                        <input onChange={handleChange} type="text" name="note" placeholder="Note(Optional)" />
                                                        <input onChange={handleChange} type="text" name="discount" placeholder="Discount" />
                                                    </div>
                                                </div>
                                                <div class="cart-table-box">
                                                    <table>
                                                        <tr>
                                                            <td>User Points</td>
                                                            <td>{userPoints ?? 0} &nbsp;&nbsp;  Points Value is(${value / points * userPoints})</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Net Price</td>
                                                            <td>${totalPrice}</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tax</td>
                                                            <td>27.0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Delivery Charges</td>
                                                            <td>$1200</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Discount</td>
                                                            <td>10%</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="bold-table-content" >Total Price</td>
                                                            <td class="bold-table-content" >${totalPrice}</td>
                                                        </tr>
                                                    </table>
                                                </div>

                                                <div class="two-btns-inline">
                                                    <button class="active-btn" >Create Order Now</button>
                                                    <button class="active-btn disable-btn" >Discard Order</button>

                                                </div>

                                            </form>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CreateOrder

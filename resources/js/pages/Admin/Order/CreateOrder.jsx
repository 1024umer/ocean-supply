import React, { useEffect, useState } from "react";
import service from "../../../config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";
import Loading from "../../../components/Loading";
import ProductModal from "../../../components/ProductModal";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, clearItemFromCart, decreaseQuantity, increaseQuantity } from "../../../redux/cart/cartSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function CreateOrder() {
    const [users, setUsers] = useState([]);
    const [userPoints, setUserPoints] = useState(0);
    const [setting, setSetting] = useState([]);
    const [loading, setLoading] = useState(true);
    const { cart } = useSelector((state) => state.cart);
    let totalPrice = cart.reduce((acc, product) => acc + product.price, 0);
    const [points, setPoints] = useState(0);
    const [value, setValue] = useState(0);
    const [amount, setAmount] = useState(0);
    const [formData, setFormData] = useState({
        title: "",
        note: "",
        discount: 0,
        totalPrice: totalPrice,
        cart: cart,
        taxAmount: 0,
        pointUser: 0,
        user:""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {


        if (e.target.name === "discount") {
            document.getElementById("showDiscount").textContent = "$" + e.target.value;
            var tax = document.getElementById("showTax").textContent;
            tax = tax.replace("$", "");
            tax = parseFloat(tax);
            totalPrice = totalPrice - e.target.value ?? 0 + tax;
            document.getElementById("showTotal").textContent = "$" + totalPrice;

            if (e.target.value > 0) {
                let discount = document.getElementById("showDiscount").textContent;
                discount = discount.replace("$", "");
                let discountAmount = parseFloat(discount);
                let pointValue = (value / points) * userPoints;
                pointValue = parseFloat(pointValue);

                let perPointValue = value / points;
                let DiscountAmountInPoint = discountAmount / perPointValue;

                let Userpoints = parseInt(userPoints);
                Userpoints = Userpoints - DiscountAmountInPoint;
                document.getElementById("userPoints").textContent = Userpoints;
            } else {
                let discount = document.getElementById("showDiscount").textContent;
                discount = discount.replace("$", "");
                let discountAmount = 0;
                let pointValue = (value / points) * userPoints;
                pointValue = parseFloat(pointValue);
                
                let perPointValue = value / points;
                let DiscountAmountInPoint = discountAmount / perPointValue;
                
                let Userpoints = parseInt(userPoints);
                Userpoints = Userpoints - DiscountAmountInPoint;
                document.getElementById("userPoints").textContent = Userpoints;
            }
        }

        if (e.target.name === "taxAmount") {
            if (e.target.value > 0) {
                document.getElementById("showTax").textContent = "$" + e.target.value;
                let discount = document.getElementById("showDiscount").textContent;
                discount = discount.replace("$", "");
                let tax = parseFloat(e.target.value);
                totalPrice = totalPrice - discount + tax;
                document.getElementById("showTotal").textContent = "$" + totalPrice;
            } else {
                document.getElementById("showTax").textContent = "$" + 0;
                let discount = document.getElementById("showDiscount").textContent;
                discount = discount.replace("$", "");
                let tax = parseFloat(0);
                totalPrice = totalPrice - discount + tax;
                document.getElementById("showTotal").textContent = "$" + totalPrice;
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await service.post("/api/create-order", formData);
            navigate(`/slip/${response.data}`);
            dispatch(clearCart());
            setFormData({
                title: "",
                note: "",
                discount: "",
                cart: "",
                totalPrice: "",
                user: "",
                taxAmount: "",
                cashAmount: "",
                pointUser: "",
            });
            toast.success("Order Created Successfully", {
                position: "top-center",
            });
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: "top-center",
                });
            } else {
                toast.error("An error occurred. Please try again later.", {
                    position: "top-center",
                    autoClose: 2000,
                });
            }
        }
    };

    const getUsers = async () => {
        const response = await service.get("/api/user");
        setUsers(response.data.data);
        setLoading(false);
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
        setLoading(false);
    };
    const getUserPoints = async (data, id) => {
        const points = data;
        setUserPoints(points);
        document.getElementById("userPoints").textContent = points;
    };
    const handleCart = () => {
        dispatch(clearCart());
    };

    const handleCreateOrder = (e) => {
        e.preventDefault();
        toast.error("cart is empty", {
            position: "top-right",
            zIndex: 999,
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleRemove = (product) => {
        dispatch(clearItemFromCart(product));
    }
    useEffect(() => {
        getSetting();
        getUsers();
    }, []);

    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity(productId));
    };


    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                        <div className="col-lg-9 col-md-9 dashboard-right-sec products-sec  ">
                            <div className="row dashboard-right-top-sec">
                                <div className="col-lg-12">
                                    <div className="products-search-box cart-box ">
                                        <div className="cart-two-inline-">
                                        <h3>Selected Products</h3>
                                        {cart?.length > 0 && (
                                            <button
                                                onClick={() => handleCart()}
                                                className="t-btn t-btn-gradient my-2"
                                            >
                                                Clear Cart
                                            </button>
                                        )}
                                        </div>
                                        <div className="products select-check-box">
                                            <form action="">
                                                <div className="scroll-box">
                                                    <div className="many-check-boxes">
                                                        {cart.map((product) => (
                                                            <div key={product.id} className="box-check">
                                                                
                                                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                                                                <label htmlFor="vehicle1">
                                                                    <div className="pro-details">
                                                                        <button type="button" className="btn btn-warning" onClick={() => handleRemove(product.id)}> x </button>
                                                                        <h6> { product.name } </h6>

                                                                        <div className="code-price">
                                                                            <p> Code :{" "} { product.code } </p>
                                                                            <p>Price:${product.price}</p>
                                                                            <p>Qty: {product.quantity}</p>
                                                                        </div>

                                                                        <div className="in-stock-or-not"><p>{product.available === true ? "In Stock" : "Out of Stock"}</p>
                                                                        </div>
                                                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target={ "#myModal" + product.id }>
                                                                            <img src="/front/images/modal-plus-icon.png" alt=""/>
                                                                        </button>
                                                                    </div>
                                                                    <div className="increase-and-decrease-btns">
                                                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleIncreaseQuantity(product.id)}>+</button>
                                                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => handleDecreaseQuantity(product.id)}>-</button>
                                                                </div>
                                                                </label>
                                                                <ProductModal key={ product.id } item={ product }/>


                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </form>
                                        </div>

                                        <div className="cart-details">
                                            <form onSubmit={handleSubmit}>
                                                <div className="select-user-box">
                                                    <label htmlFor="user">
                                                        Select User
                                                    </label>
                                                    <select
                                                        name="user"
                                                        id="user"
                                                        onChange={(e) =>{
                                                            getUserPoints(
                                                                e.target
                                                                    .selectedOptions[0]
                                                                    .dataset
                                                                    .points,
                                                                e.target.value
                                                            ),
                                                            setFormData({...formData, user: e.target.value, pointUser: e.target.selectedOptions[0].dataset.points})
                                                        }
                                                        }
                                                    >
                                                        <option
                                                            value=""
                                                            selected
                                                            disabled
                                                        >
                                                            Select User
                                                        </option>
                                                        {users.map((user) => (
                                                            <option
                                                                key={user.id}
                                                                value={user.id}
                                                                data-points={
                                                                    user
                                                                        .point[0]
                                                                        ? user
                                                                            .point[0]
                                                                            .remaining_points
                                                                        : 0
                                                                }
                                                            >
                                                                {
                                                                    user.first_name
                                                                }{" "}
                                                                {user.last_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="select-user-box pricing-details">
                                                    <label htmlFor="cars">
                                                        Pricing Details
                                                    </label>
                                                    <div className="three-input-boxes">
                                                        <input
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                setFormData({ ...formData, title: e.target.value });
                                                            }}
                                                            type="text"
                                                            name="title"
                                                            placeholder="Title"
                                                        />
                                                        <input
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                setFormData({ ...formData, note: e.target.value });
                                                            }}
                                                            type="text"
                                                            name="note"
                                                            placeholder="Note(Optional)"
                                                        />
                                                        <input
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                setFormData({ ...formData, discount: e.target.value });
                                                            }}
                                                            type="text"
                                                            id="discount"
                                                            name="discount"
                                                            placeholder="Discount"
                                                        />
                                                        <input
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                setFormData({ ...formData, taxAmount: e.target.value });
                                                            }}
                                                            type="text"
                                                            name="taxAmount"
                                                            id="taxAmount"
                                                            placeholder="Tax Amount"
                                                        />
                                                        <input
                                                            onChange={(e) => {
                                                                handleChange(e);
                                                                setFormData({ ...formData, cashAmount: e.target.value });
                                                            }}
                                                            type="text"
                                                            name="cashAmount"
                                                            placeholder="Cash Amount"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="cart-table-box">
                                                    <table>
                                                        <tr>
                                                            <td>User Points</td>
                                                            <td>
                                                                <span id="userPoints">0</span>
                                                                &nbsp;&nbsp;
                                                                Points Value
                                                                is($
                                                                {Math.floor((value /
                                                                    points) *
                                                                    userPoints)}
                                                                )
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Net Price</td>
                                                            <td>
                                                                ${totalPrice}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Tax</td>
                                                            <td id="showTax">$0</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Discount</td>
                                                            <td id="showDiscount">$0</td>
                                                        </tr>
                                                        <tr>
                                                            <td className="bold-table-content">
                                                                Total Price
                                                            </td>
                                                            <td className="bold-table-content" id="showTotal">
                                                                ${totalPrice}
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </div>

                                                <div className="two-btns-inline">
                                                    {(cart?.length > 0 && (
                                                        <button className="active-btn">
                                                            Create Order Now
                                                        </button>
                                                    )) || (
                                                            <button
                                                                className="active-btn"
                                                                onClick={
                                                                    handleCreateOrder
                                                                }
                                                                style={{
                                                                    disabled: true,
                                                                }}
                                                            >
                                                                Create Order Now
                                                            </button>
                                                        )}
                                                    <Link
                                                        to="/inventory/list"
                                                        className="active-btn disable-btn"
                                                    >
                                                        Discard Order
                                                    </Link>
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
    );
}

export default CreateOrder;

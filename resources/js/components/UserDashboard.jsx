import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import service from "../config/axiosConfig";


function UserDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const { user } = useSelector((state) => state.user);
    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleSignout = async () => {
        try {
            dispatch(signoutSuccess());
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    const getLoyaltyPoints = async () => {
        try {
            const response = await service.get("/api/loyalty-points/" + user.id);
            setLoyaltyPoints(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        getLoyaltyPoints();
    }, [user]);

    return (
        <>
        <div className="col-lg-9 col-md-9 dashboard-right-sec ">
            <div className="row">
              <div className="col-lg-4">
                <div className="loyalty-points-box">
                  <div className="three-flex">
                  {user.subscription.is_premium == 1 ? (<img src="/front/images/crown-img.png" alt=""/>) : null}
                    <h2  className="gradient-text" >{loyaltyPoints.remaining_points}</h2>
                    <h3 className="gradient-text" >loyalty Points</h3>
                  </div>
                  <div className="loyalty-details">
                    <h4>{user.first_name} {user.last_name}</h4>
                    <ul>
                      <li>{user.email}</li>
                      <li>{user.phone}</li>
                      <li className="who-loyalty-person" >USER</li>
                    </ul>
                  </div>
                  <div className="top-img">
                    <img src="/front/images/loyalty-points-top-img.png" alt=""/>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="pacakge-owned-box">
                  <h6>Member Since : {formatTimestamp(user.created_at)} </h6>
                  <h5>Package Owned</h5>
                  <h4>{user.subscription.name}</h4>
                  <img src="/front/images/package-owned-img-right.png" alt=""/>
                </div>
              </div>
            </div>
            <div className="row dashboard-right-top-sec">
              <div className="col-lg-12">
                <div className="main-user-box userlist-box customer-dashboard">
                  <div className="two-align-thing">
                    <h3>Orders</h3>
                    <div className="aline-box">
                      <input type="search" placeholder="Search"/>
                      <button className="t-btn without-shadow"> See All Orders</button>
                    </div>
                  </div>
                  <div className="table-box">
                    <table>
                      <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                      <tr>
                        <td>Cruise Riding</td>
                        <td>$54.05</td>
                        <td>22 March 2024</td>
                        <td className="modal-btn"> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                          See Details</button> </td>
                      </tr>
                      <tr>
                        <td>Cruise Riding</td>
                        <td>$54.05</td>
                        <td>22 March 2024</td>
                        <td className="modal-btn"> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                          See Details</button> </td>
                      </tr>
                      <tr>
                        <td>Cruise Riding</td>
                        <td>$54.05</td>
                        <td>22 March 2024</td>
                        <td className="modal-btn"> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                          See Details</button> </td>
                      </tr>
                      <tr>
                        <td>Cruise Riding</td>
                        <td>$54.05</td>
                        <td>22 March 2024</td>
                        <td className="modal-btn"> <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                          See Details</button> </td>
                      </tr>

                    </table>
                  </div>
                  <div className="img-abs">
                    <img  className="user-list-img-top" src="/front/images/user-list-img-top.png" alt=""/>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal products-modal" id="myModal">
                <div class="modal-dialog">
                  <div class="modal-content">

                    <div class="modal-header">
                      <h4 class="modal-title">Product Name</h4>
                      <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    <div class="modal-body">
                      <div class="product-details-modal">
                        <ul>
                          <li>Price : $150</li>
                          <li>Code : XXXXX</li>
                          <li>QR Code : XXXXXXXXXXXXX</li>
                          <li>Other Details</li>
                        </ul>
                      </div>
                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                  </div>
                </div>
            </div>

            <div className="row footer-row">
              <div className="col-md-12">
                <div className="dash-board-footer">
                  <div className="two-align-box">
                    <p>© 2024 | All Rights Are Reserved</p>
                    <ul>
                      <li><a href="#">Facebook</a></li>
                      <li><a href="#">Instagram</a></li>
                      <li><a href="#">Twitter</a></li>
                      <li><a href="#">LinkedIn</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    );
}
export default UserDashboard;

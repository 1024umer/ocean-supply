import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import service from "../../../config/axiosConfig";
import { useNavigate, useParams } from "react-router-dom";
import SidebarMain from "../../../components/SidebarMain";

export default function Setting() {
    const navigate = useNavigate();
    const [points, setPoints] = useState("");
    const [value, setValue] = useState("");
    const [amount, setAmount] = useState("");
    const [is_active, setIsActive] = useState("");

    useEffect(() => {
        service
            .get("/api/setting/show")
            .then((res) => {
                const responseData = res.data;
                responseData.data.forEach((element) => {
                    if (element.key == "points") {
                        setPoints(element.value);
                    }
                    if (element.key == "value") {
                        setValue(element.value);
                    }
                    if (element.key == "amount") {
                        setAmount(element.value);
                    }
                    if (element.key == "is_active") {
                        setIsActive(element.value);
                    }
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await service
            .post("/api/settingUpdate", {
                points,
                value,
                amount,
                is_active,
            })
            .then((response) => {
                if (response.status === 200) {
                    toast.success("Update successful", {
                        position: "top-right",
                    });
                    navigate("/dashboard");
                } else {
                    toast.error("Update failed", {
                        position: "top-right",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                toast.error("Update failed", {
                    position: "top-right",
                });
            });
    };

    const handleChange = (e) => {
        const { checked } = e.target;
        if (checked) {
            document.getElementById("is_active").value = 1;
        } else {
            document.getElementById("is_active").value = 0;
        }
        const { name, value } = e.target;
        if (name === "points") {
            setPoints(value);
        } else if (name === "value") {
            setValue(value);
        } else if (name === "amount") {
            setAmount(value);
        } else if (name === "is_active") {
            setIsActive(value);
        }
    };

    return (
        <>
            <section className="main-dashboard">
                <div className="container-fluid dash-board">
                    <div className="row">
                        <SidebarMain />
                        <div className="col-lg-9 col-md-9 dashboard-right-sec ">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-main-design add-new-lp-charges admin-profile">
                                        <h2 className="form-main-heading">
                                            Update Setting
                                        </h2>
                                        <form onSubmit={handleSubmit}>
                                            <div className="two-inline-inputs">
                                                <div className="box">
                                                    <label htmlFor="points">
                                                        Customer will get Points
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="points"
                                                        name="points"
                                                        value={points}
                                                        onChange={handleChange}
                                                        placeholder="Points"
                                                    />
                                                </div>
                                                <div className="box">
                                                    <label htmlFor="value">
                                                        Points Value in $
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="value"
                                                        name="value"
                                                        value={value}
                                                        onChange={handleChange}
                                                        placeholder="Value"
                                                    />
                                                </div>
                                            </div>
                                            <div className="two-inline-inputs">
                                                <div className="box">
                                                    <label htmlFor="amount">
                                                        How much shopping will
                                                        get points
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id="amount"
                                                        name="amount"
                                                        value={amount}
                                                        onChange={handleChange}
                                                        placeholder="Amount"
                                                    />
                                                </div>
                                                <div className="radio-box">
                                                    <label htmlFor="is_active">
                                                        Active or Inactive
                                                    </label>
                                                    <input
                                                        type="checkbox"
                                                        id="is_active"
                                                        name="is_active"
                                                        // value={is_active}
                                                        onChange={handleChange}
                                                        checked={
                                                            is_active == 1
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <button type="submit">
                                                Update Now
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

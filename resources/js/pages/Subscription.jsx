import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCheck } from "react-icons/md";
import { Link } from "react-router-dom";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import service from "../config/axiosConfig";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Card } from "flowbite-react";
import Navigation from "../components/Navigation";

const Subscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const getSubscription = async () => {
        const response = await service.get("/api/subscriptionList");
        setSubscriptions(response.data.data);
    };
    useEffect(() => {
        getSubscription();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <>
            {/* <section className="container mx-auto inline-block h-screen pt-20">
                <div className="text-center mt-8">
                    <h2 className="font-bold text-3xl text-black">
                        Subscription
                    </h2>
                    <p className="mt-3 text-white">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit.
                    </p>
                </div>
                <Slider {...settings}>
                    {subscriptions.map((subscription) => (
                        <Card key={subscription.id} className="max-w-sm mt-10">
                            <div className="grid grid-cols-12 text">
                                <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400 col-span-11">
                                    {subscription.name}
                                </h5>
                                {subscription.is_premium === 1 && (
                                    <div className="text-3xl text-yellow-400">
                                        <MdOutlineWorkspacePremium />
                                    </div>
                                )}
                            </div>
                            <div className="flex items-baseline text-gray-900 dark:text-white ">
                                <span className="text-3xl font-semibold">
                                    $
                                </span>
                                <span className="text-5xl font-extrabold tracking-tight">
                                    {subscription.price}
                                </span>
                            </div>
                            <p className="mb-5 font-light text-gray-500 dark:text-gray-400">
                                For {subscription.title}
                            </p>
                            <ul className="my-7 space-y-5">
                                <li className="flex space-x-3">
                                    <svg
                                        className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
                                        {subscription.description}
                                    </span>
                                </li>
                            </ul>
                            <Link
                                to={`/signup/${subscription.id}`}
                                className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900"
                            >
                                Subscribe
                            </Link>
                        </Card>
                    ))}
                </Slider>
            </section> */}
            <section className="main-bg-design slider-page-bg">
            <div className="container-fluid p-0">
                <div className="row">
                    <div className="col-md-12">
                        <div className="main-logo text-center">
                            <img src="assets/images/large-logo.png" alt=""/>
                        </div>
                    </div>
                </div>
                <div className="row pricing-slider">
                {subscriptions.map((subscription) => (
                    <div key={subscription.id} className="col-lg-6 col-md-12">
                        <div className="content">
                            <h3>{subscription.name}</h3>
                            <p>{subscription.title}</p>
                            <p>{subscription.description}</p>
                            <h4>${subscription.price}</h4>
                            <Link to={`/signup/${subscription.id}`} className="t-btn t-btn-gradient"> Subscribe</Link>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            </section>
        </>
    );
};

export default Subscription;

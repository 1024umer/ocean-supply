import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { MdCheck } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MdOutlineWorkspacePremium } from "react-icons/md";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const getSubscription = async() => {
    const response = await axios.get('http://127.0.0.1:8000/api/subscription');
    setSubscriptions(response.data.data)
  }
useEffect(()=>{
  getSubscription()
},[])
  return (
    <>
      <section className='container mx-auto'>
        <div className='text-center mt-8'>
          <h2 className='font-bold text-3xl text-violet-700'>Subscription</h2>
          <p className='mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Et optio alias officiis voluptatum ex aliquam, </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
          {subscriptions.map(subscription => (
            <div key={subscription.id} className="border rounded p-3 text-center">
              <div className='grid grid-cols-12 gap-4'>
              <h1 className="font-bold text-3xl bg-gradient-to-br from-blue-700 to-violet-700 text-transparent bg-clip-text col-span-11">{subscription.name}</h1>
              {subscription.is_premium === 1 &&
              <div className='text-3xl text-yellow-400'>
              < MdOutlineWorkspacePremium />
              </div>
              }
              </div>
              <h3>{subscription.title}</h3>
              <ul>
                <li><MdCheck /> Lorem ipsum dolor sit.</li>
                <li><MdCheck />Lorem ipsum dolor sit.</li>
                <li><MdCheck />Lorem ipsum dolor sit.</li>
                <li><MdCheck />Lorem ipsum dolor sit.</li>
                <li><MdCheck />Lorem ipsum dolor sit.</li>
                <li><MdCheck />Lorem ipsum dolor sit.</li>
                <li><MdCheck />Lorem ipsum dolor sit.</li>
              </ul>
              <div className="grid grid-cols-2">
                <h1 className='mt-5 font-medium'>${subscription.price}</h1>
                <Link to={`/signup/${subscription.id}`} className="w-full bg-gradient-to-br from-blue-700 to-violet-700 text-white p-2 rounded mt-3">Subscribe</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Subscription;

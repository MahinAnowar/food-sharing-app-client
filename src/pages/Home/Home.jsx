import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import FoodCard from '../../components/FoodCard/FoodCard';

const Home = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/featured-foods')
            .then(res => {
                setFeaturedFoods(res.data);
            })
            .catch(error => console.error(error));
    }, [axiosSecure]);

    return (
        <div>
            {/* Hero Banner */}
            <div className="hero min-h-[60vh]" style={{ backgroundImage: 'url(https://i.ibb.co/s5KPd6X/community-food-drive-poster.jpg)' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">Share the Joy of Food</h1>
                        <p className="mb-5">Join our community to share and discover delicious homemade food. Reduce food waste and connect with your neighbors.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>

            {/* Featured Foods Section */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">Featured Foods</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {
                            featuredFoods.slice(0, 6).map(food => (
                                <FoodCard key={food._id} food={food} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
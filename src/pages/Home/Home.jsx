import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaHandHoldingHeart, FaTruck, FaSmileBeam } from 'react-icons/fa';
import PageTitle from '../../components/PageTitle';

const Home = () => {
    const [featuredFoods, setFeaturedFoods] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchFeaturedFoods = async () => {
            try {
                const response = await axiosSecure.get('/featured-foods');
                setFeaturedFoods(response.data);
            } catch (error) {
                console.error('Failed to fetch featured foods:', error);
            }
        };
        fetchFeaturedFoods();
    }, [axiosSecure]);

    return (
        <div className="flex flex-col min-h-screen">
            <PageTitle title="Home" />
            {/* Hero Section */}
            <section
                className="relative h-[600px] flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2070&auto=format&fit=crop")' }}
            >
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
                    >
                        Share Food, <span className="text-green-500">Reduce Waste</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl mb-8 text-gray-200"
                    >
                        Join our community to connect excess food with those who need it.
                        Together, we can create a sustainable future.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Link
                            to="/add-food"
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-1"
                        >
                            Donate Now
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Featured Foods Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Foods</h2>
                        <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            Check out the latest available food items in your community. Grab them before they are gone!
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredFoods.slice(0, 6).map((food, index) => (
                            <motion.div
                                key={food._id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
                            >
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                        Active
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 truncate" title={food.foodName}>
                                        {food.foodName}
                                    </h3>
                                    <div className="flex items-center text-gray-500 mb-3 text-sm">
                                        <FaMapMarkerAlt className="mr-2 text-green-500" />
                                        <span className="truncate">{food.pickupLocation}</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-lg text-sm font-medium border border-green-100">
                                            Qty: {food.foodQuantity}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Expires: {new Date(food.expiredDateTime).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <Link
                                        to={`/food/${food._id}`}
                                        className="block w-full text-center bg-gray-900 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors duration-300"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {featuredFoods.length > 6 && (
                        <div className="text-center mt-12">
                            <Link to="/available-foods" className="text-green-600 font-bold hover:underline text-lg">
                                See All Foods &rarr;
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                        <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
                        <p className="text-gray-600 mt-4">Simple steps to make a big difference.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors duration-300 border border-green-100">
                            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mb-6 text-green-600">
                                <FaHandHoldingHeart className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">1. Donate</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Have excess food? Post it on our platform easily. List the details and location to share with your community.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors duration-300 border border-green-100">
                            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mb-6 text-green-600">
                                <FaTruck className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">2. Pickup</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Need food? Browse available items near you. Request the food and arrange a convenient pickup time.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-green-50 hover:bg-green-100 transition-colors duration-300 border border-green-100">
                            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mb-6 text-green-600">
                                <FaSmileBeam className="text-4xl" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-3">3. Enjoy</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Collect your food and enjoy! Help us reduce waste and build a stronger, happier community together.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

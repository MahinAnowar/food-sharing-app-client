import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaSearch, FaSortAmountDown, FaSortAmountUp, FaTh, FaThLarge } from 'react-icons/fa';
import PageTitle from '../../components/PageTitle';

const AvailableFoods = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [sortAsc, setSortAsc] = useState(true);
    const [isThreeColumn, setIsThreeColumn] = useState(true);

    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ['foods', search, sortAsc],
        queryFn: async () => {
            const res = await axiosSecure.get(`/all-foods?search=${search}&sort=${sortAsc ? 'asc' : 'desc'}`);
            return res.data;
        }
    });

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <PageTitle title="Available Foods" />
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">Available Foods</h1>
                    <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
                    <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                        Browse through our collection of available food items. Sort, search, and find what you need.
                    </p>
                </div>

                {/* Controls Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm mb-10 border border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search by food name..."
                            value={search}
                            onChange={handleSearch}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 sm:text-sm"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={() => setSortAsc(!sortAsc)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-all duration-300 shadow-sm"
                        >
                            {sortAsc ? <FaSortAmountUp /> : <FaSortAmountDown />}
                            <span className="font-medium">Expiry Date</span>
                        </button>

                        <button
                            onClick={() => setIsThreeColumn(!isThreeColumn)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-green-300 hover:text-green-600 transition-all duration-300 shadow-sm"
                            title="Change Layout"
                        >
                            {isThreeColumn ? <FaThLarge /> : <FaTh />}
                            <span className="font-medium">{isThreeColumn ? '2 Col' : '3 Col'}</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
                    </div>
                ) : isError ? (
                    <div className="text-center text-red-500 py-10">
                        <p>Error loading foods: {error.message}</p>
                    </div>
                ) : foods.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
                        <div className="text-6xl mb-4">🍽️</div>
                        <h3 className="text-2xl font-bold text-gray-400">No foods found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search terms.</p>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className={`grid gap-8 ${isThreeColumn ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}
                    >
                        {foods.map((food, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                key={food._id}
                                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group flex flex-col"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={food.foodImage}
                                        alt={food.foodName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        Available
                                    </div>
                                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <FaMapMarkerAlt className="text-green-400" /> {food.pickupLocation}
                                    </div>
                                </div>

                                <div className="p-6 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-gray-800 truncate flex-1 pr-2" title={food.foodName}>
                                            {food.foodName}
                                        </h3>
                                    </div>

                                    <div className="space-y-3 mb-6 flex-grow">
                                        <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                                            <span className="text-gray-500">Quantity</span>
                                            <span className="font-medium text-gray-800">{food.foodQuantity}</span>
                                        </div>
                                        <div className="flex justify-between text-sm border-b border-gray-50 pb-2">
                                            <span className="text-gray-500">Expires</span>
                                            <span className="font-medium text-gray-800">
                                                {new Date(food.expiredDateTime).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 ring-2 ring-green-100">
                                                {food.donator?.image ? (
                                                    <img src={food.donator.image} alt={food.donator.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">
                                                        {food.donator?.name?.charAt(0) || '?'}
                                                    </div>
                                                )}
                                            </div>
                                            <span className="text-sm text-gray-600 truncate max-w-[150px]">
                                                By {food.donator?.name || 'Anonymous'}
                                            </span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/food/${food._id}`}
                                        className="block w-full text-center bg-gray-900 hover:bg-green-600 text-white font-medium py-3 rounded-xl transition-colors duration-300 shadow-sm hover:shadow-md"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default AvailableFoods;

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import FoodCard from '../../components/FoodCard/FoodCard';
import useDebounce from '../../hooks/useDebounce';

const AvailableFoods = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('expiryDate'); // 'expiryDate' or '-expiryDate'
    const [layout, setLayout] = useState('grid-cols-3'); // 'grid-cols-3' or 'grid-cols-2'
    const axiosSecure = useAxiosSecure();
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: foods = [], isLoading, isError, error } = useQuery({
        queryKey: ['availableFoods', debouncedSearchTerm, sortBy],
        queryFn: async () => {
            const res = await axiosSecure.get(`/available-foods?search=${debouncedSearchTerm}&sort=${sortBy}`);
            return res.data;
        }
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    {/* Search Input */}
                    <div className="form-control w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search by food name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input input-bordered"
                        />
                    </div>

                    {/* Sort Button */}
                    <button
                        onClick={() => setSortBy(sortBy === 'expiryDate' ? '-expiryDate' : 'expiryDate')}
                        className="btn btn-primary"
                    >
                        Sort by Expiry Date {sortBy === 'expiryDate' ? '(Asc)' : '(Desc)'}
                    </button>

                    {/* Layout Toggle */}
                    <div className="flex gap-2">
                        <button onClick={() => setLayout('grid-cols-3')} className={`btn ${layout === 'grid-cols-3' ? 'btn-primary' : ''}`}>
                            3 Columns
                        </button>
                        <button onClick={() => setLayout('grid-cols-2')} className={`btn ${layout === 'grid-cols-2' ? 'btn-primary' : ''}`}>
                            2 Columns
                        </button>
                    </div>
                </div>

                {/* Foods Grid */}
                <div className={`grid gap-8 ${layout}`}>
                    {foods.map(food => (
                        <FoodCard key={food._id} food={food} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AvailableFoods;
import React, { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const { data: myFoods = [], isLoading, isError, error } = useQuery({
        queryKey: ['myFoods', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-foods/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // Only run the query if the user's email is available
    });

    const mutation = useMutation({
        mutationFn: (id) => axiosSecure.delete(`/foods/${id}`),
        onSuccess: () => {
            toast.success('Food item deleted successfully!');
            queryClient.invalidateQueries(['myFoods', user?.email]);
        },
        onError: () => {
            toast.error('Failed to delete food item.');
        },
    });

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            mutation.mutate(id);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="py-12 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">Manage My Foods</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Quantity</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myFoods.map(food => (
                                <tr key={food._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={food.foodImage} alt={food.foodName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{food.foodName}</div>
                                                <div className="text-sm opacity-50">{food.pickupLocation}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{food.foodQuantity}</td>
                                    <td><span className={`badge badge-ghost badge-sm ${food.foodStatus === 'available' ? 'badge-success' : 'badge-warning'}`}>{food.foodStatus}</span></td>
                                    <th>
                                        <Link to={`/update-food/${food._id}`} className="btn btn-primary btn-xs mr-2">Update</Link>
                                        <button onClick={() => handleDelete(food._id)} className="btn btn-error btn-xs">Delete</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageMyFoods;

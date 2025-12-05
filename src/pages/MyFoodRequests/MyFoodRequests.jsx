import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const MyFoodRequests = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: requestedFoods = [], isLoading, isError, error } = useQuery({
        queryKey: ['myRequestedFoods', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-requests/${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="py-12 bg-base-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-8">My Food Requests</h2>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Food Name</th>
                                <th>Donor Name</th>
                                <th>Expire Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestedFoods.map(request => (
                                <tr key={request._id}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={request.foodImage} alt={request.foodName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{request.foodName}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{request.donorName}</td>
                                    <td>{new Date(request.expireDate).toLocaleDateString()}</td>
                                    <td><span className={`badge badge-ghost badge-sm ${request.status === 'pending' ? 'badge-info' : 'badge-success'}`}>{request.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyFoodRequests;
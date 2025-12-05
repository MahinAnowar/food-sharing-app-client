import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import PageTitle from '../../components/PageTitle';

const MyFoodRequests = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['my-requests', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-requests/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen">
            <PageTitle title="My Food Requests" />
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">My Food Requests</h1>

            {requests.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <div className="text-6xl mb-4">🤷‍♂️</div>
                    <h3 className="text-xl font-semibold text-gray-600">No requests found</h3>
                    <p className="text-gray-500 mt-2">You haven't requested any food yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                    <table className="table w-full">
                        {/* head */}
                        <thead className="bg-green-50 text-green-700 uppercase text-xs font-bold">
                            <tr>
                                <th className="py-4">Food Details</th>
                                <th>Donor Name</th>
                                <th>Pickup Location</th>
                                <th>Request Date</th>
                                <th className="text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(request => (
                                <tr key={request._id} className="hover:bg-gray-50 transition-colors border-b border-gray-50">
                                    <td className="py-4">
                                        <div className="font-bold text-gray-800">{request.foodName}</div>
                                        <div className="text-xs text-gray-400">Expire: {new Date(request.expireDate).toLocaleDateString()}</div>
                                    </td>
                                    <td>{request.donatorName}</td>
                                    <td>{request.pickupLocation}</td>
                                    <td className="whitespace-nowrap">
                                        {new Date(request.requestDate).toLocaleDateString()}
                                        <div className="text-xs text-gray-400">{new Date(request.requestDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                    </td>
                                    <td className="text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${request.status === 'requested' ? 'bg-yellow-100 text-yellow-700' :
                                            request.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {request.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFoodRequests;

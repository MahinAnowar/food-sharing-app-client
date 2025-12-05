import React, { useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaEnvelope, FaBox } from 'react-icons/fa';

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const modalRef = useRef(null);
    const navigate = useNavigate();

    const { data: food, isLoading } = useQuery({
        queryKey: ['food', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/food/${id}`);
            return res.data;
        }
    });

    const requestMutation = useMutation({
        mutationFn: async (requestData) => {
            const res = await axiosSecure.post('/request-food', requestData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Food requested successfully!');
            modalRef.current.close();
            // navigate('/my-food-requests'); // Optional redirect
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to request food.');
        }
    });

    const handleRequest = (e) => {
        e.preventDefault();
        const form = e.target;
        const additionalNotes = form.additionalNotes.value;

        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            foodImage: food.foodImage,
            donatorName: food.donator.name,
            donatorEmail: food.donator.email,
            userEmail: user.email,
            requestDate: new Date().toISOString(),
            pickupLocation: food.pickupLocation,
            expireDate: food.expiredDateTime,
            additionalNotes,
            status: 'requested'
        };

        requestMutation.mutate(requestData);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="w-full md:w-1/2 h-80 md:h-auto relative">
                        <img
                            src={food.foodImage}
                            alt={food.foodName}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-green-700 font-bold shadow-sm">
                            {food.foodStatus !== 'available' ? 'Not Available' : 'Available'}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-gray-800 mb-4">{food.foodName}</h1>
                            <div className="flex items-center gap-2 text-gray-500 mb-2">
                                <FaMapMarkerAlt className="text-green-500" />
                                <span>{food.pickupLocation}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                                <FaCalendarAlt className="text-green-500" />
                                <span>Expires: {new Date(food.expiredDateTime).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                            <h3 className="font-semibold text-gray-700 mb-4">Donator Details</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xl">
                                    {food.donator?.image ? <img src={food.donator.image} alt="" className="w-full h-full rounded-full object-cover" /> : <FaUser />}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800">{food.donator?.name}</p>
                                    <p className="text-sm text-gray-500">{food.donator?.email}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="font-semibold text-gray-700 mb-2">Quantity</h3>
                            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                                <FaBox className="text-green-600" /> {food.foodQuantity}
                            </div>
                        </div>

                        <button
                            onClick={() => modalRef.current.showModal()}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                        >
                            Request Food
                        </button>
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            <dialog ref={modalRef} className="modal bg-transparent">
                {/* Fixed Overlay */}
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
                        {/* Header */}
                        <div className="bg-green-600 p-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-white">Confirm Request</h3>
                            <button
                                onClick={() => modalRef.current.close()}
                                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleRequest} className="p-0">
                            <div className="grid grid-cols-2 gap-4 p-6 bg-white">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Food Name</label>
                                    <input
                                        type="text"
                                        value={food.foodName}
                                        readOnly
                                        className="w-full bg-gray-100 border-none rounded-lg px-3 py-2 text-gray-700 text-sm font-medium focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Food ID</label>
                                    <input
                                        type="text"
                                        value={food._id}
                                        readOnly
                                        className="w-full bg-gray-100 border-none rounded-lg px-3 py-2 text-gray-700 text-sm font-medium focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Donator Email</label>
                                    <input
                                        type="text"
                                        value={food.donator?.email}
                                        readOnly
                                        className="w-full bg-gray-100 border-none rounded-lg px-3 py-2 text-gray-700 text-sm font-medium focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">My Email</label>
                                    <input
                                        type="text"
                                        value={user?.email}
                                        readOnly
                                        className="w-full bg-gray-100 border-none rounded-lg px-3 py-2 text-gray-700 text-sm font-medium focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Location</label>
                                    <input
                                        type="text"
                                        value={food.pickupLocation}
                                        readOnly
                                        className="w-full bg-gray-100 border-none rounded-lg px-3 py-2 text-gray-700 text-sm font-medium focus:ring-0"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Request Date</label>
                                    <input
                                        type="text"
                                        value={new Date().toLocaleDateString()}
                                        readOnly
                                        className="w-full bg-gray-100 border-none rounded-lg px-3 py-2 text-gray-700 text-sm font-medium focus:ring-0"
                                    />
                                </div>

                                <div className="col-span-2 space-y-1 mt-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Additional Notes</label>
                                    <textarea
                                        name="additionalNotes"
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none"
                                        rows="3"
                                        placeholder="Any questions or pickup details..."
                                        defaultValue={food.additionalNotes}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="bg-gray-50 px-6 py-4 flex justify-end items-center gap-3">
                                <button type="button" onClick={() => modalRef.current.close()} className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-200 font-medium transition-colors">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={requestMutation.isPending}
                                    className={`px-6 py-2 rounded-lg text-white font-bold shadow-md transition-all transform active:scale-95 ${requestMutation.isPending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'}`}
                                >
                                    {requestMutation.isPending ? 'Requesting...' : 'Request'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default FoodDetails;

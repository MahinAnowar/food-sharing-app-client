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
            <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white p-0 overflow-hidden max-w-2xl w-full">
                    <div className="bg-green-600 p-6 text-white flex justify-between items-center">
                        <h3 className="font-bold text-2xl">Confirm Request</h3>
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost text-white text-xl">✕</button>
                        </form>
                    </div>

                    <form onSubmit={handleRequest} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label text-sm font-medium text-gray-700">Food Name</label>
                                <input type="text" value={food.foodName} readOnly className="input input-bordered bg-gray-100 text-gray-600 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-medium text-gray-700">Food ID</label>
                                <input type="text" value={food._id} readOnly className="input input-bordered bg-gray-100 text-gray-600 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-medium text-gray-700">Donator Email</label>
                                <input type="text" value={food.donator?.email} readOnly className="input input-bordered bg-gray-100 text-gray-600 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-medium text-gray-700">My Email</label>
                                <input type="text" value={user?.email} readOnly className="input input-bordered bg-gray-100 text-gray-600 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-medium text-gray-700">Request Date</label>
                                <input type="text" value={new Date().toLocaleDateString()} readOnly className="input input-bordered bg-gray-100 text-gray-600 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label text-sm font-medium text-gray-700">Pickup Location</label>
                                <input type="text" value={food.pickupLocation} readOnly className="input input-bordered bg-gray-100 text-gray-600 cursor-not-allowed" />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label text-sm font-medium text-gray-700">Additional Notes</label>
                            <textarea
                                name="additionalNotes"
                                className="textarea textarea-bordered h-24 focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                placeholder="Let the donator know when you can pick up..."
                                defaultValue={food.additionalNotes} // Or leave empty for new notes? Usually request notes might be different. I'll leave empty or placeholder. The prompt said "Allow user to type in 'Additional Notes'". I'll leave it empty.
                            ></textarea>
                        </div>

                        <div className="modal-action">
                            <button
                                type="submit"
                                disabled={requestMutation.isPending}
                                className={`btn border-none text-white w-full text-lg ${requestMutation.isPending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'}`}
                            >
                                {requestMutation.isPending ? 'Requesting...' : 'Request'}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default FoodDetails;

import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const FoodDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [additionalNotes, setAdditionalNotes] = useState('');

    const { data: food, isLoading, isError, error } = useQuery({
        queryKey: ['food', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/foods/${id}`);
            return res.data;
        }
    });

    const handleRequestSubmit = async (e) => {
        e.preventDefault();
        const requestData = {
            foodId: food._id,
            foodName: food.foodName,
            foodImage: food.foodImage,
            donorEmail: food.donatorEmail,
            donorName: food.donatorName,
            requesterEmail: user.email,
            requestDate: new Date().toISOString(),
            additionalNotes,
            status: 'pending'
        };

        try {
            const res = await axiosSecure.post('/request-food', requestData);
            if (res.data.insertedId) {
                toast.success('Food requested successfully!');
                setIsModalOpen(false);
            }
        } catch (error) {
            toast.error('Failed to request food.');
            console.error(error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div className="py-12 bg-base-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="card lg:card-side bg-base-100 shadow-xl">
                    <figure className="lg:w-1/2"><img src={food.foodImage} alt={food.foodName} className="object-cover h-full w-full" /></figure>
                    <div className="card-body lg:w-1/2">
                        <h2 className="card-title text-3xl">{food.foodName}</h2>
                        <p>Quantity: {food.foodQuantity}</p>
                        <p>Pickup Location: {food.pickupLocation}</p>
                        <p>Expires on: {new Date(food.expireDate).toLocaleDateString()}</p>
                        <p>Notes: {food.additionalNotes}</p>
                        <div className="divider"></div>
                        <div className="flex items-center">
                            <div className="avatar">
                                <div className="w-12 h-12 rounded-full">
                                    <img src={food.donatorImage} alt={food.donatorName} />
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="font-bold">{food.donatorName}</p>
                                <p className="text-sm text-gray-500">{food.donatorEmail}</p>
                            </div>
                        </div>
                        <div className="card-actions justify-end mt-4">
                            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">Request Food</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Request Modal */}
            {isModalOpen && (
                <div className="modal modal-open">
                    <div className="modal-box w-11/12 max-w-5xl">
                        <h3 className="font-bold text-lg mb-4">Request This Food</h3>
                        <form onSubmit={handleRequestSubmit}>
                            {/* Non-editable fields */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Food Name</span></label>
                                    <input type="text" value={food.foodName} className="input input-bordered" readOnly />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Food ID</span></label>
                                    <input type="text" value={food._id} className="input input-bordered" readOnly />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Donor Name</span></label>
                                    <input type="text" value={food.donatorName} className="input input-bordered" readOnly />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Your Email</span></label>
                                    <input type="text" value={user.email} className="input input-bordered" readOnly />
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Request Date</span></label>
                                    <input type="text" value={new Date().toLocaleDateString()} className="input input-bordered" readOnly />
                                </div>
                            </div>
                             <div className="form-control mt-4">
                                <label className="label"><span className="label-text">Food Image</span></label>
                                <img src={food.foodImage} alt={food.foodName} className="w-32 h-32 object-cover rounded-md" />
                            </div>
                            
                            {/* Editable field */}
                            <div className="form-control mt-4">
                                <label className="label"><span className="label-text">Additional Notes</span></label>
                                <textarea
                                    value={additionalNotes}
                                    onChange={(e) => setAdditionalNotes(e.target.value)}
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Any additional requests or information..."
                                ></textarea>
                            </div>

                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Confirm Request</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetails;
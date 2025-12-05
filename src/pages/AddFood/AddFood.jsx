import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { FaUtensils, FaMapMarkerAlt, FaCalendarAlt, FaClipboardList, FaImage, FaBox } from 'react-icons/fa';
import PageTitle from '../../components/PageTitle';

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: async (newFood) => {
            const response = await axiosSecure.post('/add-food', newFood);
            return response.data;
        },
        onSuccess: () => {
            toast.success('Food added available for sharing!');
            navigate('/available-foods');
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to add food. Please try again.');
        }
    });

    const handleAddFood = (e) => {
        e.preventDefault();
        const form = e.target;
        const foodName = form.foodName.value;
        const foodImage = form.foodImage.value;
        const foodQuantity = form.foodQuantity.value;
        const pickupLocation = form.pickupLocation.value;
        const expiredDateTime = form.expiredDateTime.value;
        const additionalNotes = form.additionalNotes.value;

        const foodData = {
            foodName,
            foodImage,
            foodQuantity: parseInt(foodQuantity),
            pickupLocation,
            expiredDateTime,
            additionalNotes,
            donator: {
                email: user.email,
                name: user.displayName,
                image: user.photoURL,
            },
            foodStatus: 'available',
        };

        mutation.mutate(foodData);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <PageTitle title="Add Food" />
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-green-600 py-6 px-8">
                    <h2 className="text-3xl font-extrabold text-white text-center">Add New Food</h2>
                    <p className="text-green-100 text-center mt-2">
                        Share your excess food with the community. Fill in the details below.
                    </p>
                </div>

                <form onSubmit={handleAddFood} className="py-8 px-8 space-y-6">
                    {/* Food Name & Image */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                                <FaUtensils className="text-green-600" /> Food Name
                            </label>
                            <input
                                type="text"
                                name="foodName"
                                required
                                placeholder="e.g. Grandma's Apple Pie"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                                <FaImage className="text-green-600" /> Food Image URL
                            </label>
                            <input
                                type="url"
                                name="foodImage"
                                required
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Quantity & Location */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                                <FaBox className="text-green-600" /> Quantity
                            </label>
                            <input
                                type="number"
                                name="foodQuantity"
                                required
                                min="1"
                                placeholder="e.g. 2"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                                <FaMapMarkerAlt className="text-green-600" /> Pickup Location
                            </label>
                            <input
                                type="text"
                                name="pickupLocation"
                                required
                                placeholder="e.g. Bashundhara R/A, Dhaka"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Expiry & Notes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                                <FaCalendarAlt className="text-green-600" /> Expire Date
                            </label>
                            <input
                                type="datetime-local"
                                name="expiredDateTime"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="flex items-center text-sm font-medium text-gray-700 gap-2">
                                <FaClipboardList className="text-green-600" /> Additional Notes
                            </label>
                            <textarea
                                name="additionalNotes"
                                required
                                rows="3"
                                placeholder="Any special instructions for pickup, allergens, etc."
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition-colors"
                            ></textarea>
                        </div>
                    </div>

                    {/* Donator Info (Read Only) */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <h3 className="text-lg font-medium text-gray-800 mb-4 border-b pb-2">Donator Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">Name</label>
                                <input
                                    type="text"
                                    defaultValue={user?.displayName}
                                    readOnly
                                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    defaultValue={user?.email}
                                    readOnly
                                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-transform transform active:scale-95 ${mutation.isPending
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-green-600 hover:bg-green-700 hover:shadow-xl'
                                }`}
                        >
                            {mutation.isPending ? 'Adding Food...' : 'Add Food'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddFood;

import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const AddFood = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [formData, setFormData] = useState({
        foodName: '',
        foodImage: '',
        foodQuantity: '',
        pickupLocation: '',
        expireDate: '',
        additionalNotes: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const foodItem = {
            ...formData,
            foodQuantity: parseInt(formData.foodQuantity, 10),
            donatorName: user.displayName,
            donatorEmail: user.email,
            donatorImage: user.photoURL,
            foodStatus: 'available' // Default status
        };

        try {
            const res = await axiosSecure.post('/add-food', foodItem);
            if (res.data.insertedId) {
                toast.success('Food item added successfully!');
                setFormData({
                    foodName: '',
                    foodImage: '',
                    foodQuantity: '',
                    pickupLocation: '',
                    expireDate: '',
                    additionalNotes: ''
                });
            }
        } catch (error) {
            toast.error('Failed to add food item.');
            console.error(error);
        }
    };

    return (
        <div className="py-12 bg-base-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="card w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h2 className="text-3xl font-bold text-center mb-6">Add a New Food Item</h2>
                        
                        {/* Donator Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Donator Name</span></label>
                                <input type="text" value={user?.displayName || ''} className="input input-bordered" readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Donator Email</span></label>
                                <input type="email" value={user?.email || ''} className="input input-bordered" readOnly />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Donator Image</span></label>
                                {user?.photoURL && <img src={user.photoURL} alt="Donator" className="w-16 h-16 rounded-full" />}
                            </div>
                        </div>

                        {/* Food Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="form-control">
                                <label className="label"><span className="label-text">Food Name</span></label>
                                <input type="text" name="foodName" value={formData.foodName} onChange={handleChange} placeholder="e.g., Homemade Lasagna" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Food Image URL</span></label>
                                <input type="text" name="foodImage" value={formData.foodImage} onChange={handleChange} placeholder="http://example.com/image.jpg" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Food Quantity</span></label>
                                <input type="number" name="foodQuantity" value={formData.foodQuantity} onChange={handleChange} placeholder="e.g., 4 (servings)" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Pickup Location</span></label>
                                <input type="text" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} placeholder="e.g., Downtown Community Center" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Expire Date</span></label>
                                <input type="date" name="expireDate" value={formData.expireDate} onChange={handleChange} className="input input-bordered" required />
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div className="form-control mt-4">
                            <label className="label"><span className="label-text">Additional Notes</span></label>
                            <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} className="textarea textarea-bordered h-24" placeholder="e.g., Contains nuts, available for pickup after 5 PM."></textarea>
                        </div>

                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Add Food</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFood;

import React, { useContext, useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaExclamationTriangle } from 'react-icons/fa';

const ManageMyFoods = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // State for Modals
    const [editingFood, setEditingFood] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const editModalRef = useRef(null);

    const { data: foods = [], isLoading } = useQuery({
        queryKey: ['my-foods', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/manage-foods/${user?.email}`);
            return res.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.delete(`/food/${id}`);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Food deleted successfully');
            setShowDeleteModal(false);
            setDeleteId(null);
            queryClient.invalidateQueries(['my-foods', user?.email]);
            queryClient.invalidateQueries(['foods']);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to delete food');
        }
    });

    const updateMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            const res = await axiosSecure.put(`/food/${id}`, updatedData);
            return res.data;
        },
        onSuccess: () => {
            toast.success('Food updated successfully');
            editModalRef.current.close();
            queryClient.invalidateQueries(['my-foods', user?.email]);
            queryClient.invalidateQueries(['foods']);
        },
        onError: (error) => {
            console.error(error);
            toast.error('Failed to update food');
        }
    });

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteMutation.mutate(deleteId);
        }
    };

    const openEditModal = (food) => {
        setEditingFood(food);
        editModalRef.current.showModal();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;
        const updatedData = {
            foodName: form.foodName.value,
            foodImage: form.foodImage.value,
            foodQuantity: parseInt(form.foodQuantity.value),
            pickupLocation: form.pickupLocation.value,
            expiredDateTime: form.expiredDateTime.value,
            additionalNotes: form.additionalNotes.value
        };

        updateMutation.mutate({ id: editingFood._id, updatedData });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-10 min-h-screen bg-gray-50">
            <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Manage My Foods</h1>

            {foods.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
                    <p className="text-xl text-gray-500 mb-4">You haven't shared any food items yet.</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100">
                    <table className="table w-full">
                        <thead className="bg-green-50 text-green-700 uppercase text-xs font-bold tracking-wider">
                            <tr>
                                <th className="px-6 py-4 text-left">Food Name</th>
                                <th className="px-6 py-4 text-left">Quantity</th>
                                <th className="px-6 py-4 text-left">Expire Date</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {foods.map(food => (
                                <tr key={food._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12 shadow-sm">
                                                    <img src={food.foodImage} alt={food.foodName} className="object-cover" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-800">{food.foodName}</div>
                                                <div className="text-sm text-gray-500">{food.pickupLocation}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-gray-700">{food.foodQuantity}</td>
                                    <td className="px-6 py-4 text-gray-600">{new Date(food.expiredDateTime).toLocaleDateString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => openEditModal(food)}
                                                className="btn btn-sm btn-circle btn-ghost text-green-600 hover:bg-green-50 hover:text-green-700 tooltip tooltip-bottom"
                                                data-tip="Edit"
                                            >
                                                <FaEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(food._id)}
                                                className="btn btn-sm btn-circle btn-ghost text-red-500 hover:bg-red-50 hover:text-red-700 tooltip tooltip-bottom"
                                                data-tip="Delete"
                                            >
                                                <FaTrash size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Edit Modal */}
            <dialog ref={editModalRef} className="modal bg-transparent">
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="bg-green-600 px-6 py-4 text-white flex justify-between items-center">
                            <h3 className="font-bold text-xl">Edit Food</h3>
                            <button onClick={() => editModalRef.current.close()} className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-1 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>

                        {editingFood && (
                            <form onSubmit={handleUpdate} className="p-8 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-1 md:col-span-2 space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Food Image URL</label>
                                        <input
                                            type="url"
                                            name="foodImage"
                                            defaultValue={editingFood.foodImage}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Food Name</label>
                                        <input
                                            type="text"
                                            name="foodName"
                                            defaultValue={editingFood.foodName}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Quantity</label>
                                        <input
                                            type="number"
                                            name="foodQuantity"
                                            defaultValue={editingFood.foodQuantity}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup Location</label>
                                        <input
                                            type="text"
                                            name="pickupLocation"
                                            defaultValue={editingFood.pickupLocation}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Expire Date</label>
                                        <input
                                            type="datetime-local"
                                            name="expiredDateTime"
                                            defaultValue={editingFood.expiredDateTime ? new Date(editingFood.expiredDateTime).toISOString().slice(0, 16) : ''}
                                            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Additional Notes</label>
                                    <textarea
                                        name="additionalNotes"
                                        defaultValue={editingFood.additionalNotes}
                                        className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-gray-700 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all resize-none h-24"
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex justify-end pt-4">
                                    <button
                                        type="submit"
                                        disabled={updateMutation.isPending}
                                        className={`w-full py-3 rounded-xl text-white font-bold shadow-md transition-all transform active:scale-95 ${updateMutation.isPending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'}`}
                                    >
                                        {updateMutation.isPending ? 'Updating...' : 'Update Food'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </dialog>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4 transform transition-all scale-100">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                                <FaExclamationTriangle className="text-red-600 text-xl" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure?</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                You cannot undo this action. This will permanently delete the food item.
                            </p>
                            <div className="flex gap-3 justify-center">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow-md transition-colors"
                                >
                                    {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageMyFoods;

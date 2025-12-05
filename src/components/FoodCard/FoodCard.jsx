import React from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
    const { _id, foodImage, foodName, donorImage, donorName, foodQuantity, pickupLocation } = food;

    return (
        <div className="card bg-base-100 shadow-xl">
            <figure><img src={foodImage} alt={foodName} className="h-48 w-full object-cover" /></figure>
            <div className="card-body">
                <h2 className="card-title">{foodName}</h2>
                <div className="flex items-center mt-2">
                    <div className="avatar">
                        <div className="w-8 h-8 rounded-full">
                            <img src={donorImage} alt={donorName} />
                        </div>
                    </div>
                    <p className="ml-2">{donorName}</p>
                </div>
                <p>Quantity: {foodQuantity}</p>
                <p>Pickup Location: {pickupLocation}</p>
                <div className="card-actions justify-end">
                    <Link to={`/foods/${_id}`} className="btn btn-primary">View Details</Link>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;

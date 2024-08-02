import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className='bg-primary border border-secondary-light shadow-md rounded-lg p-6 text-center grid grid-cols-9 place-items-center place-content-center w-full h-40 group hover:scale-105 transition-transform duration-300'>
            <div className='col-span-2 text-7xl  text-accent mb-4 group-hover:transform group-hover:scale-105 transition-transform duration-300'>
                {icon}
            </div>
            <div className='col-span-7 ml-4'>
                <h3 className='text-2xl font-semibold mb-2 group-hover:transform group-hover:scale-105 transition-transform duration-300'>{title}</h3>
                <p className='text-gray-600 group-hover:transform  transition-transform duration-300'>{description}</p>
            </div>
        </div>
    );
}

export default FeatureCard;

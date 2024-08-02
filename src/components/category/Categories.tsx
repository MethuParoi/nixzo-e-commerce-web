import React from 'react';
import LpProductCard from '../ui/CategoryCard';
import t1 from '../../../public/images/categories/trendy-1.jpg';
import t2 from '../../../public/images/categories/trendy-2.jpg';
import t3 from '../../../public/images/categories/trendy-3.jpg';
import c1 from '../../../public/images/categories/classic-1.jpg';
import c2 from '../../../public/images/categories/classic-2.jpg';
import c3 from '../../../public/images/categories/classic-3.jpg';
import m1 from '../../../public/images/categories/mens-1.jpg';
import m2 from '../../../public/images/categories/mens-2.jpg';
import m3 from '../../../public/images/categories/mens-3.jpg';
import l1 from '../../../public/images/categories/ladies-1.jpg';
import l2 from '../../../public/images/categories/ladies-2.jpg';
import l3 from '../../../public/images/categories/ladies-3.jpg';
import CategoryCard from '../ui/CategoryCard';

const products = [
    {
        title: 'Trendies',
        description: 'Elegance meets practicality in our collection of bags—crafted for every journey..',
        images: [t1, t2, t3],
        btnLink: '/',
    },
    {
        title: 'Classics',
        description: 'Experience sophistication with our wallets—where timeless design meets everyday function..',
        images: [c1, c2, c3],
        btnLink: '/',
    },
    {
        title: 'Mens',
        description: 'Step confidently in our shoes—designed for comfort and style with every stride.',
        images: [m1, m2, m3],
        btnLink: '/',
    },
    {
        title: 'Ladies',
        description: 'Step confidently in our shoes—designed for comfort and style with every stride.',
        images: [l1, l2, l3],
        btnLink: '/',
    }
    // Add more product objects as needed
];

const Categories = () => {
    return (
        <section className='bg-primary' id='category'>
            <div className='container mx-auto px-4 py-28'>
                <h2 className='text-5xl font-bold text-center text-accent mb-4'>Shop by Category</h2>
                <hr className="w-[26rem] h-1 bg-accent mx-auto mb-6" />
                <p className="text-center text-[1.6rem] text-secondary mb-8">
                    Explore our premium collection of handpicked items designed for trend and style.
                </p>
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 place-items-center "> */}
                <div className="flex flex-wrap gap-2 justify-center ">
                    {products.map((product, index) => (
                        <CategoryCard
                            key={index}
                            title={product.title}
                            images={product.images}
                            btnLink={product.btnLink}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
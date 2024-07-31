"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/images/logo/logo-wbg.png';
import {
    RiInstagramFill,
    RiYoutubeFill,
    RiTwitterFill,
    RiPhoneFill,
    RiMailFill,
    RiMapPinFill
} from 'react-icons/ri';
import {
    FaFacebook,
    FaPinterest,
    FaBell
} from 'react-icons/fa';

const Footer = () => {
    const [formStatus, setFormStatus] = useState('');
    const [formMessage, setFormMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormStatus('');
        setFormMessage('');

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setFormStatus('success');
                setFormMessage('Your message has been sent successfully!');
            } else {
                setFormStatus('error');
                setFormMessage('There was an issue sending the message. Please try again.');
            }
        } catch (error) {
            setFormStatus('error');
            setFormMessage('There was an issue sending the message. Please try again.');
        }
    };

    return (
        <section className='w-full bg-white'>
            <div className='footer container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-6 text-secondary'>
                <div className='footer-col-1 col-span-2 md:col-span-1 flex flex-col items-start p-4'>
                    <div className='flex flex-col item-start px-8 md:px-0'>
                        <Image src={logo} alt="logo" className='logo w-3/5 md:w-4/5 lg:w-2/5 h-auto' />
                        <p className='text-secondary'>We deliver quality garment outfits with exceptional craftsmanship.</p>
                        <ul className='mt-4'>
                            <li className='flex items-center mb-2'>
                                <RiPhoneFill className="mr-2 text-accent" />
                                <Link href="tel:+917894978567" className='text-secondary hover:text-accent-light active:text-accent'>+880 163 243 6671</Link>
                            </li>
                            <li className='flex items-center mb-2'>
                                <RiMailFill className="mr-2 text-accent" />
                                <Link href="mailto:info@nixzobd.com" className='text-secondary hover:text-accent-light active:text-accent'>info@nixzobd.com</Link>
                            </li>
                            <li className='flex items-center mb-2'>
                                <RiMapPinFill className="mr-2 text-accent" />
                                <Link href="https://www.google.com/maps/place/Banasree,+Dhaka/@23.7621306,90.4121949,14z/data=!3m1!4b1!4m6!3m5!1s0x3755b80a03c8e22f:0xd52685f4a2fe003c!8m2!3d23.7619353!4d90.433141!16s%2Fm%2F0j3g75s?entry=ttu" target="_blank" className='text-secondary hover:text-accent-light active:text-accent'>Banasree, Dhaka-1200</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer-col-2 flex flex-col items-center p-4'>
                    <div className='flex flex-col item-start'>
                        <h3 className='-ml-12 md:-ml-0 text-2xl text-accent font-semibold mb-2'>Quick Links</h3>
                        <ul className='-ml-12 md:-ml-0'>
                            <li className='text-secondary hover:text-accent-light active:text-accent mb-2'><Link href='/'>Trendies</Link></li>
                            <li className='text-secondary hover:text-accent-light active:text-accent mb-2'><Link href='/'>Classics</Link></li>
                            <li className='text-secondary hover:text-accent-light active:text-accent mb-2'><Link href='/'>Mens</Link></li>
                            <li className='text-secondary hover:text-accent-light active:text-accent mb-2'><Link href='/'>Ladies</Link></li>
                            <li className='text-secondary hover:text-accent-light active:text-accent mb-2'><Link href='/'>Combos</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='footer-col-3 flex flex-col items-center md:items-center p-4'>
                    <div className='flex flex-col item-start'>
                        <h3 className='-mr-12 md:-mr-0 text-2xl text-accent font-semibold mb-2'>Follow Nixzo</h3>
                        <ul className='-mr-12 md:-mr-0'>
                            <li className='flex text-secondary hover:text-accent-light active:text-accent items-center mb-2'><FaFacebook /> <Link href='https://linkedin.com/in/muhit-khan' className='ml-2' target="_blank">Facebook</Link></li>
                            <li className='flex text-secondary hover:text-accent-light active:text-accent items-center mb-2'><RiInstagramFill /> <Link href='https://linkedin.com/in/muhit-khan' className='ml-2' target="_blank">Instagram</Link></li>
                            <li className='flex text-secondary hover:text-accent-light active:text-accent items-center mb-2'><RiYoutubeFill /> <Link href='https://linkedin.com/in/muhit-khan' className='ml-2' target="_blank">Youtube</Link></li>
                            <li className='flex text-secondary hover:text-accent-light active:text-accent items-center mb-2'><RiTwitterFill /> <Link href='https://linkedin.com/in/muhit-khan' className='ml-2' target="_blank">Twitter</Link></li>
                            <li className='flex text-secondary hover:text-accent-light active:text-accent items-center mb-2'><FaPinterest /> <Link href='https://linkedin.com/in/muhit-khan' className='ml-2' target="_blank">Pinterest</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='footer-col-4 col-span-2 md:col-span-1 flex flex-col items-center md:items-start p-4'>
                    <h3 className='text-2xl text-accent font-semibold mb-2'>Newsletter</h3>
                    <p className='text-secondary px-6 md:px-0'>Join over 500 people who get special discounts and promotions sent straight to their inbox</p>
                    <form onSubmit={handleSubmit} className="space-y-4 px-5 md:px-0 w-full">
                        <input type="hidden" name="access_key" value={process.env.WEB3_FORMS_ACCESS_KEY} />
                        <input type="email" id="email" name='newsletter email' className="shadow-sm bg-primary border border-gray-600 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5" placeholder="example@gmail.com" required />
                        <button type="submit" className="md:w-fit bg-secondary font-semibold text-gray-50 py-1 px-4 rounded-lg inline-flex items-center justify-center gap-2 hover:bg-accent active:bg-accent-dark w-full">Subscribe <FaBell /></button>
                        {formStatus && (
                            <p className={`mt-4 text-sm ${formStatus === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {formMessage}
                            </p>
                        )}
                    </form>
                </div>
            </div>
            <div>
                <hr className='border-t border-gray-600' />
                <div className='flex-1 md:flex justify-around py-6'>
                    <p className='text-center text-secondary py-2 md:py-4'>© 2024 Nixzo BD. All rights reserved.</p>
                    <p className='text-center text-secondary py-2 md:py-4'>Powered by Cosmic Nodes</p>
                </div>
            </div>
        </section>
    );
}

export default Footer;
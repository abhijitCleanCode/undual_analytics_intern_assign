import React from 'react';
import { motion } from "framer-motion";
import { profile, circle } from '../assets';

const scaleVariants = {
    whileInView: {
        scale: [0, 1],
        opacity: [0, 1],
        transition: {
            duration: 1,
            ease: 'easeInOut',
        }
    }
}


const Header = () => {
    return (
        <header className='relative flex-1 w-full h-full flex justify-center items-center flex-col md:flex-row pt-[6rem] pb-[1rem] md:pb-[2rem] px-[2rem] md:px-[0rem] header'>
            <motion.div
                whileInView={{ x: [-100, 0], opacity: [0, 1] }}
                transition={{ duration: 0.5 }}
                className='flex-[0.65] flex flex-col justify-start items-start h-full my-0 mx-[2rem] w-full mr-0'
            >
                <div className='w-full flex flex-col justify-start md:justify-end items-start md:items-end '>
                    <div className='py-[1rem] px-[2rem] bg-white rounded-[15px] flex justify-center items-center flex-row w-auto' style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
                        <span className='text-[5rem] text-[2.5rem] md:text-[5rem]'>👋</span>
                        <div className='ml-20'>
                            <p className="text-[1.75rem] md:text-[0.8rem] text-left text-gray leading-6">Hello, welcome to</p>
                            <h1 className="text-[2.75rem] font-[800] text-center text-black capitalize">Swift Buy</h1>
                        </div>
                    </div>

                    <div className='py-[1rem] px-[2rem] bg-white rounded-[15px] flex flex-row w-auto flex-col mt-[3rem]' style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}>
                        <p className='w-full uppercase text-right'>Ecommerce</p>
                        <p className='w-full uppercase text-right'>Hub</p>
                    </div>
                </div>
            </motion.div>

            <motion.div
                whileInView={{ opacity: [0, 1] }}
                transition={{ duration: 0.5, delayChildren: 0.5 }}
                className='flex-1 h-full flex justify-end items-end relative'
            >
                <img src={profile} alt="profile" className='w-full object-contain z-1' />
                <motion.img
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    src={circle}
                    alt='profile_circle'
                    className='absolute left-0 right-0 bottom-0 z-0 w-full h-[90%]'
                />
            </motion.div>

            <motion.div
                variants={scaleVariants}
                whileInView={scaleVariants.whileInView}
                className='flex-[0.75] flex md:flex-row flex-wrap md:ml-0 justify-evenly items-start h-full ml-[1rem]'
            >
                {
                    ["Best Product", "Super Savings", "Rewards"].map((item, index) => {
                        // Define conditional styles for each child element based on index
                        const circleStyle = index === 0
                            ? 'w-[100px] h-[100px] m-[1rem]'
                            : index === 1
                                ? 'w-[150px] h-[150px] m-[1.75rem]'
                                : 'w-[70px] h-[70px] m-[0.75rem]';

                        return (
                            <div
                                key={`circle-${index}`}
                                className={`${circleStyle} rounded-full bg-white`}
                                style={{ boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)' }}
                            >
                            </div>
                        );
                    })
                }

            </motion.div>
        </header>
    )
}

export default Header
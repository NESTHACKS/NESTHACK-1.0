import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
	return (
		<div className='flex justify-between items-center lg:px-48 py-4 gap-[50px] min-h-[100vh] flex-col lg:flex-row bg-[#040B21] text-white relative'>
			<div className='flex flex-col justify-between lg:w-[50%] p-4 lg:px-0'>
				<h1 className='font-bold text-[2.5rem] lg:text-[3rem] mb-8'>
					<span>Word</span>s, decentralized on the <span>Chain</span>
				</h1>
				<p className='mb-4'>
					Stake your WCT and compete against people around the world in a hot
					Hurdle tournament
				</p>
				<p className='mb-4'>Get Rewards For Playing Wordle</p>
				<button className='border flex items-center text-white hover:bg-[#222]  justify-center border-[#0E1027] p-3 bg-[#0E1027] rounded-md uppercase whitespace-nowrap w-60'>
					get started
				</button>
			</div>
			<div className='relative h-[500px] w-96 '>
				<div className='absolute top-0 left-0 z-[99]'>
					<Image
						height={500}
						width={450}
						src='https://github.githubassets.com/images/modules/site/home/globe.jpg'
						alt='globe'
					/>
				</div>
				<div className='absolute bottom-0 right-0 z-[99]'>
					<Image
						height={200}
						width={180}
						src='/images/wordle.png'
						alt='wordle'
					/>
				</div>
			</div>
		</div>
	);
};

export default HeroSection;

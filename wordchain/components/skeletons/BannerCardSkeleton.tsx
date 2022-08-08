import React from 'react';

const BannerCardSkeleton = () => {
	return (
		<div className='w-full tablet:w-[46rem] smallLaptop:w-auto relative animate-pulse bg-gray-300 h-[310px] mt-4'>
			<div className='absolute top-[35%] left-5'>
				<div className='bg-gray-400 w-[7rem] h-6 mb-4' />
				<div className='bg-gray-400 w-[10rem] h-6' />
			</div>
			<div className='flex justify-between w-full items-center absolute bottom-16 left-5'>
				<div className='bg-gray-400 w-[10rem] h-6' />
				<div className='bg-gray-400 w-[5rem] h-6 absolute right-10'/>
			</div>
		</div>
	);
};

export default BannerCardSkeleton;

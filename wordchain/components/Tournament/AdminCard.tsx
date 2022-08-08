import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useRouter } from 'next/router';

const AdminCard = ({ tournament, route }: any) => {
	const router = useRouter();

	return (
		<div
			onClick={() => router.push(`/admin/${route}`)}
			className={`w-full cursor-pointer h-full  bg-[#040B21] px-4 py-8  rounded-lg text-white flex items-center justify-center !drop-shadow-[200px]`}
		>
			<div className=''>
				<p className='text-7xl text-center font-bold'>{tournament.amount}</p>
				<p className='text-center mt-4 uppercase'>{tournament.item}</p>
			</div>
		</div>
	);
};

export default AdminCard;

import React from 'react';
import AdminPageLayout from '../../components/AdminPageLayout/AdminPageLayout';

const AdvancedOptions = () => {
	return (
		<AdminPageLayout>
			<div className='grid  gap-12 mb-12'>
						<div className='drop-shadow-lg'>
							<h2 className='text-2xl mb-8 mt-12'>Advanced Options</h2>
							<div className='space-x-4 space-y-4'>
								<div className='flex items-center'>
									<p className='mr-4'>Contract Amenability</p>
									<button className='border border-[#0E1027] whitespace-nowrap p-3 bg-[#0E1027] text-white w-48 rounded-md uppercase'>
										pause contract
									</button>
								</div>
								<hr />
								<div className='my-4'>
									<form>
										<input
											className='mr-4 h-12 w-64 pl-4 rounded-md'
											type='text'
											placeholder='number of ether'
										/>
										<button
											type='submit'
											className='border border-[#0E1027] p-3 bg-[#0E1027] whitespace-nowrap text-white w-48 rounded-md uppercase'
										>
											fund contract
										</button>
									</form>
								</div>
								<hr />
								<div className='my-4'>
									<form>
										<input
											className='mr-4 h-12 w-64 pl-4 rounded-md'
											type='text'
											placeholder='number of ether'
										/>
										<button
											type='submit'
											className='border border-[#0E1027] p-3 bg-[#0E1027] whitespace-nowrap text-white w-48 rounded-md uppercase'
										>
											withdraw ether
										</button>
									</form>
								</div>
								<hr />
							
							</div>
						</div>
					</div>
		</AdminPageLayout>
		// <div>

		// 	<div className='flex'>
		// 		<div className='hidden md:block md:bg-black md:text-white md:min-h-[100vh] w-[300px]'>
		// 			<AdminSideBar />
		// 		</div>
		// 		<div className='ml-4 tablet:ml-0 md:w-[calc(100vw-300px)]'>
		// 			<div className='flex items-center justify-between'>
		// 				<h3 className='mt-8 text-2xl'>
		// 					Hello , <span className='text-purple-700'>nkem 😌</span>
		// 				</h3>
		// 				<div className='mr-4 mt-4'>
		// 					<button className='border mr-4 border-[#0E1027] p-3 bg-[#0E1027] text-white w-32 rounded-md uppercase'>
		// 						2 ETH
		// 					</button>
		// 					<button className='border border-[#0E1027] p-3 bg-[#0E1027] text-white w-32 rounded-md uppercase'>
		// 						7 WCT
		// 					</button>
		// 				</div>
		// 			</div>
					
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default AdvancedOptions;

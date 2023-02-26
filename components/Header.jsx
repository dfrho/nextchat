
//just a simple header
export const Header = () => {
	return (
		<div className='bg-blue-800 py-4 text-white font-semibold w-screen  shadow-2xl text-xl'>
			<div className='px-6 container flex justify-between'>
				<span>OPEN AI CHAT</span>
				<div
					className={`absolute bg-blue-800 overflow-hidden transition-all px-8 w-96 right-0 top-14 z-40 ${'h-0'
					}`}
				></div>
			</div>
		</div>
	);
};

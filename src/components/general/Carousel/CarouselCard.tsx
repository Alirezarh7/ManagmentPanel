import Zaer from '../../../assets/rais.png';

const CarouselCard = () => {
	return (
		<div className=' w-full'>
			<div className=' w-full '>
				<img alt='' src={Zaer} className='w-[382px] h-[233px] rounded-lg' />
			</div>
			<div className=' mt-[20px] w-full flex justify-center items-center '>
				<p className='text-2xl'>لورم اپیسوم متن فیکی است ..</p>
			</div>
		</div>
	);
};

export default CarouselCard;

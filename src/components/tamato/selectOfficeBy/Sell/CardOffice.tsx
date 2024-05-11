import './Card.css';

type MapType = {
	kargozarNo: number;
	address: string;
	cityName: string;
};

type CardProps = {
	value: MapType;
	onClick: () => void;
};

export const Card = (props: CardProps) => {
	const { kargozarNo, address, cityName } = props.value;

	return (
		<div className='Card justify-around text-justify mt-4'>
			<div className='w-full borderSection'>
				<div className='dataDiv'>
					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<p>کارگزار:</p>
							</div>
							<div className='alireza p-1'>
								<strong>{kargozarNo}</strong>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<p>آدرس:</p>
							</div>
							<div className='alireza p-1'>
								<strong>{address}</strong>
							</div>
						</div>
					</div>

					<div className='col'>
						<div className='flex'>
							<div className='alireza p-1'>
								<p>شهر:</p>
							</div>
							<div className='alireza p-1'>
								<strong>{cityName}</strong>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className='justify-around text-justify px-4' onClick={props.onClick}>
				<button className='btn button'>انتخاب</button>
			</div>
		</div>
	);
};

export default Card;

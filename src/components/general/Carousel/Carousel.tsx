import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './Carousel.css';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import CarouselCard from './CarouselCard';

export default function Carousel() {
	return (
		<div className='mx-2 flex flex-col border !border-[#E4CA6F] rounded-lg'>
			<div className='m-2 text-xl'>
				<strong>اطلاعیه های وبسایت</strong>
			</div>
			<div className='m-2'>
				<Swiper
					breakpoints={{
						450: {
							slidesPerView: 1
						},
						640: {
							slidesPerView: 2
						},
						768: {
							slidesPerView: 3
						},
						1024: {
							slidesPerView: 4
						}
					}}
					spaceBetween={30}
					autoplay={{
						delay: 3000,
						disableOnInteraction: false
					}}
					pagination={{
						type: 'bullets',
						bulletClass: 'swiper-pagination-bullet',
						bulletActiveClass: 'swiper-pagination-bullet-Active',
						clickable: true
					}}
					modules={[Autoplay, Pagination, Navigation]}
					navigation={true}>
					{new Array(5).fill(0).map(i => (
						<SwiperSlide className=''>
							<CarouselCard />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
}

import React from 'react';
import './CardPeyment.css';

interface RulsData {
	duplicateEzam: number;
}
const CardRulesForpayment = (props: RulsData) => {
	return (
		<div className='flex justify-center mt-4'>
			<div className='flex flex-col cardInformationPeyment '>
				<div className='flex justify-center cardTitleInformationPeyment'>
					<strong>موارد مهم</strong>
				</div>
				{props.duplicateEzam === 1 || props.duplicateEzam === 2 ? (
					<div className='flex justify-center mt-3 px-2'>
						<p>
							زائر گرامی مبلغ :<strong className='text-danger'>128/990/000</strong> , ریال بابت مابه التفاوت عدم واریز قسط دوم در
							سال
							<strong className='text-danger'>1399</strong> , در هزینه های سفر شما محاسبه و درج گردید.
						</p>
					</div>
				) : (
					<strong className='mt-2 mx-3'>زائر گرامی:</strong>
				)}
				<ul>
					<li>1- درصورت ثبت نشدن اطلاعات فرهنگی یا اطلاعات گذرنامه قابلیت پرداخت فیش اصلی یا تکمیل برای شما فعال نمی باشد.</li>
					<li>2- در صورت عدم تایید پزشکی و یا بدهکاری هزینه سفر امکان پرداخت فیش قربانی برای شما فعال نمی باشد.</li>
					<li>
						3- در صورتی که خطای "مبلغ نامعتبر" را دریافت کردید, این خطا مربوط به سقف مبلغ قابل پرداخت از کارت میباشد. لذا میتوانید
						جهت افزایش سقف پرداخت به یکی از شعب صادر کننده کارت مراجعه نمایید و یا از کارت دیگری استفاده کنید.
					</li>
				</ul>
			</div>
		</div>
	);
};

export default CardRulesForpayment;

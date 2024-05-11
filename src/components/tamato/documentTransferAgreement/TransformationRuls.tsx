import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../general/Buttons/CustomButton';
import useTitle from '../../../hooks/useTitle';
import './callCompleteTransformation.css';

const TransformationRules = () => {
	useTitle('legalRequirements');
	const [isValidNextBtn, setIsValidNextBtn] = useState(false);

	return (
		<>
			<div className='w-full mt-4 flex flex-col '>
				<div>
					<h4 className={'box-title text-center bodyOfBuyWayReuls rounded-lg '}>قوانین و مقررات</h4>
					<div className={'box-info accept-rules'}>
						<ul className={'list-unstyled'}>
							<li>
								متقاضی گرامی ضمن خوشامدگویی، به اطلاع میرساند سازمان حج و زیارت بعنوان متولی امور حج و زیارت و تنها مرجع دارای
								صلاحیت صدور مجوز واگذاری، در راستای توسعه دولت الکترونیک و به منظور کاهش مراجعات حضوری، تسهیل و تسریع در انجام
								امور ، کاهش نقش واسطه‌ها، امکان شناسایی و استفاده حداکثری از ظرفیتها در موضوع واگذاری و یا تهیه اولویتهای تشرف به
								حج تمتع برای کسانی که به دلائل و ملاحظات مختلفی قصد واگذاری و یا تهیه اینگونه اولویتها را دارند اقدام به
								راه‌اندازی این سامانه نموده است.
							</li>
							<li>
								بنابراین مراتب صرفاً جهت آگاهی بخشی و ثبت درخواست افراد متقاضی واگذاری یا تهیه اولویت تشرف به حج تمتع در استان
								موردنظر بوده و هرگونه اقدامی در این خصوص منوط به طی مراحل و فرآیندهای مقرر و قانونی در این حوزه می‌باشد. اضافه
								می‌نماید واگذاری بعد از مراجعه به دفاتر خدمات زیارتی مجاز و انجام دیگر مراحل نهایی خواهد شد و به هرحال مسئولیت
								اطلاعات ثبت شده در سامانه تماماً به عهده متقاضی می‌باشد. لازم به ذکر است، درج اطلاعات و درخواست در این سامانه هیچ
								مسئولیت و تعهدی را برای سازمان حج و زیارت در انجام یا عدم انجام واگذاری اولویت تشرف ایجاد نخواهد کرد.
							</li>
							<li>هر فرد فقط میتواند یک اولویت تشرف به حج تمتع داشته باشد.</li>
						</ul>
					</div>
					<div className={'requirements-auth-ruls'}>
						<input checked={isValidNextBtn} onClick={() => setIsValidNextBtn(!isValidNextBtn)} type='checkbox' id={'accept'} />
						<label className='checkBoxTailwind' htmlFor={'accept'}>
							موارد فوق را رویت و مطالعه نمودم.
						</label>
					</div>
					<div className='w-full flex justify-center gap-4'>
						<Link to={'/tamato/trade-document'}>
							<CustomButton variant={'primary'} type={'button'} label={'ادامه'} onClick={() => {}} disabled={!isValidNextBtn} />
						</Link>
						<Link to={'/tamato/my-documents'}>
							<CustomButton variant={'secondary'} type={'button'} label={'بازگشت'} onClick={() => {}} />
						</Link>
					</div>
				</div>
			</div>
		</>
	);
};

export default TransformationRules;

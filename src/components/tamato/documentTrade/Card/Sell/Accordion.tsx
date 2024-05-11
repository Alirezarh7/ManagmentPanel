import { Collapse } from 'antd';
import './According.css';

const { Panel } = Collapse;

type DataType = {
	sanadNo: number;
	branchCode: number;
	kargozarNo: string;
	address: number;
	nationalCodeBuyerFollow: string;
	index?: number;
};
type CollapseProps = {
	value: DataType;
};

const According: React.FC<CollapseProps> = ({ value }) => (
	<>
		<div>
			<Collapse accordion className='rounded-lg mt-3'>
				<Panel className='boyPanel ' header={` انصراف از واگزاری سند`} key={`${value.index}`}>
					<div className='bodyAccording'>
						<div className='dataDivAccording '>
							<div className='col'>
								<div className='flex'>
									<div className='alirezaAccording p-1'>
										<p>شماره ودیعه:</p>
									</div>
									<div className='alirezaAccording p-1'>
										<strong>{value.sanadNo}</strong>
									</div>
								</div>
							</div>

							<div className='col'>
								<div className='flex'>
									<div className='alirezaAccording p-1'>
										<p>کد شعبه:</p>
									</div>
									<div className='alirezaAccording p-1'>
										<strong>{value.branchCode}</strong>
									</div>
								</div>
							</div>

							<div className='col'>
								<div className='flex'>
									<div className='alirezaAccording p-1'>
										<p>کارگزاری:</p>
									</div>
									<div className='alirezaAccording p-1'>
										<strong>{value.kargozarNo}</strong>
									</div>
								</div>
							</div>

							<div className='col'>
								<div className='flex'>
									<div className='alirezaAccording p-1'>
										<p>کدملی دریافت کننده:</p>
									</div>
									<div className='alirezaAccording p-1'>
										<strong>{value.nationalCodeBuyerFollow}</strong>
									</div>
								</div>
							</div>
						</div>
						<div className='dataDivAccording'>
							<div className='col'>
								<div className='flex'>
									<div className='alirezaAccording p-1'>
										<p>آدرس:</p>
									</div>
									<div className='alirezaAccording p-1'>
										<strong>{value.address}</strong>
									</div>
								</div>
							</div>
						</div>
					</div>
				</Panel>
			</Collapse>
		</div>
	</>
);

export default According;

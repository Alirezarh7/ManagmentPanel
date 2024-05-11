import React from 'react';
import { Modal } from 'react-bootstrap';
type MapType = {
	branchCode: number;
	sanadStatus: number;
	address: string;
	officeName: string;
	kargozarNo: string;
	flightDate: string;
	cap: any;
	cost: any;
	flyPortName: any;
};
type CardProps = {
	value: MapType;
	onClick: () => void;
};

const CardWithMoreInformation = (props: CardProps) => {
	return <></>;

	/*  const { cap, kargozarNo, address, officeName, flightDate, cost, flyPortName } = props.value;
    return (
        <div className={"karvan-info-parent"}>
        <div className={"karvan-info-container"}>
            <div className={"karvan__info__section__one"}>
                <div className={"karvan__info__section"}>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> شماره کاروان :</p>
                        <p>{item.karevanNo}</p>
                    </div>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> مدینه :</p>
                        <p>{item.med}</p>
                    </div>
                </div>
                <div className={"karvan__info__section"}>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> قیمت :</p>
                        <p>{item.price.toLocaleString()}</p>
                    </div>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> مذهب :</p>
                        <p>{item.religon}</p>
                    </div>
                </div>
                <div className={"karvan__info__section"}>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> نوع کاروان :</p>
                        <p>{item.karevanType}</p>
                    </div>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> مدیر کاروان :</p>
                        <p>{item.manager}</p>
                    </div>
                </div>
            </div>
            <div className={"karvan__info__section__one mt-2"}>
                <div className={"karvan__info__section"}>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> ظرفیت خالی :</p>
                        <p>{item.freeCap}</p>
                    </div>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}> ظرفیت کاروان :</p>
                        <p>{item.capacity}</p>
                    </div>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}>تاریخ حدودی پرواز : </p>
                        <p>{item.depositeDateDescription ? item.depositeDateDescription : "___"}</p>
                    </div>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}>گروه قیمتی مدینه :</p>
                        <p>{item.priceGroupMedina}</p>
                    </div>
                    <div className={"karvan__info"}>
                        <p className={"karvan__info__title"}>گروه قیمتی مکه :</p>
                        <p>{item.priceGroupMecca}</p>
                    </div>
                </div>
            </div>
            <div className={"more__info__text"}
                onClick={() => setShowMoreInfoKarvan(true)}
            >اطلاعات کاروان
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" className="svg__moreinfo">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
            <div className={`${showMoreInfoKarvan ? "karvan__info__section__more" : "hidden"}`}>
                <div className={"karvan__info__section"}>
                    <div className={"karvan__info__section"}>
                        <div className={"karvan__info"}>
                            <p className={"karvan__info__title"}>نام هتل مدینه :</p>
                            <p>{item.medinaHotelName}</p>
                        </div>
                        <div className={"karvan__info"}>
                            <p className={"karvan__info__title"}> هتل مدینه : </p>
                            <a target="_blank" href={item.medinaHotelLink} className={"hotel__icon"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    className="svg__moreinfo__hotel">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </a>
                        </div>
                        <div className={"karvan__info"}>
                            <p className={"karvan__info__title"}>نام هتل مکه :</p>
                            <p>{item.meccaHotelName}</p>
                        </div>
                        <div className={"karvan__info"}>
                            <p className={"karvan__info__title"}> هتل مکه : </p>
                            <a target="_blank" href={item.meccaHotelLink} className={"hotel__icon"}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor"
                                    className="svg__moreinfo__hotel">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                            </a>
                        </div>
                        <div className={"karvan__info"}>
                            <p className={"karvan__info__title"}>تلفن : </p>
                            <p>{item.tel}</p>
                        </div>
                    </div>
                </div>
                <div className={"karvan__info__addres mt-2 "}>
                    <p className={"karvan__info__title"}> آدرس : </p>
                    <p>{item.address}</p>
                </div>
                <div className={"more__info__text"}
                    onClick={() => setShowMoreInfoKarvan(false)}
                >بستن
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke-width="1.5" stroke="currentColor" className="svg__moreinfo">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
            </div>
        </div>
        <div className={"karvan_button"}>
            <button
                onClick={() => hendelSetRow(item)}
                className={'chose__karvan__btn'}>انتخاب</button>
        </div>
    </div>
    )*/
};

export default CardWithMoreInformation;

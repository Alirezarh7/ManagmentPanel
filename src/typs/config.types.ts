export interface IEditConfigDto {
  id: string;
  isOpenCompletion: boolean;
  isOpenPassengerGroup: boolean;
  isOpenReserve: boolean;
  isOpenPayment: boolean;
  isActive: boolean;
}

export interface IConfigResponse extends IEditConfigDto {
  configActionType: string;
  configActionTypeId: number;
}






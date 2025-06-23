

export type Const = {
  id: string,
  family: string,
  father: string,
  name: string,
  phoneNumber: string,
  nationalCode: string
}


export interface IRegistrationState extends Const {
  userName: string,
  email: string,
  emailConfirmed: boolean,
  phoneNumberConfirmed: boolean,
  lockoutEnabled: boolean,
  twoFactorEnabled: boolean,
  accessFailedCount: number,
  lockoutEnd: string,

}
export type ICreateUser2 = {
  name: string,
  family: string,
  nationalCode: string,
  provinceId: number,
  kargozarNoHaj: number,
  kargozarNoUmrah: number,
  mobile: string ,
  isActive: boolean
}
export interface IAdvancedSearchUsers extends Const {
  "businessId": string,
  "provinceName": string,
}

export type IUpdateUser = {
  "userId": number,
  "provinceId": number,
  "kargozarNoHaj": number,
  "kargozarNoUmrah": number,
  "mobile": {
  "value": string
},
  "isActive": boolean

}
export type createUser = {
  name: string,
    family: string,
    nationalCode: string,
    provinceId: number,
    kargozarNoHaj: number,
    kargozarNoUmrah: number,
    mobile: {
    value: string
  },
  isActive: boolean
}
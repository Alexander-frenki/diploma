export const MAX_CHARS = 255;
export const PASSWORD_MIN_LENGTH = 8;

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export const USER_DATA_REGEX = /^[А-ЯІЄЇҐа-яієїґ'][А-ЯІЄЇҐа-яієїґ'\- ]+$/;
export const CAR_NUMBER_REGEX =
  /^[авеікмнорстхАВЕІКМНОРСТХabeikmhopctxABEIKMHOPCTX]{2}[\d]{4}[авеікмнорстхАВЕІКМНОРСТХabeikmhopctxABEIKMHOPCTX]{2}$/;
export const CAR_VIN_REGEX = /^([a-zA-Z0-9]){17}$/;
export const COMPANY_CODE_REGEX = /^([0-9]){8}$/;
export const COMPANY_NAME_REGEX = /^[А-ЯІЄЇҐа-яієїґ'][А-ЯІЄЇҐа-яієїґ'\- ]+$/;

import PropTypes from "prop-types";
import { string, object, ref } from "yup";
import {
  CAR_NUMBER_REGEX,
  CAR_VIN_REGEX,
  COMPANY_CODE_REGEX,
  COMPANY_NAME_REGEX,
  EMAIL_REGEX,
  MAX_CHARS,
  PASSWORD_MIN_LENGTH,
  USER_DATA_REGEX,
} from "../../constants/validation";

const EMAIL_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .max(
    MAX_CHARS,
    `Адреса електронної пошти має містити не більше ${MAX_CHARS} символів`
  )
  .matches(EMAIL_REGEX, "Будь ласка, введіть свій адрес електронної пошти");
const PASSWORD_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .min(PASSWORD_MIN_LENGTH, "Пароль має містити не менше 8 символів")
  .max(MAX_CHARS, `Пароль має містити не більше ${MAX_CHARS} символів`);
const REPEAT_PASSWORD_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .min(PASSWORD_MIN_LENGTH, "Пароль має містити не менше 8 символів")
  .max(MAX_CHARS, `Пароль має містити не більше ${MAX_CHARS} символів`)
  .oneOf([ref("password")], "Паролі не збігаються");
const FIRST_NAME_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .max(MAX_CHARS, `Ім'я має містити не більше ${MAX_CHARS} символів`)
  .matches(USER_DATA_REGEX, "Будь ласка, введіть своє ім'я");
const LAST_NAME_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .max(MAX_CHARS, `Прізвище має містити не більше ${MAX_CHARS} символів`)
  .matches(USER_DATA_REGEX, "Будь ласка, введіть своє прізвище");
const CAR_NUMBER_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .matches(CAR_NUMBER_REGEX, "Некоректний формат номеру автомобіля");
const CAR_VIN_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .matches(CAR_VIN_REGEX, "Некоректний формат VIN коду автомобіля");
const COMPANY_CODE = string()
  .required("Поле обов’язкове для заповнення")
  .matches(COMPANY_CODE_REGEX, "Некоректний формат ЄДРПОУ коду компанії");
const COMPANY_NAME = string()
  .required("Поле обов’язкове для заповнення")
  .max(MAX_CHARS, `Назва компанії має містити не більше ${MAX_CHARS} символів`)
  .matches(COMPANY_NAME_REGEX, "Некоректний формат назви компанії");

const SCHEMAS = {
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
  firstName: FIRST_NAME_SCHEMA,
  lastName: LAST_NAME_SCHEMA,
  repeatPassword: REPEAT_PASSWORD_SCHEMA,
  carNumber: CAR_NUMBER_SCHEMA,
  carVin: CAR_VIN_SCHEMA,
  companyCode: COMPANY_CODE,
  companyName: COMPANY_NAME,
};

export function useValidation(fields) {
  return object({
    ...fields.reduce((acc, field) => ({ ...acc, [field]: SCHEMAS[field] }), {}),
  }).required();
}

useValidation.propTypes = {
  fields: PropTypes.arrayOf(string).isRequired,
};

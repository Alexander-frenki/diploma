import PropTypes from "prop-types";
import { string, object, ref } from "yup";
import {
  CAR_NUMBER_REGEX,
  CAR_VIN_REGEX,
  COMPANY_CODE_REGEX,
  COMPANY_NAME_REGEX,
  EMAIL_REGEX,
  FOP_CODE_REGEX,
  MAX_CHARS,
  PASSWORD_DIGIT_REGEX,
  PASSWORD_LOWERCASE_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_SPECIAL_REGEX,
  PASSWORD_UPPERCASE_REGEX,
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
  .max(MAX_CHARS, `Пароль має містити не більше ${MAX_CHARS} символів`)
  .matches(
    PASSWORD_LOWERCASE_REGEX,
    "Пароль має містити принаймні одну літеру у нижньому регістрі"
  )
  .matches(
    PASSWORD_UPPERCASE_REGEX,
    "Пароль має містити принаймні одну літеру у верхньому регістрі"
  )
  .matches(PASSWORD_DIGIT_REGEX, "Пароль має містити принаймні одну цифру")
  .matches(
    PASSWORD_SPECIAL_REGEX,
    "Пароль має містити принаймні один спеціальний символ"
  );
const REPEAT_PASSWORD_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .min(PASSWORD_MIN_LENGTH, "Пароль має містити не меньше 8 символів")
  .max(MAX_CHARS, `Пароль має містити не більше ${MAX_CHARS} символів`)
  .matches(
    PASSWORD_LOWERCASE_REGEX,
    "Пароль має містити принаймні одну літеру у нижньому регістрі"
  )
  .matches(
    PASSWORD_UPPERCASE_REGEX,
    "Пароль має містити принаймні одну літеру у верхньому регістрі"
  )
  .matches(PASSWORD_DIGIT_REGEX, "Пароль має містити принаймні одну цифру")
  .matches(
    PASSWORD_SPECIAL_REGEX,
    "Пароль має містити принаймні один спеціальний символ"
  )
  .oneOf([ref("password"), ref("newPassword")], "Паролі не збігаються");
const FIRST_NAME_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .max(MAX_CHARS, `Ім'я має містити не більше ${MAX_CHARS} символів`)
  .matches(USER_DATA_REGEX, "Будь ласка, введіть своє ім'я");
const PATRONYMIC_SCHEMA = string()
  .required("Поле обов’язкове для заповнення")
  .max(MAX_CHARS, `По батькові має містити не більше ${MAX_CHARS} символів`)
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
const FOP_CODE = string()
  .required("Поле обов’язкове для заповнення")
  .matches(FOP_CODE_REGEX, "Некоректний формат ІПН коду");

const SCHEMAS = {
  email: EMAIL_SCHEMA,
  password: PASSWORD_SCHEMA,
  newPassword: PASSWORD_SCHEMA,
  firstName: FIRST_NAME_SCHEMA,
  lastName: LAST_NAME_SCHEMA,
  repeatPassword: REPEAT_PASSWORD_SCHEMA,
  carNumber: CAR_NUMBER_SCHEMA,
  carVin: CAR_VIN_SCHEMA,
  companyCode: COMPANY_CODE,
  companyName: COMPANY_NAME,
  fopCode: FOP_CODE,
  patronymic: PATRONYMIC_SCHEMA,
};

export function useValidation(fields) {
  return object({
    ...fields.reduce((acc, field) => ({ ...acc, [field]: SCHEMAS[field] }), {}),
  }).required();
}

useValidation.propTypes = {
  fields: PropTypes.arrayOf(string).isRequired,
};

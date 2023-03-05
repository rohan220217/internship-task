import Validator from "validatorjs";

const loginRule = {
  userEmail: "required|email",
  userPassword: "required|string",
};

// Single validation
export const loginSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (loginRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: loginRule[key] }
    );
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};

// All validation
export const loginAllValidation = (data) => {
  const validation = new Validator(data, loginRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.error = validation.errors.all();
  }
  return validationResponse;
};

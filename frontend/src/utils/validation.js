import Validator from "validatorjs";

const loginRule = {
  userEmail: "required|email",
  userPassword: "required|string",
};

const signupRule = {
  userEmail: "required|email",
  userPassword: "required|string",
  userName: "required|string",
  userCompany: "required|string",
  isAdmin: "required|boolean",
};

const forgotpasswordRule = {
  userEmail: "required|email",
  oldPassword: "required|string",
  newPassword: "required|string",
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
export const signupSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (signupRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: signupRule[key] }
    );
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};
export const forgotPassSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (forgotpasswordRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: forgotpasswordRule[key] }
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
export const signupAllValidation = (data) => {
  const validation = new Validator(data, signupRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.error = validation.errors.all();
  }
  return validationResponse;
};
export const forgotPassAllValidation = (data) => {
  const validation = new Validator(data, forgotpasswordRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.error = validation.errors.all();
  }
  return validationResponse;
};

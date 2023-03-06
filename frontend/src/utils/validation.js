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
  userRevenuePercent: "required",
};

const forgotpasswordRule = {
  userEmail: "required|email",
  oldPassword: "required|string",
  newPassword: "required|string",
};

const userEditRule = {
  userName: "required|string",
  userCompany: "required|string",
  userRevenuePercent: "required",
  userStatus: "required|string",
};

const analyticsAddRule = {
  website: "required|string",
  adRevenueDollars: "required",
  adImpressions: "required",
  avgSiteViewingTime: "required",
  totalClicks: "required",
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
export const userEditSingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (userEditRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: userEditRule[key] }
    );
    validationResponse.isValid = validation.passes();
    if (!validationResponse.isValid) {
      validationResponse.errors = validation.errors.all();
    }
  }
  return validationResponse;
};
export const addAnalySingleFieldValidation = ({ key, value }) => {
  const validationResponse = { isValid: true };
  if (analyticsAddRule[key]) {
    const validation = new Validator(
      { [key]: value },
      { [key]: analyticsAddRule[key] }
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
export const userEditAllValidation = (data) => {
  const validation = new Validator(data, userEditRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.error = validation.errors.all();
  }
  return validationResponse;
};
export const addAnalyAllValidation = (data) => {
  const validation = new Validator(data, analyticsAddRule);
  const validationResponse = { isValid: validation.passes() };
  if (!validationResponse.isValid) {
    validationResponse.error = validation.errors.all();
  }
  return validationResponse;
};

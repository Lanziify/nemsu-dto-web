export const Validation = {
  validateLogin: (values) => {
    const errorMessage = {};
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // Login form validitions
    // Email validation
    if (!values.email) {
      errorMessage.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errorMessage.email = "Please enter a valid email address";
    }
    // Password validation
    if (!values.password) {
      errorMessage.password = "Password is required";
    }
    return errorMessage;
  },

  validateRegistration: (values) => {
    const errorMessage = {};
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    if (!values.name) {
      errorMessage.name = "Name is required.";
    }
    if (!values.position) {
      errorMessage.position = "Position is required.";
    }
    if (!values.office) {
      errorMessage.office = "Office is required.";
    }
    // Request form validations
    if (!values.email) {
      errorMessage.email = "Email is required.";
    } else if (!emailRegex.test(values.email)) {
      errorMessage.email = "Please enter a valid email address.";
    }
    // Password validation
    if (!values.password) {
      errorMessage.password = "Password is required.";
    } else if (!passwordRegex.test(values.password)) {
      errorMessage.password = "Password must be eight characters long, at least one letter and one number";
    }

    return errorMessage;
  },

  validateRequest: (values) => {
    const errorMessage = {};
    const deviceRegex = /^[a-zA-Z]+$/;

    // Request form validations
    if (!values.device) {
      errorMessage.device = "Please specify the type of your device.";
    }

    if (!values.brand) {
      errorMessage.brand = "Dont forget the brand of your device.";
    }
    if (!values.complaints) {
      errorMessage.complaints =
        "For easier troubleshooting, kindly provide some details regarding with the issue you are experiencing.";
    }

    return errorMessage;
  },

  validateResponse: (values) => {
    const errorMessage = {};

    if (!values.actionTaken) {
      errorMessage.actionTaken = "Please don't forget to fill out this field.";
    }
    if (!values.equipment) {
      errorMessage.equipment = "Please specify the type of equipment.";
    }

    return errorMessage;
  },

  validatePasswordReset: (values) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const errorMessage = {};

    if (!values.current) {
      errorMessage.currentPassword = "Please enter your current password";
    }
    
    if (!values.new) {
      errorMessage.newPassword = "Please enter your new password";
    } else if (!passwordRegex.test(values.new)) {
      errorMessage.newPassword = "Password must be eight characters long, at least one letter and one number";
    }

    if (!values.confirm || values.new != values.confirm) {
      errorMessage.confirmPassword = "Password does not match";
    }

    return errorMessage;
  },
};

export default Validation;

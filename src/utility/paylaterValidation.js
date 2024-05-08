

export const validateForm = (formData) => {
    const errors = {

    }
    if (formData.fname.length < 4 || formData.fname.length > 10) {
        errors.fname = "Enter valid name"
    }
    if (formData.lname.length > 10) {
        errors.lname = "Enter valid name"
    }
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(formData.email)) {
        errors.email = "Enter Valid Email"
    }
    if (formData.phone.length < 10 || formData.phone.length > 10) {
        errors.phone = "Enter Phone Number"
    }
    if (formData.income.length < 4 || formData.income.length > 10) {
        errors.income = "Enter Correct Amount"
    }

    return errors;
};
export function validatePhoneNumber(phoneNumber) {
    // Define the regular expression pattern for a valid phone number
    var phonePattern = /^\d{10}$/;

    // Test the phone number against the pattern
    return phonePattern.test(phoneNumber);
}
export function validateEmail(email) {
    // Define the regular expression pattern for a valid phone number
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the phone number against the pattern
    return emailRegex.test(email);
}

export function validateName(name) {
    // Check if the name is not empty
    if (!name) {
        return false;
    }

    // Check if the name contains only letters
    if (!/^[A-Za-z]+$/.test(name)) {
        return false;
    }

    // If all checks pass, the name is considered valid
    return true;
}
export function validatePAN(panNumber) {
    const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return regex.test(panNumber);
}

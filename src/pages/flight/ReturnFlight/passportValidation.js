export function isValidPassportNumber(passportNumber) {
    // Basic validation for illustrative purposes
    const passportRegex = /^[A-Z0-9]{6,20}$/; // Adjust the regex based on the specific rules

    if (!passportNumber || !passportRegex.test(passportNumber)) {
        return false;
    }

    // Additional checks based on specific rules for the country

    // Add more checks based on your requirements

    // If all checks pass, consider it valid
    return true;
}
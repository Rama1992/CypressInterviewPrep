export const emailId = () => {
    const randomNumber = `${Math.floor(Math.random() * 10000)}`;
    const email = `rama${randomNumber}@grr.la`;

    return email;
}
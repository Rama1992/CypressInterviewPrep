export const emailId = () => {
  const randomNumber = `${Math.floor(Math.random() * 10000)}`;
  const email = `ramaa${randomNumber}@grr.la`;

  return email;
};
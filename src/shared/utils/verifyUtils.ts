export const verifyEmail: (email: string | undefined) => boolean = (email) => {
  if (!email) return false;

  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(email);
};

export const verifyPassword: (password: string | undefined) => boolean = (
  password,
) => {
  if (!password) return false;

  const re = /^(?=.*[a-zA-Z])(?=.*[!@#$%^~*+=-])(?=.*[0-9])(?=.{8,20})/;
  return re.test(password);
};

export const verifyPhone: (phone: string | undefined) => boolean = (phone) => {
  if (!phone) return false;

  const re = /^\d{3}-\d{3,4}-\d{4}$/;
  return re.test(phone);
};

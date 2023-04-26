export const emailValidator = (email) => {
    const emailRegex = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/gm;
    if (!emailRegex.test(email)) { return false; } else { return true; };
  };

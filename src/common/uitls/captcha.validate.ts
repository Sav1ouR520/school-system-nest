export const captchaValidate = (code: string, captcha: string) => {
  const validation = code.toLocaleLowerCase() === captcha.toLocaleLowerCase();
  return {
    data: { validation },
    message: 'Incorrect verification code',
  };
};

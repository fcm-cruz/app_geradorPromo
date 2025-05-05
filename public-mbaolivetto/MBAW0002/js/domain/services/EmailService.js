export default class EmailValidatorRegex {
  constructor(emailInput) {
    this.emailInput = emailInput;
    this.emailElement = document.querySelector(emailInput);
  }

  isValidEmail(email) {
    const emailRegex = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
    return emailRegex.test(email);
  }

  validate() {
    const email = this.emailElement.value.trim();
    if (this.isValidEmail(email)) {
      console.log("E-mail válido:", email);
      return true;
    } else {
      console.error("E-mail inválido:", email);
      return false;
    }
  }
}
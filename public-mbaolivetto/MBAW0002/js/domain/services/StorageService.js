export default class UserStorage {
    constructor(nameInput, emailInput, phoneInput, itiInstance) {
      this.nameInput = nameInput;
      this.emailInput = emailInput;
      this.phoneInput = phoneInput;
      this.iti = itiInstance;
    }
  
    saveToLocalStorage() {
      const name = document.querySelector(this.nameInput).value;
      const email = document.querySelector(this.emailInput).value;
      const phone = document.querySelector(this.phoneInput).value;
  
      const [firstName, ...lastNameParts] = name.split(" ");
      const lastName = lastNameParts.join(" ") || " ";
  
      const userData = {
        primeiroNome: firstName,
        sobrenome: lastName,
        email: email,
        telefone: phone,
      };
  
      localStorage.setItem("_user_apiface", JSON.stringify(userData));
    }
  
    getFromLocalStorage() {
      const userData = localStorage.getItem("_user_apiface");
      return userData ? JSON.parse(userData) : null;
    }
  }
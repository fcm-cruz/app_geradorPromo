export default class FormAutoFill {
  constructor(userStorage, nameInput, emailInput, phoneInput) {
    this.userStorage = userStorage;
    this.nameInput = nameInput;
    this.emailInput = emailInput;
    this.phoneInput = phoneInput;
  }

  fillForm() {
    const userData = this.userStorage.getFromLocalStorage();
    if (userData) {
      this.nameInput.value = userData.name || '';
      this.emailInput.value = userData.email || '';
      this.phoneInput.value = userData.phone || '';
      console.log('Formulário preenchido automaticamente com os dados do localStorage.');
    }
  }
}
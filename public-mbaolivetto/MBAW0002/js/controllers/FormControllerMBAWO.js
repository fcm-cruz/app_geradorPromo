import { FormDataModel } from '../domain/models/FormDataModel.js';
import { PhoneService } from '../domain/services/PhoneService.js';
import { FormService } from '../domain/services/FormService.js';

import EmailValidatorRegex from '../domain/services/EmailService.js';
import UserStorage from '../domain/services/StorageService.js';
import FormAutoFill from '../domain/services/FormAutoFill.js';

document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const submitButton = document.querySelector('#submit-cta');

  const emailValidator = new EmailValidatorRegex('#email');
  const userStorage = new UserStorage('#name', '#email', '#phone', window.intlTelInput);
  const formAutoFill = new FormAutoFill(userStorage, nameInput, emailInput, phoneInput);
  
  formAutoFill.fillForm();

  if (phoneInput) {
    const iti = window.intlTelInput(phoneInput, {
      hiddenInput: "full_number",
      initialCountry: "br",
      preferredCountries: ["br", "pt", "us"],
      utilsScript: "https://cdn.timeprimo.com/launchpad/js/utils.js",
    });

    $(phoneInput).mask("(00) 00000-0000");

    phoneInput.addEventListener("countrychange", function () {
      const countryCode = iti.getSelectedCountryData().iso2;
      if (countryCode === "br") {
        $(phoneInput).mask("(00) 00000-0000", { watchDataMask: true });
      } else if (countryCode === "pt") {
        $(phoneInput).mask("(00) 000-0000", { watchDataMask: true });
      } else if (countryCode === "us") {
        $(phoneInput).mask("(000) 000-0000", { watchDataMask: true });
      } else {
        $(phoneInput).unmask();
      }
    });

    $(phoneInput).on("keyup change", function () {
      const countryCode = iti.getSelectedCountryData().iso2.toUpperCase();
      const numberAdapter = libphonenumber.parsePhoneNumber(this.value, countryCode);

      if (numberAdapter && numberAdapter.isValid()) {
        $(submitButton).css({ cursor: "pointer", opacity: "1" });
        $(submitButton).prop("disabled", false);
        document.querySelector("#valida-tel").style.display = "none";
      } 
      // else {
      //   $(submitButton).css({ cursor: "not-allowed", opacity: "0.5" });
      //   $(submitButton).prop("disabled", true);
      //   document.querySelector("#valida-tel").style.display = "block";
      //   $("#valida-tel").html(
      //     '<span style="background: red;color: #fff; padding: 0 5px; border-radius: 5px; font-size: 12px;">Informe seu whatsapp</span>'
      //   );
      // }
    });
    
  }

  if (submitButton) {
    submitButton.addEventListener('click', async function (event) {
      event.preventDefault();

      // Salva os dados do usuário no localStorage
      userStorage.saveToLocalStorage();

      // Verifica se o campo de nome está preenchido
      if (nameInput && !nameInput.value.trim()) {
        nameInput.setCustomValidity('Por favor, preencha o campo de nome.');
        nameInput.reportValidity();
        nameInput.focus();
        return;
      } else {
        nameInput.setCustomValidity('');
      }

      // Verifica se o campo de e-mail está preenchido e válido
      if (emailInput) {
        const isEmailValid = emailValidator.validate();
        if (!isEmailValid) {
          emailInput.setCustomValidity('Por favor, insira um e-mail válido.');
          emailInput.reportValidity();
          emailInput.focus();
          return;
        } else {
          emailInput.setCustomValidity('');
        }
      }

      // Verifica se o campo de telefone está preenchido e válido
      if (phoneInput && !PhoneService.validate(phoneInput.value)) {
        phoneInput.setCustomValidity('Por favor, preencha o campo de telefone corretamente.');
        phoneInput.reportValidity();
        phoneInput.focus();
        return;
      } else {
        phoneInput.setCustomValidity('');
      }

      const form = submitButton.closest('form');
      if (!form) {
        console.warn('Formulário não encontrado');
        return;
      }

      const formData = new FormData(form);
      const data = new FormDataModel(formData);

      await FormService.submitForm(data);
    });
  }
});

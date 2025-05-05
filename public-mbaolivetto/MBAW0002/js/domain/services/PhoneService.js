import { parsePhoneNumberFromString } from 'https://cdn.jsdelivr.net/npm/libphonenumber-js@latest/index.min.js';

export class PhoneService {
  static validate(phone) {
    const phoneNumber = parsePhoneNumberFromString(phone, 'BR');
    return phoneNumber && phoneNumber.isValid();
  }

  static format(phone) {
    const phoneNumber = parsePhoneNumberFromString(phone, 'BR');
    return phoneNumber ? phoneNumber.formatInternational() : phone;
  }
}

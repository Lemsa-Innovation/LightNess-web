import { AsYouType, parsePhoneNumberFromString } from "libphonenumber-js";

export function formatPhoneNumberToInter(phone: string, countryCode: string) {
  // Vérifier si le numéro commence par un zéro suivi de 9 chiffres
  const matchWithLeadingZero = phone.match(/^0([0-9]{9})$/);
  // Vérifier si le numéro est composé de 9 chiffres sans zéro initial
  const matchWithoutLeadingZero = phone.match(/^[1-9][0-9]{8}$/);
  if (matchWithLeadingZero) {
    const [, phoneNumber] = matchWithLeadingZero;
    const internationalFormat = countryCode.concat(phoneNumber);
    return internationalFormat;
  } else if (matchWithoutLeadingZero) {
    // Si le numéro est composé de 9 chiffres sans zéro initial, formater en format international directement
    const internationalFormat = countryCode.concat(phone);
    return internationalFormat;
  } else {
    return null;
  }
}

export function reformatLocalPhone(phoneNumber: string) {
  // Vérifier si le numéro commence par un zéro suivi de 9 chiffres
  const matchWithLeadingZero = phoneNumber.match(/^0([0-9]{9})$/);
  // Vérifier si le numéro est composé de 9 chiffres sans zéro initial
  const matchWithoutLeadingZero = phoneNumber.match(/^[1-9][0-9]{8}$/);
  if (matchWithLeadingZero) {
    return phoneNumber;
  } else if (matchWithoutLeadingZero) {
    return "0".concat(phoneNumber);
  }
}
export function formatPhoneToLocal(phoneNumber: string) {
  const parsedNumber = parsePhoneNumberFromString(phoneNumber);

  if (parsedNumber) {
    // Use AsYouType formatter to format the phone number to the local format
    const formatter = new AsYouType(parsedNumber.country);
    formatter.input(parsedNumber.number);
    const number = formatter.getNumber();
    if (number) {
      return "0".concat(number.nationalNumber);
    }
  }
  return phoneNumber;
}

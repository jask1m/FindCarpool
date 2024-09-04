import { UNI_DOMAIN } from "./constants";

// safety function to check if email address is from SJSU
export function validateEmail(email: string): boolean {
  const domain = email.split('@')[1];
  if (domain === UNI_DOMAIN) {
    return true;
  }
  return false;
}

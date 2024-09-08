import { UNI_DOMAIN } from "./constants";
// safety function to check if email address is from SJSU
export function validateEmail(email: string): boolean {
  const domain = email.split('@')[1];
  if (domain === UNI_DOMAIN) {
    return true;
  }
  return false;
}

export function parseDuration(duration: string): number {
  const match = duration.match(/^(\d+)([dhms])$/);
  if (!match) throw new Error('Invalid duration format');

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case 'd': return value * 24 * 60 * 60 * 1000; // days to milliseconds
    case 'h': return value * 60 * 60 * 1000; // hours to milliseconds
    case 'm': return value * 60 * 1000; // minutes to milliseconds
    case 's': return value * 1000; // seconds to milliseconds
    default: throw new Error('Invalid duration unit');
  }
}

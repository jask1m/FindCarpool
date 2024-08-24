// safety function to check if email address is from SJSU
export function validateEmail(email: string): boolean {
  const doman = email.split('@')[1];
  if (doman === 'sjsu.edu') {
    return true;
  }
  return false;
}

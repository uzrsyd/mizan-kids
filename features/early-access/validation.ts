export const earlyAccessFormSchema = {
  firstName: (value: string) => value.trim().length >= 2,
  email: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  numberOfChildren: (value: number) => Number.isInteger(value) && value >= 0,
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isEmailSuppressed(email: string, category: string) {
  if (!email || !category) {
    return false;
  }

  return false;
}

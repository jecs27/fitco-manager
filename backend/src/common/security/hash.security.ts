import * as bcrypt from 'bcrypt';

export const hashString = async (plainText: string): Promise<string> =>
  bcrypt.hash(plainText, 10);

export const compareHash = async (
  plainText: string,
  hashedText: string,
): Promise<boolean> => bcrypt.compare(plainText, hashedText);

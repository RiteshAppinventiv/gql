import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
  static generateSalt(length: number) {
    const salt = randomBytes(length).toString('hex');
    return salt;
  }
  static async toHash(password: string, salt: string) {
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}`;
  }

  static async compare(
    hashedPassword: string,
    suppliedPassword: string,
    salt: string,
  ) {
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buf.toString('hex') === hashedPassword;
  }
}

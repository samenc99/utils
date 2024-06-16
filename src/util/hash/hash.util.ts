import bcrypt from 'bcrypt';

export class HashUtil {
  static encrypt(text: string) {
    return bcrypt.hashSync(text, 10);
  }

  static compare(text: string, hash: string) {
    return bcrypt.compareSync(text, hash);
  }
}

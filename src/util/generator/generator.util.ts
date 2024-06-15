import { v4 } from 'uuid';

export class GeneratorUtil {
  static uuid() {
    return v4();
  }
}

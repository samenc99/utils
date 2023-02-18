import { validate } from 'class-validator';

export abstract class ValidatorAbstract {
  validate() {
    return validate(this);
  }
}

import { validateSync, ValidationError } from 'class-validator';

export function validateDtoSync(dto: any) {
  const errors = validateSync(dto);

  if (!errors.length) {
    return;
  }

  const make = (
    { constraints, children }: ValidationError,
    property: string,
  ) => {
    if (children.length) {
      make(children[0], `${property}.${children[0].property}`);
    }

    const keys = Object.keys(constraints);
    throw new Error(`${property} - ${constraints[keys[0]]}`);
  };

  make(errors[0], errors[0].property);
}

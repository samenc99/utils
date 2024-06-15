import {validate, ValidationError} from 'class-validator';
import {BadRequestException} from "@controlle.tecnologia/exceptions";

export async function validateDto(dto: any) {
  const errors = await validate(dto);

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
    throw new BadRequestException(`${property} - ${constraints[keys[0]]}`);
  };

  make(errors[0], errors[0].property);
}

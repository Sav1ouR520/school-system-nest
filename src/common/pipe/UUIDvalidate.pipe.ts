import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UuidvalidatePipe implements PipeTransform {
  transform(value: string) {
    const re = new RegExp(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i);
    if (!re.test(value)) {
      throw new BadRequestException(
        `Validation failed. '${value}' is not an uuid`,
      );
    }
    return value;
  }
}

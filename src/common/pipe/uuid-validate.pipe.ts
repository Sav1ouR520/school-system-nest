import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UUIDvalidatePipe implements PipeTransform {
  transform(data: string[] | string) {
    const re = new RegExp(/^[a-f\d]{4}(?:[a-f\d]{4}-){4}[a-f\d]{12}$/i);
    if (data instanceof Array) {
      const errorData = [];
      data.forEach((x) => (re.test(x) ? '' : errorData.push(x)));
      if (errorData.length !== 0) {
        throw new BadRequestException(
          `Validation failed. '${errorData}' is not an uuid`,
        );
      }
    } else {
      if (!re.test(data)) {
        throw new BadRequestException(
          `Validation failed. '${data}' is not an uuid`,
        );
      }
    }
    return data;
  }
}

import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class NotEmptyPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value);
    if (value) {
      return value;
    }
    throw new BadRequestException(
      `Validation failed. '${metadata.data}' can't be empty`,
    );
  }
}

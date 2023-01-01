import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { Length, IsBoolean } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UploadUserOtherInfoDto {
  @ApiProperty({ description: '用户名' })
  @Length(6, 20, { message: 'the length username should be 6 to 20' })
  readonly username: string;

  @ApiProperty({ description: '激活状态', type: Boolean })
  @IsBoolean()
  readonly activeStatue: boolean;
}

export class UpdateUserInfo extends IntersectionType(
  CreateUserDto,
  UploadUserOtherInfoDto,
) {}

export class UpdateUserDto extends PartialType(UpdateUserInfo) {}

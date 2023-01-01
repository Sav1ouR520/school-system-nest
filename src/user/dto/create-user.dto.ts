import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsBoolean, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '账号', example: 'helloworld' })
  @Length(6, 20, { message: 'the length account should be 6 to 20' })
  readonly account: string;

  @ApiProperty({ description: '密码', example: 'helloworld' })
  @Length(6, 30, { message: 'the length password should be 6 to 30' })
  readonly password: string;
}

class UserDtoOtherInfo {
  @ApiProperty({ description: '用户名', example: 'helloworld' })
  @Length(6, 20, { message: 'the length username should be 6 to 20' })
  readonly username: string;

  @ApiProperty({ description: '激活状态', example: true })
  @IsBoolean()
  readonly activeStatue: boolean;
}

export class UserInfo extends IntersectionType(
  CreateUserDto,
  UserDtoOtherInfo,
) {}

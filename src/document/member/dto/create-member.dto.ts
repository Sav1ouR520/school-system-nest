import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { MemberRole } from '../enum/memberRole';

export class CreateMemberInfo {
  @ApiProperty({ description: '用户id' })
  @IsUUID()
  userId: string;

  @ApiProperty({ description: '用户权限', enum: MemberRole })
  @IsEnum(MemberRole)
  role?: MemberRole;
}

export class CreateMemberDto {
  @ApiProperty({ description: '组id' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: '成员数组' })
  @IsNotEmpty()
  members: CreateMemberInfo[];
}

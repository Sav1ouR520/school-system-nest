import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MemberRole } from '../enum';

export class UploadMemberOtherInfo {
  @ApiProperty({ description: '唯一标识' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '群名' })
  @IsOptional()
  name: string;

  @ApiProperty({ description: '用户权限', enum: MemberRole })
  @IsEnum(MemberRole)
  @IsOptional()
  role?: MemberRole;
}

export class UploadMemberDto extends UploadMemberOtherInfo {
  @ApiProperty({ description: '组id' })
  @IsUUID()
  groupId: string;
}

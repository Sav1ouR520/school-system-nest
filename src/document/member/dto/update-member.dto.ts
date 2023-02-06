import { IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateMemberInfo } from './create-member.dto';

export class UploadMemberOtherInfo extends CreateMemberInfo {
  @ApiProperty({ description: '唯一标识' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: '群名' })
  @IsNotEmpty()
  name?: string;
}

export class UploadMemberDto {
  @ApiProperty({ description: '组id' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: '成员数组' })
  @IsNotEmpty()
  members: UploadMemberOtherInfo[];
}

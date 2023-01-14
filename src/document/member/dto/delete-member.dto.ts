import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsNumber } from 'class-validator';

export class deleteMemberInfo {
  @ApiProperty({ description: '唯一标识' })
  @IsNumber()
  id: number;

  @ApiProperty({ description: '用户id' })
  @IsUUID()
  userId: string;
}

export class deleteMemberDto extends deleteMemberInfo {
  @ApiProperty({ description: '组id' })
  @IsUUID()
  groupId: string;

  @ApiProperty({ description: '成员数组' })
  @IsNotEmpty()
  members: deleteMemberInfo[];
}

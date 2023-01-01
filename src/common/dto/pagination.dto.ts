import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: '数量', required: false, minimum: 1 })
  limit?: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: '页数', required: false, minimum: 1 })
  offset?: number;
}

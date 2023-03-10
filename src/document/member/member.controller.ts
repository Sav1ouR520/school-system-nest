import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UploadMemberDto } from './dto';
import { GetUser, UUIDvalidatePipe } from 'src/common';

@Controller('member')
@ApiTags('MemberController')
@ApiBearerAuth()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('groupId/:groupId')
  @ApiOperation({
    summary: '通过组id查找组员',
    description: '通过groupId查找组',
  })
  findMemberByGroupId(
    @Param('groupId', UUIDvalidatePipe) groupId: string,
    @GetUser('id') userId: string,
  ) {
    return this.memberService.findMemberByGroupId(groupId, userId);
  }

  @Get('userId/:groupId')
  @ApiOperation({
    summary: '查找具体某个组员',
    description: '通过userId查找组员',
  })
  findMemberByUserId(
    @Param('groupId', UUIDvalidatePipe) groupId: string,
    @GetUser('id') userId: string,
  ) {
    return this.memberService.findMemberByUserId(groupId, userId);
  }

  @Get()
  @ApiOperation({
    summary: '查找具体某个组员',
    description: '通过userId查找组员',
  })
  findMemberByMemberId(
    @Query('memberId', UUIDvalidatePipe) memberId: string,
    @Query('groupId', UUIDvalidatePipe) groupId: string,
    @GetUser('id') userId: string,
  ) {
    return this.memberService.findMemberByMemberId(groupId, userId, memberId);
  }

  @Delete()
  @ApiOperation({ summary: '删除成员', description: '删除成员' })
  deleteMember(
    @Body('ids', UUIDvalidatePipe) ids: string[],
    @GetUser('id') userId: string,
  ) {
    return this.memberService.deleteMember(ids, userId);
  }

  @Patch()
  @ApiOperation({ summary: '修改成员', description: '修改成员权限' })
  modifyMemberWithAdmin(
    @Body() memberDto: UploadMemberDto,
    @GetUser('id') userId: string,
  ) {
    return this.memberService.modifyMemberWithAdmin(memberDto, userId);
  }
}

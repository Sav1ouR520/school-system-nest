import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateMemberDto, deleteMemberDto, UploadMemberDto } from './dto';
import { GetUser, UUIDvalidatePipe } from 'src/common';

@Controller('member')
@ApiTags('MemberController')
@ApiBearerAuth()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('groupId/:groupId')
  @ApiOperation({ summary: '查找组', description: '通过id查找组' })
  findGroupByGroupId(@Param('groupId', UUIDvalidatePipe) groupId: string) {
    return this.memberService.findMember(groupId);
  }

  @Post()
  @ApiOperation({ summary: '添加成员', description: '添加成员' })
  addMember(@Body() memberDto: CreateMemberDto, @GetUser('id') id: string) {
    return this.memberService.addMember(memberDto, id);
  }

  @Delete()
  @ApiOperation({ summary: '删除成员', description: '删除成员' })
  deleteMember(@Body() memberDto: deleteMemberDto, @GetUser('id') id: string) {
    return this.memberService.deleteMember(memberDto, id);
  }

  @Patch()
  @ApiOperation({ summary: '修改成员', description: '修改成员权限' })
  modifyMember(@Body() memberDto: UploadMemberDto, @GetUser('id') id: string) {
    return this.memberService.modifyMember(memberDto, id);
  }
}

import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { MemberService } from './member.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateMemberDto, deleteMemberDto, UploadMemberDto } from './dto';

@Controller('member')
@ApiTags('MemberController')
@ApiBearerAuth()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiOperation({ summary: '添加成员', description: '添加成员' })
  addMember(@Body() memberDto: CreateMemberDto) {
    return this.memberService.addMember(memberDto);
  }

  @Delete()
  @ApiOperation({ summary: '删除成员', description: '删除成员' })
  deleteMember(@Body() memberDto: deleteMemberDto) {
    return this.memberService.deleteMember(memberDto);
  }

  @Patch()
  @ApiOperation({ summary: '修改成员', description: '修改成员权限' })
  modifyMember(@Body() memberDto: UploadMemberDto) {
    return this.memberService.modifyMember(memberDto);
  }
}

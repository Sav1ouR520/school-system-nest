import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiBody,
  ApiConsumes,
} from '@nestjs/swagger';
import { GroupService } from './group.service';
import { GetUser, UUIDvalidatePipe } from 'src/common';
import {
  CreateGroupDto,
  CreateGroupWithIconDto,
  UpdateGroupDto,
  UpdateGroupWithFileDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('group')
@ApiTags('GroupController')
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get('owner')
  @ApiOperation({ summary: '查找组', description: '查找自己管理的组' })
  findGroupByOwner(@GetUser('id') owner: string) {
    return this.groupService.findGroupByOwner(owner);
  }

  @Get('id/:id')
  @ApiOperation({ summary: '查找组', description: '通过id查找组' })
  findGroupByGroupId(
    @Param('id', UUIDvalidatePipe) id: string,
    @GetUser('id') userId: string,
  ) {
    return this.groupService.findGroupByGroupId(id, userId);
  }

  @Get('refreshCode/:groupId')
  @ApiOperation({ summary: '获取组邀请码', description: '获取组邀请码' })
  updateInviteCode(
    @Param('groupId', UUIDvalidatePipe) groupId: string,
    @GetUser('id') userId: string,
  ) {
    return this.groupService.updateInviteCode(groupId, userId);
  }

  @Get('getCode/:groupId')
  @ApiOperation({ summary: '获取组邀请码', description: '获取组邀请码' })
  getGroupInviteCode(
    @Param('groupId', UUIDvalidatePipe) groupId: string,
    @GetUser('id') userId: string,
  ) {
    return this.groupService.getGroupInviteCode(groupId, userId);
  }

  @Get('user')
  @ApiOperation({ summary: '查找组', description: '查找组' })
  findGroupByUserId(@GetUser('id') id: string) {
    return this.groupService.findGroupByUserId(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '创建组', description: '创建组' })
  @ApiBody({ type: CreateGroupWithIconDto })
  createGroup(
    @GetUser('id') owner: string,
    @Body() groupDto: CreateGroupDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    if (icon) {
      return this.groupService.createGroup(owner, groupDto, icon.filename);
    }
    return this.groupService.createGroup(owner, groupDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除组', description: '删除组' })
  deleteGroup(
    @Param('id', UUIDvalidatePipe) id: string,
    @GetUser('id') owner: string,
  ) {
    return this.groupService.deleteGroup(id, owner);
  }

  @Patch()
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '修改组', description: '修改组' })
  @ApiBody({ type: UpdateGroupWithFileDto })
  modifyGroup(
    @GetUser('id') owner: string,
    @Body() groupDto: UpdateGroupDto,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    if (icon) {
      return this.groupService.modifyGroup(groupDto, owner, icon.filename);
    }
    return this.groupService.modifyGroup(groupDto, owner);
  }
}

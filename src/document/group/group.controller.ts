import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { GetUser, UUIDvalidatePipe } from 'src/common';
import { CreateGroupDto, UpdateGroupDto } from './dto';

@Controller('group')
@ApiTags('GroupController')
@ApiBearerAuth()
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @ApiOperation({ summary: '查找组', description: '查找自己管理的组' })
  findGroupByOwner(@GetUser('id') owner: string) {
    return this.groupService.findGroupByOwner(owner);
  }

  @Post()
  @ApiOperation({ summary: '创建组', description: '创建组' })
  @ApiBody({ type: CreateGroupDto })
  createGroup(@GetUser('id') owner: string, @Body() groupDto: CreateGroupDto) {
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
  @ApiOperation({ summary: '修改组', description: '修改组' })
  @ApiBody({ type: CreateGroupDto })
  changeGroup(@GetUser('id') owner: string, @Body() groupDto: UpdateGroupDto) {
    return this.groupService.changeGroup(groupDto, owner);
  }
}

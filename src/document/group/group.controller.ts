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
import { CreateGroupDto, CreateGroupWithIconDto, UpdateGroupDto } from './dto';
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
  @ApiOperation({ summary: '修改组', description: '修改组' })
  @ApiBody({ type: UpdateGroupDto })
  changeGroup(@GetUser('id') owner: string, @Body() groupDto: UpdateGroupDto) {
    return this.groupService.changeGroup(groupDto, owner);
  }
}

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { PaginationDto, UUIDvalidatePipe } from 'src/common';
import { SelectUserDto, UpdateUserDto, UpdateUserIconDto } from './dto';
import { UserRole } from './enum/userRole';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './roles/roles.decorator';
import { UserConfig } from './config/user.config';

@Controller('user')
@Roles(UserRole.ADMIN)
@UseGuards(RoleGuard)
@ApiTags('AdminController')
@ApiBearerAuth()
export class AdminController {
  constructor(
    private readonly userService: UserService,
    @Inject(UserConfig.KEY)
    private readonly userConfig: ConfigType<typeof UserConfig>,
  ) {}

  @Get('find')
  @ApiOperation({ summary: '查询所有用户', description: '查询所有用户' })
  findAll(
    @Query() paginationQuery: PaginationDto,
    @Query() userDto: SelectUserDto,
  ) {
    return this.userService.findAll(paginationQuery, userDto);
  }

  @Patch('upload/info/:uuid')
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据uuid更新用户信息',
  })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  updateUserInfo(
    @Param('uuid', UUIDvalidatePipe) uuid: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfo(uuid, userDto);
  }

  @Post('upload/icon')
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传用户头像', description: '上传用户头像' })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  @ApiBody({ type: UpdateUserIconDto })
  uploadUserImage(
    @UploadedFile() icon: Express.Multer.File,
    @Param('uuid', UUIDvalidatePipe) uuid: string,
  ) {
    if (icon) {
      const path = this.userConfig.userIconPath + icon.filename;
      return this.userService.updateUserIcon(uuid, path);
    }
    throw new BadRequestException(`This file type is not an image`);
  }

  @Delete('delete/:uuid')
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: '删除用户', description: '根据uuid删除用户' })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  delete(@Param('uuid', UUIDvalidatePipe) uuid: string) {
    return this.userService.delete(uuid);
  }
}

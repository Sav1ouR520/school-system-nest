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
import { UserRole } from './enum';
import { RoleGuard } from './guards';
import { Roles } from './roles';
import { UserConfig } from './config';
import { SelectUserDto, UpdateUserDto, UpdateUserIconDto } from './dto';

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

  @Patch('upload/info/:id')
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据id更新用户信息',
  })
  @ApiParam({ name: 'id', description: 'id', required: true })
  updateUserInfo(
    @Param('id', UUIDvalidatePipe) id: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfo(id, userDto);
  }

  @Post('upload/icon')
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: '上传用户头像', description: '上传用户头像' })
  @ApiParam({ name: 'id', description: 'id', required: true })
  @ApiBody({ type: UpdateUserIconDto })
  uploadUserImage(
    @UploadedFile() icon: Express.Multer.File,
    @Param('id', UUIDvalidatePipe) id: string,
  ) {
    if (icon) {
      const path = this.userConfig.userIconPath + icon.filename;
      return this.userService.updateUserIcon(id, path);
    }
    throw new BadRequestException(`This file type is not an image`);
  }

  @Delete('delete/:id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: '删除用户', description: '根据id删除用户' })
  @ApiParam({ name: 'id', description: 'id', required: true })
  delete(@Param('id', UUIDvalidatePipe) id: string) {
    return this.userService.deleteUser(id);
  }
}

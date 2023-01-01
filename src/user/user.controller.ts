import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser, PaginationDto, Public, UUIDvalidatePipe } from 'src/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Inject, UploadedFile, UseGuards } from '@nestjs/common/decorators';
import { UpdateUserIconDto, SelectUserDto } from './dto';
import { ConfigType } from '@nestjs/config';
import { UserConfig } from './config/user.config';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { Roles } from './roles/roles.decorator';
import { UserRole } from './enum/userRole';
import { RoleGuard } from './guards/role.guard';

@Controller('user')
@ApiTags('UserService')
@ApiBearerAuth()
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(UserConfig.KEY)
    private readonly userConfig: ConfigType<typeof UserConfig>,
  ) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: '创建用户', description: '创建用户' })
  register(@Body() userDto: CreateUserDto) {
    return this.userService.register(userDto);
  }

  @Get('find/')
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: '查询所有用户', description: '查询所有用户' })
  findAll(
    @Query() paginationQuery: PaginationDto,
    @Query() userDto: SelectUserDto,
  ) {
    return this.userService.findAll(paginationQuery, userDto);
  }

  @Get('find/:account')
  @ApiOperation({ summary: '查询指定用户', description: '用uuid查询指定用户' })
  @ApiParam({ name: 'account', description: 'account', required: true })
  findByAccount(@Param('account', UUIDvalidatePipe) account: string) {
    return this.userService.findByAccount(account);
  }

  @Patch('upload/info/:uuid')
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
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
  @ApiBody({ type: UpdateUserIconDto })
  uploadUserImage(
    @UploadedFile() icon: Express.Multer.File,
    @GetUser('uuid') uuid: string,
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

  @Delete('remove')
  @ApiOperation({ summary: '修改用户状态', description: '修改用户状态为false' })
  disableActive(@GetUser('uuid') uuid: string) {
    return this.userService.disableActive(uuid);
  }
}

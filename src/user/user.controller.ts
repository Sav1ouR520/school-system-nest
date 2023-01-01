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
import { Inject, UploadedFile } from '@nestjs/common/decorators';
import { UpdateUserIconDto } from './dto';
import { ConfigType } from '@nestjs/config';
import { UserConfig } from './config/user.config';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

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
  @ApiOperation({ summary: '查询所有用户', description: '查询所有用户' })
  findAll(@Query() paginationQuery: PaginationDto) {
    return this.userService.findAll(paginationQuery);
  }

  @Get('find/:uuid')
  @ApiOperation({ summary: '查询指定用户', description: '用uuuid查询指定用户' })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  findByUid(@Param('uuid', UUIDvalidatePipe) uuid: string) {
    return this.userService.findByUid(uuid);
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

  @Delete('remove/:uuid')
  @ApiOperation({ summary: '删除用户', description: '根据uuid删除用户' })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  remove(@Param('uuid', UUIDvalidatePipe) uuid: string) {
    return this.userService.remove(uuid);
  }
}

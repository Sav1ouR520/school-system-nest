import {
  Controller,
  Post,
  Body,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Inject,
  Param,
  Patch,
  UploadedFile,
} from '@nestjs/common/decorators';
import { ConfigType } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUser, Public } from 'src/common';
import { UpdateUserDto, UpdateUserIconDto } from './dto';
import { UserConfig } from './config/user.config';

@Controller('user')
@ApiTags('UserController')
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
  @Public()
  @Get('register/:account')
  @ApiOperation({ summary: '用户名检查', description: '检查用户名可用' })
  @ApiParam({ name: 'account', description: '账号', required: true })
  accountAvailable(@Param('account') account: string) {
    return this.userService.accountAvailable(account);
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

  @Patch('upload/info')
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据uuid更新用户信息',
  })
  updateUserInfo(
    @GetUser('uuid') uuid: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfo(uuid, userDto);
  }

  @Delete('remove/info')
  @ApiOperation({ summary: '修改用户状态', description: '修改用户状态为false' })
  disableActive(@GetUser('uuid') uuid: string) {
    return this.userService.disableActive(uuid);
  }
}

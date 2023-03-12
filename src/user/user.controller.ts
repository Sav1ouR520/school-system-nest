import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  Get,
  Param,
  Patch,
  Session,
  UploadedFile,
} from '@nestjs/common/decorators';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UserService } from './user.service';
import { Decrypt, GetUser, Public, captchaValidate } from 'src/common';
import {
  CreateUserDto,
  UpdateUserPasswordDto,
  UpdateUserIconDto,
  UpdateUserUsernameDto,
} from './dto';

@Controller('user')
@ApiTags('UserController')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  getUserInfo(@GetUser('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Public()
  @Post()
  @ApiOperation({ summary: '创建用户', description: '创建用户' })
  @ApiBody({ type: CreateUserDto })
  register(@Session() session, @Body() userDto: CreateUserDto) {
    if (session.emailcode && session.key && session.iv) {
      // if (session.code) {
      const result = captchaValidate(session.emailcode, userDto.captcha);
      if (!result.data.validation || session.email !== userDto.account) {
        result.data.validation = false;
        return result;
      }
      const password = Decrypt(userDto.password, session.key, session.iv);
      return this.userService.register({ ...userDto, password });
      // return this.userService.register(userDto);
    }
    throw new BadRequestException('Error Session');
  }

  @Public()
  @Get('account/:account')
  @ApiOperation({ summary: '邮箱检查', description: '检查邮箱可用' })
  @ApiParam({ name: 'account', description: '邮箱', required: true })
  accountAvailable(@Param('account') account: string) {
    return this.userService.accountAvailable(account);
  }

  @Patch('icon')
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '更新用户信息头像',
    description: '根据id更新用户头像',
  })
  @ApiBody({ type: UpdateUserIconDto })
  updateUserIcno(
    @UploadedFile() icon: Express.Multer.File,
    @GetUser('id') id: string,
  ) {
    if (icon) {
      return this.userService.updateUserIcon(id, icon.filename);
    }
    throw new BadRequestException(`You don't have upload icon`);
  }

  @Patch('username')
  @ApiOperation({
    summary: '更新用户名称信息',
    description: '根据id更新用户名称信息',
  })
  @ApiBody({ type: UpdateUserUsernameDto })
  updateUserUsername(
    @GetUser('id') id: string,
    @Body() userDto: UpdateUserUsernameDto,
  ) {
    return this.userService.updateUserUsername(id, userDto);
  }

  @Patch('password')
  @ApiOperation({
    summary: '更新用户密码信息',
    description: '根据id更新用户密码信息',
  })
  @ApiBody({ type: UpdateUserPasswordDto })
  updateUserPassword(
    @Session() session,
    @GetUser('id') id: string,
    @Body() userDto: UpdateUserPasswordDto,
  ) {
    if (session.code) {
      const result = captchaValidate(session.code, userDto.captcha);
      if (!result.data.validation) {
        return result;
      }
      const oldPassword = Decrypt(userDto.oldPassword, session.key, session.iv);
      const newPassword = Decrypt(userDto.newPassword, session.key, session.iv);
      return this.userService.updateUserPassword(id, oldPassword, newPassword);
    }
  }
}

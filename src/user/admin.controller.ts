import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { UserService } from './user.service';
import { GetUser, PaginationDto, UUIDvalidatePipe } from 'src/common';
import { UserRole } from './enum';
import { RoleGuard } from './guards';
import { Roles } from './roles';
import {
  SelectUserDto,
  AdminUpdateUserDto,
  UpdateUserWithIconDto,
} from './dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@Roles(UserRole.ADMIN)
@UseGuards(RoleGuard)
@ApiTags('AdminUserController')
@ApiBearerAuth()
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  @ApiOperation({ summary: '查询所有用户', description: '查询所有用户' })
  findAll(
    @Query() paginationQuery: PaginationDto,
    @Query() userDto: SelectUserDto,
  ) {
    return this.userService.findAll(paginationQuery, userDto);
  }

  @Get('userId/:id')
  @ApiOperation({ summary: '获取用户信息', description: '获取用户信息' })
  getUserInfo(@Param('id', UUIDvalidatePipe) id: string) {
    return this.userService.findUserById(id);
  }

  @Patch(':userId')
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据id更新用户信息',
  })
  @UseInterceptors(FileInterceptor('icon'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UpdateUserWithIconDto })
  updateUserInfo(
    @Param('userId', UUIDvalidatePipe) userId: string,
    @Body() userDto: AdminUpdateUserDto,
    @UploadedFile() icon: Express.Multer.File,
    @GetUser('id') adminId: string,
  ) {
    if (icon) {
      return this.userService.adminUpdateUserInfo(
        adminId,
        userId,
        userDto,
        icon.filename,
      );
    }
    return this.userService.adminUpdateUserInfo(adminId, userId, userDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({ summary: '删除用户', description: '根据id删除用户' })
  @ApiParam({ name: 'id', description: 'id', required: true })
  delete(@Param('id', UUIDvalidatePipe) id: string) {
    return this.userService.deleteUser(id);
  }
}

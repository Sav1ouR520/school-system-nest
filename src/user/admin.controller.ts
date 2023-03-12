import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ConfigType } from '@nestjs/config';
import { UserService } from './user.service';
import { PaginationDto, UUIDvalidatePipe } from 'src/common';
import { UserRole } from './enum';
import { RoleGuard } from './guards';
import { Roles } from './roles';
import { UserConfig } from './config';
import { SelectUserDto, UpdateUserDto } from './dto';

@Controller('user')
@Roles(UserRole.ADMIN)
@UseGuards(RoleGuard)
@ApiTags('AdminUserController')
@ApiBearerAuth()
export class AdminController {
  constructor(
    private readonly userService: UserService,
    @Inject(UserConfig.KEY)
    private readonly userConfig: ConfigType<typeof UserConfig>,
  ) {}

  @Get('all')
  @ApiOperation({ summary: '查询所有用户', description: '查询所有用户' })
  findAll(
    @Query() paginationQuery: PaginationDto,
    @Query() userDto: SelectUserDto,
  ) {
    return this.userService.findAll(paginationQuery, userDto);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据id更新用户信息',
  })
  @ApiParam({ name: 'id', description: 'id', required: true })
  @ApiBody({ type: UpdateUserDto })
  updateUserInfo(
    @Param('id', UUIDvalidatePipe) id: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.updateUserInfo(id, userDto);
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

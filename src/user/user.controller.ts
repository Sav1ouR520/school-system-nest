import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto, UUIDvalidatePipe } from 'src/common';

@Controller('user')
@ApiTags('UserService')
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: '创建用户', description: '创建用户' })
  register(@Body() userDto: CreateUserDto) {
    return this.userService.register(userDto);
  }

  @Get()
  @ApiOperation({ summary: '查询所有用户', description: '查询所有用户' })
  @ApiQuery({ name: 'limit', description: '数量', required: false })
  @ApiQuery({ name: 'offset', description: '页数', required: false })
  findAll(@Query() paginationQuery: PaginationDto) {
    return this.userService.findAll(paginationQuery);
  }

  @Get(':uuid')
  @ApiOperation({ summary: '查询指定用户', description: '用uuuid查询指定用户' })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  findByUid(@Param('uuid', UUIDvalidatePipe) uuid: string) {
    return this.userService.findByUid(uuid);
  }

  @Patch(':uuid')
  @ApiOperation({
    summary: '更新用户信息',
    description: '根据uuid更新用户信息',
  })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  update(
    @Param('uuid', UUIDvalidatePipe) uuid: string,
    @Body() userDto: UpdateUserDto,
  ) {
    return this.userService.update(uuid, userDto);
  }

  @Delete(':uuid')
  @ApiOperation({ summary: '删除用户', description: '根据uuid删除用户' })
  @ApiParam({ name: 'uuid', description: 'uuid', required: true })
  remove(@Param('uuid', UUIDvalidatePipe) uuid: string) {
    return this.userService.remove(uuid);
  }
}

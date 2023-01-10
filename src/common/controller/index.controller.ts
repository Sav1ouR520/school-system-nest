import { Controller, Get, Session, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../decorators';
import { Response } from 'express';
import { keyIv } from '../uitls';

@Public()
@Controller('index')
@ApiTags('IndexController')
export class IndexController {
  @Get()
  getCryptokeyAndIv(@Res() res: Response, @Session() session) {
    const { key, iv } = keyIv;
    res.cookie('server.key', key);
    res.cookie('server.iv', iv);
    session.key = key;
    session.iv = iv;
    res.send('ok');
  }
}

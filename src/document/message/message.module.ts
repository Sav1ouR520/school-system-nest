import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { RepositoryModule } from 'src/common';

@Module({
  imports: [RepositoryModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}

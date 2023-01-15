import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { RepositoryModule } from 'src/common';

@Module({
  imports: [RepositoryModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}

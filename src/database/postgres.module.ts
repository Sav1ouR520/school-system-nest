import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config';
import { DatabaseProvider } from './providers';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] })],
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class PostgresModule {}

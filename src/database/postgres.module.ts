import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { DatabaseProvider } from './providers/database.provider';

@Global()
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [dbConfig] })],
  providers: [DatabaseProvider],
  exports: [DatabaseProvider],
})
export class PostgresModule {}

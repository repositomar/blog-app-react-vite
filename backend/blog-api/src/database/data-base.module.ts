import { Module } from '@nestjs/common';
import { DataBaseProvider } from './providers/database.provider';

@Module({
  imports: [DataBaseProvider],
  exports: [DataBaseProvider],
})
export class DataBaseModule {}

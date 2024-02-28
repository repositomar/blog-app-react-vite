import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entry } from './entities/entry.entity';
import { EntryController } from './controllers/entry.controller';
import { EntryService } from './services/entry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])],
  controllers: [EntryController],
  providers: [EntryService],
})
export class EntryModule {}

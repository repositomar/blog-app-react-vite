import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Entry } from '../entities/entry.entity';
import { EntryService } from '../services/entry.service';
import { CreateEntryDto } from '../dtos/create-entry.dto';
import { GeneralResponse, GeneralResponsePaginated } from '../helpers/dtos';

@Controller()
export class EntryController {
  constructor(private readonly entryService: EntryService) {}

  @Post('entries')
  @ApiResponse({
    status: 201,
    description: 'Create a entry',
  })
  @ApiBody({ type: CreateEntryDto, required: true })
  createEntry(@Body() body: CreateEntryDto): Promise<GeneralResponse<Entry>> {
    return this.entryService.createEntry(body);
  }

  @Get('entries')
  @ApiResponse({
    status: 200,
    description: 'Get all entries',
    isArray: true,
  })
  getEntries(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('search') search?: string,
  ): Promise<GeneralResponsePaginated<Entry[]>> {
    return this.entryService.getEntries(page, limit, search);
  }

  @Get(':entryId')
  @ApiResponse({
    status: 200,
    description: 'Get entry',
  })
  @ApiParam({ name: 'entryId', description: 'EntryId', required: true })
  getEntry(@Param('entryId') entryId: string): Promise<GeneralResponse<Entry>> {
    return this.entryService.getEntry(entryId);
  }

  @Delete(':entryId')
  @ApiResponse({
    status: 200,
    description: 'Delete entry',
  })
  @ApiParam({ name: 'entryId', description: 'EntryId', required: true })
  deleteEntry(@Param('entryId') entryId: string): Promise<any> {
    return this.entryService.deleteEntry(entryId);
  }
}

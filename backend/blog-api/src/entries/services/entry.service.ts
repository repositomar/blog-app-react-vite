import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entry } from '../entities/entry.entity';
import { CreateEntryDto } from '../dtos/create-entry.dto';
import { Like, Repository } from 'typeorm';
import { GeneralResponse, GeneralResponsePaginated } from '../helpers/dtos';

@Injectable()
export class EntryService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  async createEntry(
    createEntryData: CreateEntryDto,
  ): Promise<GeneralResponse<Entry>> {
    try {
      const payload = {
        ...createEntryData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const entry = this.entryRepository.create(payload);
      await this.entryRepository.save(entry);

      return {
        code: 201,
        messsage: 'success',
        data: entry,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEntries(
    page: number,
    limit: number,
    search?: string,
  ): Promise<GeneralResponsePaginated<Entry[]>> {
    try {
      let query: any = {
        take: limit,
        skip: page * limit,
      };

      if (search) {
        query = {
          where: [
            { title: Like(`%${search}%`) },
            { content: Like(`%${search}%`) },
            { author: Like(`%${search}%`) },
          ],
          ...query,
        };
      }

      const [result, total] = await this.entryRepository.findAndCount(query);

      result.map((item) => (item.content = item.content.slice(0, 70)));

      return {
        code: 200,
        messsage: 'success',
        page,
        totalRecords: total,
        data: result,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getEntry(entryId: string): Promise<GeneralResponse<Entry>> {
    try {
      const entry = await this.entryRepository.findOneBy({
        id: entryId,
      });

      if (!entry) {
        throw new NotFoundException(`Entry with id: ${entryId} not found`);
      }

      return {
        code: 200,
        messsage: 'success',
        data: entry,
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        error.status,
      );
    }
  }

  async deleteEntry(entryId: string): Promise<any> {
    try {
      const entry = await this.entryRepository.findOneBy({
        id: entryId,
      });

      if (!entry) {
        throw new NotFoundException(`Entry with id: ${entryId} not found`);
      }

      await this.entryRepository.softDelete(entryId);

      return {
        code: 200,
        messsage: 'success',
      };
    } catch (error) {
      Logger.log(error);
      throw new HttpException(
        {
          status: error.status,
          error: error.message,
        },
        error.status,
      );
    }
  }
}

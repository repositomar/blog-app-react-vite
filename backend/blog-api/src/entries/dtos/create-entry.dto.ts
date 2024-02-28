import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEntryDto {
  @ApiProperty({ type: String })
  @IsString()
  title: string;
  @ApiProperty({ type: String })
  @IsString()
  author: string;
  @ApiProperty({ type: String })
  @IsString()
  //@IsNotEmpty({ message: 'The field rating cannot be empty' })
  content: string;
}

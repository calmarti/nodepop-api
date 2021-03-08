import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  ArrayNotEmpty,
} from 'class-validator';
import { Tags } from '../enums/tags.enum';

export class CreateAdvertDto {
  @ApiProperty()
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Boolean })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  sale: boolean;

  @ApiProperty({ type: Number })
  @Transform(({ value }) => Number(value))
  @IsNumber()
  price: number;

  @ApiProperty({ type: String, enum: Tags, isArray: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  @ArrayNotEmpty()
  tags: string[];

  @ApiPropertyOptional({ type: String, format: 'binary' })
  photo: any;
}

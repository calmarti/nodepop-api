import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Tags } from '../enums/tags.enum';

export class FilterAdvertDto {
  @ApiPropertyOptional()
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ type: Boolean })
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  sale?: boolean;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @Transform(({ value }) => {
    const pricesArray = Array.isArray(value) ? value : [value];
    return pricesArray.map(Number);
  })
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsOptional()
  price?: number[];

  @ApiPropertyOptional({ type: String, enum: Tags, isArray: true })
  @Transform(({ value }) =>
    [...new Set(typeof value === 'string' ? [value] : value)]
      .filter((v: any) => v)
      .sort(),
  )
  @ArrayNotEmpty()
  @IsOptional()
  tags?: string[];
}

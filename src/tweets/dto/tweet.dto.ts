import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class TweetDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  content: string;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ResponseOrNotFoundInterceptor } from '../utils/response-or-not-found.interceptor';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { FilterAdvertDto } from './dto/filter-advert.dto';

@ApiTags('adverts')
@Controller('v1/adverts')
export class AdvertsController {
  constructor(private readonly advertsService: AdvertsService) {}

  @Get('tags')
  getTags() {
    return this.advertsService.getTags();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('photo', { dest: 'uploads' }))
  @ApiConsumes('multipart/form-data')
  @Post()
  create(
    @Body() createAdvertDto: CreateAdvertDto,
    @UploadedFile() photo: Express.Multer.File,
    @Req() req: Express.Request,
  ) {
    console.log('controller', createAdvertDto);
    return this.advertsService.create({
      ...createAdvertDto,
      photo: photo ? `/public/${photo.filename}` : null,
      user: req.user,
    });
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(@Query() query: FilterAdvertDto) {
    return this.advertsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ResponseOrNotFoundInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advertsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(ResponseOrNotFoundInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advertsService.remove(id);
  }
}

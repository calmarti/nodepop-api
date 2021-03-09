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
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { ResponseOrNotFoundInterceptor } from '../utils/response-or-not-found.interceptor';
import { AdvertsService } from './adverts.service';
import { CreateAdvertDto } from './dto/create-advert.dto';
import { FilterAdvertDto } from './dto/filter-advert.dto';
import { diskStorage } from 'multer';
import * as path from 'path';

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.UPLOADS_FOLDER);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

@ApiTags('adverts')
@Controller('v1/adverts')
export class AdvertsController {
  constructor(
    private readonly advertsService: AdvertsService,
    private readonly configService: ConfigService,
  ) {}

  @Get('tags')
  getTags() {
    return this.advertsService.getTags();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('photo', { storage }))
  @ApiConsumes('multipart/form-data')
  @Post()
  create(
    @Body() createAdvertDto: CreateAdvertDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Express.Request,
  ) {
    let photo = null;
    if (file) {
      const publicFolder = this.configService.get<string>('PUBLIC_FOLDER');
      photo = `/${publicFolder}/${file.filename}`;
    }
    return this.advertsService.create({
      ...createAdvertDto,
      photo,
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

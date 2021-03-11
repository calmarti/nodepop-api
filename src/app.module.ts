import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdvertsModule } from './adverts/adverts.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    AdvertsModule,
    ServeStaticModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => [
        {
          rootPath: join(
            __dirname,
            '..',
            configService.get<string>('UPLOADS_FOLDER'),
          ),
          serveRoot: `/${configService.get<string>('PUBLIC_FOLDER')}`,
        },
      ],
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdvertsModule } from './adverts/adverts.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    AdvertsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', process.env.UPLOADS_FOLDER),
      serveRoot: `/${process.env.PUBLIC_FOLDER}`,
    }),
  ],
})
export class AppModule {}

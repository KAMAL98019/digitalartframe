import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminuserModule } from './adminuser/adminuser.module';
import { Adminuser } from './adminuser/adminuser.entity';
import { AuthModule } from './adminuser/auth.module';
import { Categories } from './categories/category.entity';
import { CategoriesModule } from './categories/categories.module';
import { FramesModule } from './frames/frames.module';
import { Frames } from './frames/frames.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        //         host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        // username: configService.get<string>('DB_USERNAME'),
        // password: configService.get<string>('DB_PASSWORD'),
        // database: configService.get<string>('DB_NAME'),
        url: configService.get<string>('DATABASE_URL'),
        entities: [Adminuser, Categories, Frames],
        synchronize: true,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
      }),
    }),
    AdminuserModule,
    AuthModule,
    CategoriesModule,
    FramesModule,
  ],
})
export class AppModule {}

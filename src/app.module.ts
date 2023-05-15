import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config/dist';
import emailConfig from './config/emailConfig';
import { validationSchema } from './config/validationSchema';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      // envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      envFilePath: [
        path.join(__dirname, 'config', 'env', `.${process.env.NODE_ENV}.env`),
      ],
      load: [emailConfig],
      isGlobal: true,
      validationSchema,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'test',
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      entities: [ path.join(__dirname,'**','*.entity{.ts,.js}') ],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

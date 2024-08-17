import { seeder } from 'nestjs-seeder';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Category } from '../entities/category.entity';
import { Difficulty } from '../entities/difficulty.entity';
import { Question } from '../entities/question.entity';
import { CategoryQuestionSeeder } from './category-question.seeder';

seeder({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Category, Difficulty, Question],
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Category, Difficulty, Question]),
  ],
}).run([CategoryQuestionSeeder]);

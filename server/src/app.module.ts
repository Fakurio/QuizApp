import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Difficulty } from './entities/difficulty.entity';
import { Question } from './entities/question.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CategoriesModule } from './categories/categories.module';
import { GamesModule } from './games/games.module';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';
import { Game } from './entities/game.entity';
import { PlayerAnswers } from './entities/player-answers.entity';
import { HighlightsModule } from './highlights/highlights.module';

@Module({
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
        entities: [Category, Difficulty, Question, User, Game, PlayerAnswers],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
      },
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/schema-graphql.ts'),
        outputAs: 'class',
      },
      formatError: (error) => {
        const originalError = error.extensions.originalError as Error;
        if (originalError) {
          return {
            message: originalError.message,
          };
        }
        return {
          message: error.message,
        };
      },
    }),
    CategoriesModule,
    GamesModule,
    AuthModule,
    UsersModule,
    HighlightsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

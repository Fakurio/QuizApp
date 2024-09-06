import { IsEnum } from 'class-validator';
import { DifficultyEnum } from 'src/entities/difficulty.entity';
import { SeekGameInput } from 'src/schema-graphql';

export class SeekGameDTO extends SeekGameInput {
  @IsEnum(DifficultyEnum)
  difficultyName: string;
}

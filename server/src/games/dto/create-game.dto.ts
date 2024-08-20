import { IsEnum } from 'class-validator';
import { DifficultyEnum } from 'src/entities/difficulty.entity';
import { GameInput } from 'src/schema-graphql';
export class CreateGameDTO extends GameInput {
  @IsEnum(DifficultyEnum)
  difficultyName: string;
}

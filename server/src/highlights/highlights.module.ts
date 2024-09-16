import { Module } from '@nestjs/common';
import { HighlightsService } from './highlights.service';
import { HighlightsResolver } from './highlights.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/entities/game.entity';

@Module({
  providers: [HighlightsResolver, HighlightsService],
  imports: [TypeOrmModule.forFeature([Game])],
})
export class HighlightsModule {}

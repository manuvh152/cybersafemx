import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { Question } from 'src/questions/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question]), QuestionsModule],
  controllers: [AnswersController],
  providers: [AnswersService, Answer],
  exports: [AnswersService, Answer]
})
export class AnswersModule {}

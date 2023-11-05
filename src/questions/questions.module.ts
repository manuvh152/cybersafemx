import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { TopicsModule } from 'src/topics/topics.module';
import { Answer } from 'src/answers/answer.entity';
import { Topic } from 'src/topics/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer, Topic]), TopicsModule],
  controllers: [QuestionsController],
  providers: [QuestionsService, Question],
  exports: [QuestionsService, Question]
})
export class QuestionsModule {}

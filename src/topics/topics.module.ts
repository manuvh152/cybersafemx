import { Module } from '@nestjs/common';
import { TopicsController } from './topics.controller';
import { TopicsService } from './topics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Question } from 'src/questions/question.entity';
import { Answer } from 'src/answers/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Question, Answer])],
  controllers: [TopicsController],
  providers: [TopicsService, Topic],
  exports: [TopicsService, Topic]
})
export class TopicsModule {}

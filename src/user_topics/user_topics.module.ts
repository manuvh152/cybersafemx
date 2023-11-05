import { Module } from '@nestjs/common';
import { UserTopicsService } from './user_topics.service';
import { UserTopicsController } from './user_topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTopic } from './user_topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserTopic])],
  controllers: [UserTopicsController],
  providers: [UserTopicsService, UserTopic],
  exports: [UserTopicsService, UserTopic]
})
export class UserTopicsModule {}

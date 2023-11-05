import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { UserTopicsService } from './user_topics.service';
import { CreateUserTopicDto } from './dto/create-user-topic.dto';

@Controller('user-topics')
export class UserTopicsController {
  constructor(private readonly userTopicsService: UserTopicsService) {}

  @Get(':user_id/:topic_id')
  isUserRegistered(@Param('user_id', ParseIntPipe) user_id: number, @Param('topic_id', ParseIntPipe) topic_id: number){
    return this.userTopicsService.isUserRegisteredToTopic(user_id, topic_id);
  }

  @Post()
  registerUser(@Body() userTopic: CreateUserTopicDto ){
    return this.userTopicsService.registerToTopic(userTopic);
  }
}

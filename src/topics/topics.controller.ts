import { Controller, Post, Get, Delete, Patch, Body, Param, ParseIntPipe } from '@nestjs/common';
import { CreateTopicBulkDto, CreateTopicDto } from './dto/create-topic.dto';
import { TopicsService } from './topics.service';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private topicsService: TopicsService){}

  @Get()
  getTopics(): Promise<any>{
    return this.topicsService.getTopics();
  }

  @Get(':id')
  getTopic(@Param('id', ParseIntPipe) id: number): Promise<any>{
    return this.topicsService.getTopic(id);
  }

  @Get('topicWithQuestions/:id')
  getTopicWithQuestions(@Param('id', ParseIntPipe) id: number){
    return this.topicsService.getTopicWithQuestions(id);
  }

  @Post()
  createUser(@Body() newUser: CreateTopicDto){
    return this.topicsService.createTopic(newUser);
  }

  @Delete(':id')
  deleteTopic(@Param('id', ParseIntPipe) id: number){
    return this.topicsService.deleteTopic(id);
  }

  @Patch(':id')
  updateTopic(@Param('id', ParseIntPipe) id: number, @Body() topic: UpdateTopicDto){
    return this.topicsService.updateTopic(id, topic);
  }

  @Get('getAllTopics/:id')
  getAllTopics(){
    return this.topicsService.getAllTopics();
  }

  @Post('createOnBulk')
  createOnBulk(@Body() topic: CreateTopicBulkDto[]){
    return this.topicsService.createOnBulk(topic);
  }
}
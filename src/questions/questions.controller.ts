import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionBulkDto, CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  createQuestion(@Body() question: CreateQuestionDto){
    return this.questionsService.createQuestion(question);
  }

  @Get(':id')
  getQuestionsByTopicId(@Param('id', ParseIntPipe) id: number){
    return this.questionsService.getQuestionsByTopicId(id);
  }

  @Patch(':id')
  updateQuestion(@Param('id', ParseIntPipe) id: number, @Body() question: UpdateQuestionDto){
    return this.questionsService.updateQuestion(id, question);
  }

  @Delete(':id')
  deleteQuestion(@Param('id', ParseIntPipe) id: number){
    return this.questionsService.deleteQuestion(id);
  }

  @Post('createOnBulk')
  createOnBulk(@Body() questions: CreateQuestionBulkDto[]){
    return this.questionsService.createOnBulk(questions);
  }
}

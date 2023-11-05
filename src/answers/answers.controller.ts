import { Controller, Post, Get, Body } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';

@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  createAnswer(@Body() answer: CreateAnswerDto){
    return this.answersService.createAnswer(answer);
  }
}

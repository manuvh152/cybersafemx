import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './answer.entity';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { QuestionsService } from 'src/questions/questions.service';
import { Question } from 'src/questions/question.entity';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private questionService: QuestionsService
  ){}

  async createAnswer(answer: CreateAnswerDto){
    try {

      const question = await this.questionRepository.findOne({
        where:{
          id: answer.question_id
        }
      });

      if(!question){
        return new HttpException(`No existe pregunta con la id: ${answer.question_id}`, HttpStatus.NOT_FOUND);
      }

      const getAnswers = await this.answerRepository.findAndCount({
        where:{
          question_id:{
            id: answer.question_id
          }
        }
      });

      let hasCorrectAnswer = false;
      let index = 0;
      for (index = 0; index < getAnswers[0].length; ++index){
        let ans = getAnswers[0][index];
        if(ans.is_correct == true){
          hasCorrectAnswer = true;
          break;
        }
      }

      if(hasCorrectAnswer && answer.is_correct){
        return new HttpException('Ya existe una respuesta correcta para esta pregunta', HttpStatus.CONFLICT);
      }

      if(!hasCorrectAnswer && answer.is_correct == false && getAnswers[1] >= 2){
        return new HttpException('Cada pregunta debe tener una respuesta correcta', HttpStatus.CONFLICT);
      }

      if(getAnswers[1] >= 3){
        return new HttpException('Esta pregunta ya tiene 3 respuestas', HttpStatus.CONFLICT);
      }

      const newAnswer = this.answerRepository.create(answer);
      return this.answerRepository.save(newAnswer);

    } catch (error) {
      console.log(error);
      return new HttpException('Error al agregar respuesta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { Repository, DeepPartial } from 'typeorm';
import { CreateQuestionBulkDto, CreateQuestionDto } from './dto/create-question.dto';
import { TopicsService } from 'src/topics/topics.service';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Answer } from 'src/answers/answer.entity';
import { Topic } from 'src/topics/topic.entity';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    private topicService: TopicsService
  ){}

  async createQuestion(question: CreateQuestionDto){
    try {
    
      const newQuestion = this.questionRepository.create(question);
      return this.questionRepository.save(newQuestion);
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al agregar pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getQuestionsByTopicId(id: number){
    try {
      const getTopic = await this.topicService.getTopic(id);

      if(getTopic instanceof HttpException){
        return new HttpException(`No existe tema con la id: ${id}`, HttpStatus.NOT_FOUND);
      }

      let questions = await this.questionRepository.find({
        where:{
          topic_id: {
            id: id
          }
        },
        relations: ['answers']
      });

      if(!questions[0]){
        return new HttpException(`No existen preguntas relacionadas al tema '${getTopic.name}'`, HttpStatus.NOT_FOUND);
      }

      //Randomiza el orden de las preguntas
      questions.sort(() => Math.random() - 0.5);
      //limita las respuestas a 50
      questions = questions.slice(0, 20);
      //Reacmoda por dificultad
      questions.sort((a, b) => a.difficulty.localeCompare(b.difficulty));
  
      return questions;

    } catch (error) {
      console.log(error);
      return new HttpException('Error al obtener preguntas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateQuestion(id: number, question: UpdateQuestionDto){
    try {
      const getQuestion = await this.questionRepository.findOne({
        where:{
          id
        }
      });

      if(!getQuestion){
        return new HttpException(`No existe pregunta con la id: ${id}`, HttpStatus.NOT_FOUND);
      }

      return this.questionRepository.update({id}, question);

    } catch (error) {
      console.log(error);
      return new HttpException('Error al actualizar pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteQuestion(id: number){
    try {
      const question = this.questionRepository.findOne({
        where:{
          id
        }
      });

      if(!question){
        return new HttpException(`No existe un tema con la id ${id}`, HttpStatus.NOT_FOUND);
      }

      return this.questionRepository.delete(id);

    } catch (error) {
      console.log(error);
      return new HttpException('Error al borrar pregunta', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createOnBulk(questions: CreateQuestionBulkDto[]){
    try {

      for (const questionDto of questions) {
        const topicId = questionDto.topic_id;
    
        // Check if the topic exists, if not, handle accordingly
        const topic = await this.topicRepository.findOne({
          where: {
            id: topicId
          }
        });
    
        if (!topic) {
          return new HttpException(`No existe tema con el id ${topicId}`, HttpStatus.NOT_FOUND);
        }
    
        // Create the question and associate it with the specified topic
        const questionToSave: DeepPartial<Question> = {
          question_text: questionDto.question_text,
          difficulty: questionDto.difficulty,
          topic_id: questionDto.topic_id
        };
    
        const createdQuestion = await this.questionRepository.save(questionToSave);
    
        for (const answerDto of questionDto.answers) {

          const answerToSave: DeepPartial<Answer> = {
            answer_text: answerDto.answer_text,
            is_correct: answerDto.is_correct,
            // Ignorar esta harcodeada xd
            question_id: createdQuestion.id as unknown as Question
          }

          await this.answerRepository.save(answerToSave);
        }
      }

      return 'Campos insertados correctamente';
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al crear en bulk', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
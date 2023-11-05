import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from './topic.entity';
import { Question } from 'src/questions/question.entity';
import { Repository, DeepPartial } from 'typeorm';
import { CreateTopicBulkDto, CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { CreateQuestionBulkDto } from 'src/questions/dto/create-question.dto';
import { Answer } from 'src/answers/answer.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>
  ){}

  createTopic(topic: CreateTopicDto){
    try {
      const newTopic = this.topicsRepository.create(topic);
      return this.topicsRepository.save(newTopic);

    } catch (error) {
      console.log(error);
      return new HttpException('Error al crear tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTopics(){
    try {
      const topics = await this.topicsRepository.find();

      if(!topics[0]){
        return new HttpException('No se encontraron temas', HttpStatus.NOT_FOUND);
      }
      return topics;

    } catch (error) {
      console.log(error);
      return new HttpException('Error al obtener temas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getTopic(id: number){
    try {
      const topic = await this.topicsRepository.findOne({
        where: {
          id
        }
      });

      if(!topic){
        return new HttpException(`No existe tema con la id: ${id}`, HttpStatus.NOT_FOUND);
      } 

      return topic;

    } catch (error) {
      console.log(error);
      return new HttpException('Error al obtener tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteTopic(id: number){
    try {

      const getTopic = this.topicsRepository.findOne({
        where:{
          id
        }
      });
  
      if(!getTopic){
        return new HttpException(`Tema con id: ${id} no existe`, HttpStatus.NOT_FOUND);
      }
  
      return this.topicsRepository.delete({id});
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al eliminar tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  updateTopic(id: number, topic: UpdateTopicDto){
    try {
      
      const getTopic = this.topicsRepository.findOne({
        where:{
          id
        }
      });
  
      if(!getTopic){
        return new HttpException(`Tema con id: ${id} no existe`, HttpStatus.NOT_FOUND);
      }
  
      return this.topicsRepository.update({id}, topic); 

    } catch (error) {
      console.log(error);
      return new HttpException('Error al actualizar tema', HttpStatus.INTERNAL_SERVER_ERROR);
    } 
  }

  async getTopicWithQuestions(id: number){
    try {

      const temaYPreguntas = await this.topicsRepository.findOne({
        where:{
          id
        },
        relations: ['questions', 'questions.answers']
      });
      return temaYPreguntas;
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al obtener tema y preguntas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllTopics(){
    try {

      const allTopics = await this.topicsRepository.find({
        relations: ['questions', 'questions.answers']
      });
      return allTopics;
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al obtener todos los temas', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createOnBulk(topics: CreateTopicBulkDto[]){
    try {

      for (const topicDto of topics){
        const topicToSave: DeepPartial<Topic> = {
          name: topicDto.name,
          description: topicDto.description,
          video_url: topicDto.video_url,
          created_by: topicDto.created_by,
          difficulty: topicDto.difficulty
        };

        const createdTopic = await this.topicsRepository.save(topicToSave);

        for (const questionDto of topicDto.questions) {
          // Create the question and associate it with the specified topic
          const questionToSave: DeepPartial<Question> = {
            question_text: questionDto.question_text,
            difficulty: questionDto.difficulty,
            topic_id: createdTopic.id as unknown as Topic
          };
      
          const createdQuestion = await this.questionsRepository.save(questionToSave);
      
          for (const answerDto of questionDto.answers) {
  
            const answerToSave: DeepPartial<Answer> = {
              answer_text: answerDto.answer_text,
              is_correct: answerDto.is_correct,
              // Ignorar esta harcodeada xd
              question_id: createdQuestion.id as unknown as Question
            }
  
            await this.answersRepository.save(answerToSave);
          }
        }

      }

      return 'Campos insertados correctamente';
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al crear en bulk', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

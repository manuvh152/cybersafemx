import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTopic } from './user_topic.entity';
import { Repository } from 'typeorm';
import { CreateUserTopicDto } from './dto/create-user-topic.dto';

@Injectable()
export class UserTopicsService {
  constructor(
    @InjectRepository(UserTopic)
    private userTopicRepository: Repository<UserTopic>
  ){}

  async isUserRegisteredToTopic(user_id: number, topic_id: number){
    try {
      
      const isUserRegistered = await this.userTopicRepository.findOne({
        where: {
          user_id: {
            id: user_id
          },
          topic_id:{
            id: topic_id
          }
        }
      });

      if(!isUserRegistered){
        return false;
      }

      return true;

    } catch (error) {
      console.log(error);
      return new HttpException('Error al registrar usuario a tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async registerToTopic(userTopic: CreateUserTopicDto){
    try {
      
      const isUserRegistered = await this.userTopicRepository.findOne({
        where: {
          user_id: {
            id: userTopic.user_id
          },
          topic_id:{
            id: userTopic.topic_id
          }
        }
      });

      if(isUserRegistered){
        return new HttpException('El usuario ya esta registrado a este tema', HttpStatus.CONFLICT);
      }

      const registerUser = this.userTopicRepository.create(userTopic);

      return this.userTopicRepository.save(registerUser);

    } catch (error) {
      console.log(error);
      return new HttpException('', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async completeTopic(userTopic: CreateUserTopicDto){
    try {
      
      const userRegistered = await this.userTopicRepository.findOne({
        where: {
          user_id: {
            id: userTopic.user_id
          },
          topic_id:{
            id: userTopic.topic_id
          }
        }
      });

      if(!userRegistered){
        return new HttpException('El usuario no esta registrado a este tema', HttpStatus.CONFLICT);
      }

      userRegistered.is_completed = true;
      return this.userTopicRepository.save(userRegistered);

    } catch (error) {
      console.log(error);
      return new HttpException('Error registrar finalizacion de tema', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

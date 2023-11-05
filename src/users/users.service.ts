import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async createUser(user: CreateUserDto){
    try {

      const isUsernameRegistered = await this.userRepository.findOne({
        where:{
          name: user.name
        }
      });

      if(isUsernameRegistered){
        return new HttpException('El nombre de usuario ya esta registrado', HttpStatus.CONFLICT);
      }
      
      const newUser = this.userRepository.create(user);
      return this.userRepository.save(newUser);

    } catch (error) {
      console.log(error);
      return new HttpException('Error al crear usuario', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(user: CreateUserDto){
    try {

      const userExists = await this.userRepository.findOne({
        where:{
          name: user.name,
          password: user.password
        }
      });

      if(!userExists){
        return new HttpException('User is not registered', HttpStatus.NOT_FOUND);
      }

      return userExists;
      
    } catch (error) {
      console.log(error);
      return new HttpException('Error al hacer login', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

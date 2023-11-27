import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Noticias } from './noticia.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNoticiaDto } from './dto/create-noticia.dto';

@Injectable()
export class NoticiasService {
  constructor(
    @InjectRepository(Noticias)
    private noticiasRepository: Repository<Noticias>
  ){}

  async createNoticia(noticia: CreateNoticiaDto){
    try {
      
      const newNoticia = this.noticiasRepository.create(noticia);
      return this.noticiasRepository.save(newNoticia);

    } catch (error) {
      console.log(error);
      return new HttpException('Error al crear noticia', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNoticias(){
    try {

      const noticias = await this.noticiasRepository.find({
        order:{
          created_at: "ASC"
        }
      });

      if(!noticias[0]){
        return new HttpException('No hay noticias pa', HttpStatus.NOT_FOUND);
      }
      
      return noticias;

    } catch (error) {
      console.log(error);
      return new HttpException('Error al conseguir noticias', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getNoticiaById(id: number){
    try {

      const noticia = await this.noticiasRepository.findOneBy({id});

      if(!noticia){
        return new HttpException('Nop', HttpStatus.NOT_FOUND);
      }
      
      return noticia;

    } catch (error) {
      console.log(error);
      return new HttpException('Error al conseguir noticia', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteNoticia(id: number){
    try {
      
      const noticia = await this.noticiasRepository.findOneBy({id});

      if(!noticia){
        return new HttpException('Nop', HttpStatus.NOT_FOUND);
      }

      return this.noticiasRepository.delete(id);

    } catch (error) {
      console.log(error);
      return new HttpException('Error al borrar noticia', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}

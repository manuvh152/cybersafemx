import { Controller, Post, Get, Body, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { CreateNoticiaDto } from './dto/create-noticia.dto';

@Controller('noticias')
export class NoticiasController {
  constructor(private readonly noticiasService: NoticiasService) {}

  @Post()
  createNoticia(@Body() noticia: CreateNoticiaDto){
    return this.noticiasService.createNoticia(noticia);
  }

  @Get()
  getNoticias(){
    return this.noticiasService.getNoticias();
  }

  @Get(':id')
  getNoticia(@Param('id', ParseIntPipe) id: number){
    return this.noticiasService.getNoticiaById(id);
  }

  @Delete(':id')
  deleteNoticia(@Param('id', ParseIntPipe) id: number){
    return this.noticiasService.deleteNoticia(id);
  }

}

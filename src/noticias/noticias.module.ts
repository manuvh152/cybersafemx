import { Module } from '@nestjs/common';
import { NoticiasService } from './noticias.service';
import { NoticiasController } from './noticias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Noticias } from './noticia.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Noticias])],
  controllers: [NoticiasController],
  providers: [NoticiasService],
})
export class NoticiasModule {}

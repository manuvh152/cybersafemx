import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TopicsModule } from './topics/topics.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionsModule } from './questions/questions.module';
import { AnswersModule } from './answers/answers.module';
import { UsersModule } from './users/users.module';
import { UserTopicsModule } from './user_topics/user_topics.module';
import { NoticiasModule } from './noticias/noticias.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const config = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.get<string>('HOST'),
      port: config.get<number>('PORT'),
      username: config.get<string>('USER'),
      password: config.get<string>('PASSWORD'),
      database: config.get<string>('DATABASE'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
      ssl: true
    }),
    //TypeOrmModule.forRoot({
    //  type: 'mysql',
    //  host: 'brwosyozqc5eweksdlla-mysql.services.clever-cloud.com',
    //  port: 3306,
    //  username: 'ujqhicumbywqposu',
    //  password: '46DqLjbaTQQTrRcGOhIm',
    //  database: 'brwosyozqc5eweksdlla',
    //  entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //  synchronize: true
    //}),
    TopicsModule,
    QuestionsModule,
    AnswersModule,
    UsersModule,
    UserTopicsModule,
    NoticiasModule,
    ComplaintsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

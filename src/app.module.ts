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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-cl3fpa2uuipc738cfk5g-a.oregon-postgres.render.com',
      port: 5432,
      username: 'cybersafemx_user',
      password: '1cB37ByqKZKYbse9yo9nmGQFHmDB5lWs',
      database: 'cybersafemx',
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

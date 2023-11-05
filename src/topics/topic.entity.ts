import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Question } from '../questions/question.entity';
import { UserTopic } from 'src/user_topics/user_topic.entity';

export enum Difficulty{
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

@Entity({name: 'topics'})
export class Topic {

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {length: 150})
  name: string

  @Column('text')
  video_url: string

  @Column('text')
  description: string

  @Column('varchar', {length: 150})
  created_by: string

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.Easy
  })
  difficulty: Difficulty

  @OneToMany(() => Question, question => question.topic_id)
  questions: Question[]

  @OneToMany(() => UserTopic, userTopic => userTopic.topic_id)
  userTopic: UserTopic[]
}
import { Answer } from 'src/answers/answer.entity';
import { Topic } from 'src/topics/topic.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

export enum Difficulty{
  Easy = 'Easy',
  Medium = 'Medium',
  Hard = 'Hard'
}

@Entity('questions')
export class Question{

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {length: 150})
  question_text: string

  @Column({
    type: 'enum',
    enum: Difficulty,
    default: Difficulty.Easy
  })
  difficulty: Difficulty

  //Foreign Key
  @ManyToOne(() => Topic, topic => topic.questions, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'topic_id', referencedColumnName: 'id'})
  topic_id: Topic

  @OneToMany(() => Answer, answer => answer.question_id)
  answers: Answer[]

}
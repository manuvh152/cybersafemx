import { Question } from 'src/questions/question.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Entity } from 'typeorm';

@Entity({name: 'answers'})
export class Answer{

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {length: 200})
  answer_text: string

  @Column()
  is_correct: boolean

  //Foreign key
  @ManyToOne(() => Question, question => question.answers, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'question_id', referencedColumnName: 'id'})
  question_id: Question
}
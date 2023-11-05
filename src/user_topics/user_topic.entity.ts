import { Topic } from 'src/topics/topic.entity';
import { User } from 'src/users/user.entity';
import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity({name: 'user_topics'})
@Unique('unique_user_topic', ['user_id', 'topic_id'])
export class UserTopic{

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.userTopic, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'user_id', referencedColumnName: 'id'})
  user_id: User

  @ManyToOne(() => Topic, topic => topic.userTopic, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({name: 'topic_id', referencedColumnName: 'id'})
  topic_id: Topic

  @Column({default: false})
  is_completed: boolean
}
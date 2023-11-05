import { UserTopic } from 'src/user_topics/user_topic.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from 'typeorm';

@Entity({name: 'users'})
export class User{

   @PrimaryGeneratedColumn()
   id: number

   @Column('varchar', {length: 150})
   name: string

   @Column('text')
   password: string

   @OneToMany(() => UserTopic, userTopic => userTopic.user_id)
   userTopic: UserTopic[]
}
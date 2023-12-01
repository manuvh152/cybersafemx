import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('complaints')
export class Complaint{

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {length: 200})
  topic: string

  @Column({type: 'json'})
  steps: string
}
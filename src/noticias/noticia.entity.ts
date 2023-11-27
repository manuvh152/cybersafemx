import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('noticias')
export class Noticias{

  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {length: 200})
  title: string

  @Column('text')
  body: string

  @Column('varchar', {length: 150})
  author: string

  @Column('text')
  url: string

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;
}
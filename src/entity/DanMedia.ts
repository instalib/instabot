import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DanMedia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mediaId: string;

  @Column()
  new: boolean;
}

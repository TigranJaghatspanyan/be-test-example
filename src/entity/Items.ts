import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  creatorEmail: string;

  @Column()
  organizationName: string;

  @Column()
  name: string;

  @Column()
  description: string;

  constructor(
    creatorEmail: string,
    organizationName: string,
    name: string,
    description: string
  ) {
    this.creatorEmail = creatorEmail;
    this.organizationName = organizationName;
    this.name = name;
    this.description = description;
  }
}

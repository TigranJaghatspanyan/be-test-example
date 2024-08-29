import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organization {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  organizationName: string;

  @Column()
  organizationFounder: string;

  @Column()
  creatorEmail: string;

  constructor(
    organizationName: string,
    organizationFounder: string,
    creatorEmail: string
  ) {
    this.organizationName = organizationName;
    this.organizationFounder = organizationFounder;
    this.creatorEmail = creatorEmail;
  }
}

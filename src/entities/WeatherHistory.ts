// src/entities/WeatherHistory.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { City } from './City';

@Entity()
export class WeatherHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => City, (city) => city.weatherHistory, { eager: true })
  city!: City;

  @ManyToOne(() => User, (user) => user.weatherHistory, { eager: true })
  user!: User;

  @Column({ type: 'float', nullable: false })
  temperature!: number;

  @Column({ type: 'float', nullable: false })
  humidity!: number;

  @Column({ type: 'varchar', nullable: false })
  condition!: string;

  @CreateDateColumn()
  fetchedAt!: Date;
}

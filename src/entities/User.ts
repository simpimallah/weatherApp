import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm'
import { WeatherHistory } from './WeatherHistory'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  email!: string

  @Column()
  password!: string

  @Column()
  name!: string

  @CreateDateColumn()
  createdAt!: Date

  @OneToMany(() => WeatherHistory, (history) => history.user)
  weatherHistory!: WeatherHistory[]
}

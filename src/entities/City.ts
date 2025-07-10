import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { WeatherHistory } from './WeatherHistory'

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  name!: string

  @Column({ nullable: true })
  country!: string

  @OneToMany(() => WeatherHistory, (history) => history.city)
  weatherHistory!: WeatherHistory[]
}

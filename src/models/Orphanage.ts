import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { ORPHANAGES_TABLE_NAME } from '../database/migrations/1602723138187-create_orphanages';

@Entity(ORPHANAGES_TABLE_NAME)
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  opening_hours: string;

  @Column()
  instructions: string;

  @Column()
  open_on_weekends: boolean;
}

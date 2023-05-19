import { User } from 'src/users/shared/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  inventoryStatus: string;

  @Column()
  infoTheme: string;

  @Column()
  infoDate: string;

  @Column()
  food: boolean;

  @Column()
  drinks: boolean;

  @Column()
  parking: boolean;

  @Column()
  location: string;

  @ManyToMany(() => User, (user) => user.events)
  @JoinTable({
    name: 'user_events',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'event_id', referencedColumnName: 'id' },
  })
  users: User[];
}

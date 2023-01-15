import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}

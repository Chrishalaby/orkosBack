import * as bcrypt from 'bcrypt';
import { Event } from 'src/events/entities/event.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @ApiProperty()
  @Column()
  name: string;

  // @ApiProperty()
  @Column()
  lastName: string;

  // @ApiProperty()
  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  isEventOrganizer: boolean;

  @Column({ nullable: true })
  public salt: string;

  @ManyToMany(() => Event, (event) => event.users)
  events: Event[];

  public async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}

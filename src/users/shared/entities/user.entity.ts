import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

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


  @Column({nullable: true})
  public salt: string;

  public async validatePassword(password: string): Promise<boolean> {
    const hash: string = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}

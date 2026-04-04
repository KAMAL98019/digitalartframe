import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Adminuser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  phonenumber: string;

  @Column()
  password: string;
}

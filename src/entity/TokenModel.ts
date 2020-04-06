import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  Index,
  BaseEntity,
} from 'typeorm';
import User from './UserModel';

@Entity()
export default class TokenModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Index()
  token?: string;

  @OneToOne(type => User)
  @JoinColumn()
  user?: User;
}

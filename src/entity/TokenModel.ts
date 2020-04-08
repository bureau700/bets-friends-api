import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  Index,
  BaseEntity,
} from 'typeorm';
import UserModel from './UserModel';

@Entity('Token')
export default class TokenModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Index()
  token?: string;

  @OneToOne(type => UserModel)
  @JoinColumn()
  user?: UserModel;
}

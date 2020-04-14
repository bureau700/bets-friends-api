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

  @Column({ nullable: false })
  @Index()
  token?: string;

  @OneToOne(() => UserModel, { nullable: false })
  @JoinColumn()
  user?: UserModel;

  static async findByUserId(user: UserModel) {
    const results = await this.find({ where: { user } });
    if (results.length) return results[0];
    return null;
  }
}

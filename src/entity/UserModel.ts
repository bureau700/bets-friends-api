import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { encodePassword } from '../services/user-service/password';

@Entity('User')
export default class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  @Index()
  username?: string;

  @Column()
  password?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  setPassword(password: string) {
    this.password = encodePassword(password);
    return this;
  }

  static async findByUsername(
    username: string,
  ): Promise<UserModel | undefined> {
    const results = await this.find({ where: { username } });
    if (results.length) return results[0];
  }
}

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

  @Column({ nullable: false })
  @Index({ unique: true })
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

  static async findByUsername(username: string): Promise<UserModel | null> {
    const results = await this.find({ where: { username } });
    if (results.length) return results[0];
    return null;
  }
}

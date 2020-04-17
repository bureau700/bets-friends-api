import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Field, ObjectType, ID } from 'type-graphql';
import { encodePassword } from '../services/user-service/password';

@Entity('User')
@ObjectType()
export default class UserModel extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Field()
  @Column({ nullable: false })
  @Index({ unique: true })
  username?: string;

  @Field()
  @Column()
  password?: string;

  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @Field()
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

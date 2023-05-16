import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import { Profile } from './Profile';

@Entity({ name: 'user' })
export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ unique: true })
  userName: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  createAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}

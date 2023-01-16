import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberRole } from '../enum';
import { Group, User } from 'src/common';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('increment', { comment: '唯一标识' })
  id: number;

  @Column({ type: 'varchar', comment: '群名' })
  name: string;

  @Column({ type: 'varchar', comment: '组id' })
  groupId: string;

  @Column({ type: 'varchar', comment: '用户id' })
  userId: string;

  @Column({
    type: 'enum',
    enum: MemberRole,
    default: MemberRole.USER,
    comment: '用户权限',
  })
  role: MemberRole;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    comment: '加入时间',
  })
  joinTime: string;

  @ManyToOne(() => User, (user) => user.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Group, (group) => group.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: Group;
}

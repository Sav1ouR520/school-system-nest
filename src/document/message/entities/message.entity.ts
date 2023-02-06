import { Group, User } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column({ type: 'varchar', comment: '组id' })
  groupId: string;

  @Column({ type: 'varchar', comment: '用户id' })
  userId: string;

  @Column({ type: 'varchar', comment: '信息内容' })
  content: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    comment: '发送时间',
  })
  sendTime: string;

  @ManyToOne(() => User, (user) => user.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Group, (group) => group.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: Group;
}

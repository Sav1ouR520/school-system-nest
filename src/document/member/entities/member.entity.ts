import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MemberRole } from '../enum';
import { Group, User, File, Task } from 'src/common';

@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column({ type: 'varchar', comment: '成员名' })
  name: string;

  @Column({ type: 'varchar', comment: '组id' })
  groupId: string;

  @Column({ type: 'varchar', comment: '用户id' })
  userId: string;

  @Column({ type: 'boolean', comment: '状态', default: true })
  status: boolean;

  @Column({
    type: 'enum',
    enum: MemberRole,
    default: MemberRole.USER,
    comment: '用户权限',
  })
  role: MemberRole;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '加入时间',
  })
  joinTime: Date;

  @ManyToOne(() => User, (user) => user.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Group, (group) => group.member, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @OneToMany(() => File, (file) => file.member)
  file: File[];

  @OneToMany(() => Task, (task) => task.member)
  task: Task[];
}

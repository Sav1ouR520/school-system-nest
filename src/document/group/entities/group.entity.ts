import { User, Member, Task } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column({ type: 'varchar', nullable: true, comment: '组图片' })
  icon: string;

  @Column({ type: 'varchar', comment: '组名' })
  name: string;

  @Column({ type: 'uuid', comment: '拥有者' })
  owner: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;

  @Column({ type: 'boolean', default: true, comment: '激活状态' })
  activeStatus: boolean;

  @ManyToOne(() => User, (user) => user.group, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'owner' })
  user: User;

  @OneToMany(() => Member, (member) => member.group)
  member: Member[];

  @OneToMany(() => Task, (task) => task.group)
  task: Task[];
}

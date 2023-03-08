import { Group, File, Member } from 'src/common';
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
export class Task {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column({ type: 'varchar', comment: '任务名' })
  name: string;

  @Column({ type: 'varchar', comment: '任务简介' })
  introduce: string;

  @Column({ type: 'uuid', comment: '任务创建者' })
  memberId: string;

  @Column({ type: 'uuid', comment: '组id' })
  groupId: string;

  @Column({ type: 'boolean', default: true, comment: '激活状态' })
  activeStatus: boolean;

  @Column({ type: 'varchar', comment: '前置材料存放路径', nullable: true })
  dataPath: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createTime: Date;

  @ManyToOne(() => Group, (group) => group.task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'groupId' })
  group: Group;

  @ManyToOne(() => Member, (member) => member.task, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @OneToMany(() => File, (file) => file.task)
  file: File[];
}

import { Member, Task } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column({ type: 'uuid', comment: '任务归属' })
  taskId: string;

  @Column({ type: 'uuid', comment: '上传用户' })
  memberId: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '上传时间',
  })
  uploadTime: Date;

  @Column({ type: 'varchar', comment: '文件存放路径' })
  filePath: string;

  @Column({ type: 'boolean', comment: '文件状态', default: true })
  status: boolean;

  @Column({ type: 'varchar', comment: '记录上传原因', nullable: true })
  message: string;

  @ManyToOne(() => Task, (task) => task.file, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @ManyToOne(() => Member, (member) => member.file, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'memberId' })
  member: Member;
}

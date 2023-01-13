import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column('uuid', { comment: '任务归属' })
  taskId: string;

  @Column({ type: 'varchar', comment: '文件名' })
  filename: string;

  @Column({ type: 'uuid', comment: '上传用户' })
  uploadUser: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    comment: '上传时间',
  })
  uploadTime: string;

  @Column({ type: 'varchar', comment: '文件存放路径' })
  filePath: string;
}

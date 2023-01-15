import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
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
  createUser: string;

  @Column({ type: 'boolean', comment: '是否有前置材料', default: false })
  hasData: boolean;

  @Column({ type: 'varchar', comment: '前置材料存放路径', nullable: true })
  dataPath: string;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    comment: '创建时间',
  })
  createTime: string;
}

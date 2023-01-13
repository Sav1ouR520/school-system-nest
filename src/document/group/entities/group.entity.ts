import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column({ type: 'varchar', comment: '组名' })
  name: string;

  @Column({ type: 'uuid', comment: '拥有者' })
  owner: string;

  @ManyToOne(() => User, (user) => user.group)
  @JoinColumn({ name: 'owner' })
  user: User;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    comment: '创建时间',
  })
  createTime: string;
}

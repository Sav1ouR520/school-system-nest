import { hashSync } from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  uuid: string;

  @Column({ type: 'varchar', comment: '账号名称', length: 20, nullable: true })
  username: string;

  @Column({ type: 'varchar', comment: '登录账号', length: 20, unique: true })
  account: string;

  @Column({ type: 'varchar', comment: '登录密码' })
  password: string;

  @Column({ type: 'boolean', default: true, comment: '激活状态' })
  activeStatue: boolean;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    comment: '注册时间',
  })
  registerTime: string;

  @Column({ type: 'varchar', nullable: true, comment: 'Refresh Token' })
  refreshToken: string;

  @BeforeInsert()
  encryptPwd() {
    this.password = hashSync(this.password, 10);
  }
}

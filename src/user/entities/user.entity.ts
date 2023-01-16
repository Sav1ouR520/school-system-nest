import { hashSync } from 'bcryptjs';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from '../enum';
import { Group, Member } from 'src/common';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid', { comment: '唯一标识' })
  id: string;

  @Column({ type: 'varchar', comment: '账号名称', length: 20, default: '' })
  username: string;

  @Column({ type: 'varchar', comment: '登录账号', unique: true })
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

  @Column({ type: 'varchar', nullable: true, comment: '用户头像' })
  icon: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    comment: '用户权限',
  })
  role: UserRole;

  @OneToMany(() => Group, (group) => group.user)
  group: Group[];

  @OneToMany(() => Member, (member) => member.user)
  member: Member[];

  @BeforeInsert()
  encryptPwd() {
    this.password = hashSync(this.password, 10);
  }
}

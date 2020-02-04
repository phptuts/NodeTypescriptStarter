import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  googleUserId: string;

  @Column({ type: 'varchar', nullable: true })
  facebookUserId: string

  @Column({ type: 'boolean' })
  enabled = true;

  @Column({ type: 'boolean' })
  admin = false;

  @Column({ type: 'varchar', nullable: true })
  forgotPasswordToken: string;

  @Column({ type: 'datetime', nullable: true })
  forgotPasswordExpires: string;
}

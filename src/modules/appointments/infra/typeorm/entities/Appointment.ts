import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User) // Vários agendamentos para um usuário
  @JoinColumn({ name: 'provider_id' }) // Qual a coluna que identifica o prestador deste agendamento?
  provider: User; // Objeto relacionado ao id

  @Column()
  user_id: string;

  @ManyToOne(() => User) // Um usuário pode fazer quantos agendamentos ele quiser
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;

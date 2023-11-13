import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { IsPositive } from 'class-validator';
import { Wish } from 'src/wishes/entities/wish.entity';
import { ColumnDecimalTransformer } from 'src/transformer/transformer';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.offers)
  owner: User;

  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: new ColumnDecimalTransformer(),
  })
  amount: number;

  @Column({ type: 'bool', default: true })
  hidden: boolean;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { WishPartial } from 'src/wishes/dto/wish-partial.dto';

@Entity()
export class Wishlist {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  /* @OneToMany(() => Wish, (wish) => wish.id)
  @JoinColumn()
  items: Wish[]; */
  //@Column()
  //items: Wish[]; //one to many

  @Column({ type: 'json' })
  items: WishPartial[];

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
  //@Column()
  //owner: User; //many to one
}

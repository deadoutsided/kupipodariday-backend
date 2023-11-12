import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Length, IsUrl, IsNumber, IsObject, IsOptional } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { WishPartial } from 'src/wishes/dto/wish-partial.dto';
import { Wish } from 'src/wishes/entities/wish.entity';

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

  @Column({ default: 'some-wishlist' })
  @Length(0, 1500)
  description: string;

  @Column()
  @IsUrl()
  image: string;

  @ManyToMany(() => Wish, (wish) => wish.wishlists)
  @JoinTable()
  itemsId: Wish[];
  //@Column()
  //items: Wish[]; //one to many

  /* @IsOptional()
  @Column({ type: 'json' })
  @IsObject({ each: true })
  items: WishPartial[]; */

  @ManyToOne(() => User, (user) => user.wishlists)
  owner: User;
  //@Column()
  //owner: User; //many to one
}

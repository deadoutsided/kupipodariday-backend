import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { ColumnDecimalTransformer } from 'src/transformer/transformer';
import { Wishlist } from 'src/wishlists/entities/wishlist.entity';

@Entity()
export class Wish {
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
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: new ColumnDecimalTransformer(),
  })
  price: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
    transformer: new ColumnDecimalTransformer(),
  })
  raised: number;

  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
  //@Column()
  //owner: User; //many to one(one user can have more than one wish)

  @Column()
  @Length(1, 1024)
  description: string;

  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
  //@Column()
  //offers: Offer[]; //one to many(one wish can have many offers)

  @ManyToMany(() => Wishlist, (wishlist) => wishlist.itemsId)
  //@JoinTable()
  wishlists: Wishlist[];

  @Column({ type: 'integer', default: 0 })
  copied: number;
}

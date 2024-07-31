import { BaseEntity, Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { CartItem } from './CartItem.entity';

@Entity({ name: 'products' })
export class Product extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'real' })
  price: number;

  @OneToOne(() => CartItem, (cartItem) => cartItem.product, {
    onDelete: 'CASCADE',
  })
  cartItem: CartItem;
}

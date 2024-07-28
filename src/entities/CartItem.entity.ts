import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Cart } from './Cart.entity';

@Entity({ name: 'cart_items' })
export class CartItem extends BaseEntity {
  @PrimaryColumn()
  product_id: string;

  @Column({ type: 'int' })
  count: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
 
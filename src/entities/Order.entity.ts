import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Cart } from './Cart.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'json' })
  payment: string;

  @Column({ type: 'json' })
  delivery: string;

  @Column()
  comments: string;

  @Column()
  status: string;

  @Column({ type: 'int' })
  total: number;

  // @ManyToOne(() => Cart, (cart) => cart.orders)
  // @JoinColumn({ name: 'cart_id' })
  // cart: Cart;
}

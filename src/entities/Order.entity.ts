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

  @Column()
  user_id: string;

  @Column({ nullable: true })
  cart_id: string;

  @Column({ type: 'json', nullable: true })
  delivery: string;

  @Column({ type: 'enum', enum: ['ORDERED', 'PROCESSED'] })
  status: string;

  @Column({ type: 'float' })
  total: number;

  @ManyToOne(() => Cart, (cart) => cart.orders)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}

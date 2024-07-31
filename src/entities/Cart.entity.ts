import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CartItem } from './CartItem.entity';
import { Order } from './Order.entity';

@Entity({ name: 'carts' })
export class Cart extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'date' })
  created_at: string;

  @Column({ type: 'date' })
  updated_at: string;

  @Column({ type: 'enum', enum: ['OPEN', 'STATUS'] })
  status: string;

  @OneToMany(() => CartItem, (cartItems) => cartItems.cart, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id' })
  items: CartItem[];

  // @OneToMany(() => Order, (orders) => orders.cart)
  // @JoinColumn({ name: 'id' })
  // orders: Order[]
}

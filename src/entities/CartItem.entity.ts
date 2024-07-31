import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Cart } from './Cart.entity';
import { Product } from './Product.entity';

@Entity({ name: 'cart_items' })
export class CartItem extends BaseEntity {
  @PrimaryColumn()
  product_id: string;

  @Column({ type: 'int' })
  count: number;

  @Column({ nullable: true })
  cart_id: string;

  @ManyToOne(() => Cart, (cart) => cart.items, { orphanedRowAction: 'delete' })
  @JoinColumn({ referencedColumnName: 'id' })
  cart: Cart;

  @OneToOne(() => Product, (product) => product.cartItem, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}

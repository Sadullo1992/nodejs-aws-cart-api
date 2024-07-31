import { Injectable } from '@nestjs/common';
import { Cart } from 'src/entities/Cart.entity';
import { CartItem } from 'src/entities/CartItem.entity';
import { Order } from 'src/entities/Order.entity';
import { DataSource } from 'typeorm';
import { v4 } from 'uuid';

type OrderDto = Pick<Order, 'user_id' | 'cart_id' | 'delivery' | 'total'> & {
  items: CartItem[];
};

@Injectable()
export class OrderService {
  constructor(private dataSource: DataSource) {}

  async create({ cart_id, items, ...rest }: OrderDto) {
    const id = v4();
    const order = {
      ...rest,
      id,
      status: 'PROCESSED',
    };

    const date = new Date().toISOString();
    const cartDto = {
      status: 'ORDERED',
      updated_at: date,
    };

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const orderModel = await queryRunner.manager.create(Order, order).save();
      await queryRunner.manager.update(Cart, cart_id, cartDto);

      await queryRunner.commitTransaction();

      const cart = await queryRunner.manager.findOne(Cart, {
        where: { id: cart_id },
      });

      return { ...orderModel, cart_id, cart: { ...cart, items } };
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

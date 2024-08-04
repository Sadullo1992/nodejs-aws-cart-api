import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart.entity';
import { CartItem } from 'src/entities/CartItem.entity';
import { Product } from 'src/entities/Product.entity';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([Cart, CartItem, Product])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}

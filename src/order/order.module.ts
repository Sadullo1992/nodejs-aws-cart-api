import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/Cart.entity';
import { Order } from 'src/entities/Order.entity';
import { OrderService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, Order])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Cart } from './entities/Cart.entity';
import { CartItem } from './entities/CartItem.entity';
import { Order } from './entities/Order.entity';
import { AppDataSource } from './ormconfig';
import { Product } from './entities/Product.entity';

dotenv.config();

const ormConfig = AppDataSource.options;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...ormConfig,
      autoLoadEntities: true,
      entities: [Cart, CartItem, Order, Product],
      migrations: [`${__dirname}/migrations/*.ts`],
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

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

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: POSTGRES_HOST,
      port: parseInt(POSTGRES_PORT, 10) || 5432,
      username: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DB,
      synchronize: true,
      ssl: false,
      autoLoadEntities: true,
      entities: [Cart, CartItem, Order]
    }),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart as CartEntity } from 'src/entities/Cart.entity';
import { CartItem } from 'src/entities/CartItem.entity';
import { Product } from 'src/entities/Product.entity';
import { Repository } from 'typeorm';
import { Product as TProduct, CartItem as TCartItem } from '../models';

import { v4 } from 'uuid';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private cartRepository: Repository<CartEntity>,
    @InjectRepository(CartItem)
    private cartItemRepository: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findByUserId(userId: string) {
    return await this.cartRepository.findOne({
      where: {
        user_id: userId,
      },
      relations: {
        items: { product: true },
      },
    });
  }

  async createByUserId(userId: string) {
    const id = v4();
    const date = new Date().toISOString();

    const userCart = {
      id,
      user_id: userId,
      created_at: date,
      updated_at: date,
      status: 'OPEN',
    };

    const { id: cartId } = await this.cartRepository.create(userCart).save();

    return await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { items: { product: true } },
    });
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return await this.createByUserId(userId);
  }

  async updateByUserId(userId: string, cartItemDto: TCartItem) {
    const cart = await this.findOrCreateByUserId(userId);

    await this.createOrUpdateCartItem(cart.id, cartItemDto);

    const date = new Date().toISOString();
    cart.updated_at = date;
    await cart.save();

    return await this.findAllCartItems(cart.id);
  }

  async removeByUserId(userId: string) {
    const cart = await this.cartRepository.findOne({
      where: { user_id: userId },
    });

    const items = await this.findAllCartItems(cart.id);

    items.forEach(async (cartItem) => await cartItem.remove());

    await cart.remove();
  }

  // Product
  async createProduct(product: TProduct) {
    return await this.productRepository.create(product).save();
  }

  // CartItem
  async findAllCartItems(cartId: string) {
    const items = await this.cartItemRepository.find({
      where: { cart_id: cartId },
      relations: { product: true },
    });

    return items;
  }

  async createCartItem(cartId: string, { product, count }: TCartItem) {
    const cartItem = await this.cartItemRepository
      .create({
        product_id: product.id,
        count,
        cart_id: cartId,
      })
      .save();

    return cartItem;
  }

  async createOrUpdateCartItem(cartId: string, cartItemDto: TCartItem) {
    const { product, count } = cartItemDto;
    const cartItem = await this.cartItemRepository.findOne({
      where: { product_id: product.id },
    });

    if (!cartItem) {
      await this.createProduct(product);
      const data = await this.createCartItem(cartId, cartItemDto);
      return data;
    }

    // remove cartItem with product
    if (count === 0) {
      await cartItem.remove();
      return;
    }

    cartItem.count = count;
    const data = await cartItem.save();
    return data;
  }
}

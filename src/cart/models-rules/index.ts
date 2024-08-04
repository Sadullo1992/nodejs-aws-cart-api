import { CartItem } from 'src/entities/CartItem.entity';

/**
 * @param {Array.<CartItem>} items
 * @returns {number}
 */
export function calculateCartTotal(items: CartItem[]): number {
  return items || items.length === 0
    ? items.reduce((acc: number, { product: { price }, count }: CartItem) => {
        return (acc += price * count);
      }, 0)
    : 0;
}

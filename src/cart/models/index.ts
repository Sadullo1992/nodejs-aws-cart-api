enum CartStatuses {
  OPEN = 'OPEN',
  STATUS = 'STATUS'
}

export type Product = {
  id: string,
  title: string,
  description: string,
  price: number,
};


export type CartItem = {
  product: Product,
  count: number,
}
 
export type Cart = {
  id: string,
  user_i?: string,
  created_at?: string,
  updated_at?: string,
  status?: CartStatuses,
  items: CartItem[],
}

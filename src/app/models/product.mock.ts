import { Product } from './product.model';
import { faker } from '@faker-js/faker';

export function generateOneProduct(): Product {
  return {
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    category: { id: faker.number.int(), name: faker.commerce.department() },
    description: faker.commerce.productDescription(),
    images: [faker.image.url(), faker.image.url()],
    price: parseInt(faker.commerce.price()),
  };
}

export function generateManyProducts(size = 10): Product[] {
  const product: Product[] = [];
  for (let index = 0; index < size; index++) {
    product.push(generateOneProduct());
  }
  return [...product];
}

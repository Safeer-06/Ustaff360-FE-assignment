import ProductTestImageOne from '../assets/images/product-image-1.png';
import ProductTestImageTwo from '../assets/images/product-image-2.png';
import ProductTestImageThree from '../assets/images/product-image-3.jpg';
import ProductTestImageFour from '../assets/images/product-image-4.jpg';


export interface ProductDataDocument {
    id: number;
    name: string;
    category: string;
    price: number;
    imageSrc: string;
}

export const CategoryOptions: string[] = [
  "Electronics",
  "Books",
  "Industry",
  "Device",
  "Furniture",
]

export const MockData: ProductDataDocument[] = [
  {
    id: 1,
    name: "Tesla",
    category: "Electronics",
    price: 299,
    imageSrc: ProductTestImageOne
  },
  {
    id: 2,
    name: "The night after",
    category: "Books",
    price: 19,
    imageSrc: ProductTestImageOne
  },
  {
    id: 2,
    name: "Tecnofunk",
    category: "Industry",
    price: 219,
    imageSrc: ProductTestImageTwo
  },
  {
    id: 3,
    name: "Omega",
    category: "Electronics",
    price: 319,
    imageSrc: ProductTestImageTwo
  },
  {
    id: 4,
    name: "Delta",
    category: "Industry",
    price: 619,
    imageSrc: ProductTestImageOne
  },
  {
    id: 5,
    name: "Junction",
    category: "Device",
    price: 1000,
    imageSrc: ProductTestImageThree
  },
  {
    id: 6,
    name: "Tractor",
    category: "Industry",
    price: 100,
    imageSrc: ProductTestImageFour
  },
  {
    id: 6,
    name: "Drilling machine",
    category: "Equipment",
    price: 123,
    imageSrc: ProductTestImageFour
  },
  {
    id: 7,
    name: "Analyzer",
    category: "Industry",
    price: 194,
    imageSrc: ProductTestImageFour
  },
  {
    id: 8,
    name: "Tractor Vehicle",
    category: "Industry",
    price: 195,
    imageSrc: ProductTestImageFour
  },
  {
    id: 9,
    name: "Outlet Device",
    category: "Device",
    price: 191,
    imageSrc: ProductTestImageFour
  },
  {
    id: 10,
    name: "Electrical Device",
    category: "Device",
    price: 900,
    imageSrc: ProductTestImageTwo
  },
];

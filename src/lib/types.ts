export type Phone = {
  id: number;
  brand: string;
  model: string;
  image: string;
  price: number;
  specs: {
    display: string;
    camera: string;
    processor: string;
    battery: string;
  };
};

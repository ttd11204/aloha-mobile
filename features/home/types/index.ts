export type Home = {
  id: string;
  name: string;
};

export type Package = {
  cityId: number;
  name: string;
  description: string;
  isFree: boolean;
  price: number;
  city: any;
  feedbacks: any[];
  payments: any;
  id: number;
};

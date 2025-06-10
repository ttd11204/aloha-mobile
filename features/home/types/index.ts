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
  fromDate: string;
  toDate: string;
  city: any;
  feedbacks: any[];
  payments: any;
  id: number;
};

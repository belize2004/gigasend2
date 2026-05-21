interface Plan {
  name: string;
  description: string;
  price: number;
  priceLabel?: string;
  storage: string;
  storageBytes: number;
  popular: boolean;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  contactSales?: boolean;
}

interface UserSlice {
  _id: string | null
  email: string | null
}

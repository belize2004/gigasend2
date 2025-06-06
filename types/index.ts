interface Plan {
  name: string;
  description: string;
  price: number;
  storage: string;
  storageBytes: number;
  popular: boolean;
  features: string[];
  buttonText: string;
  buttonStyle: string;
}

interface UserSlice {
  _id: string | null
  email: string | null
}
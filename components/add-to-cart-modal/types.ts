import { FoodItem, FoodExtra } from '@/services/types/api-types';

export interface AddToCartModalProps {
  visible: boolean;
  onClose: () => void;
  foodItem: FoodItem;
  onConfirm: (data: AddToCartData) => void;
  initialData?: AddToCartInitialData;
}

export interface AddToCartData {
  extras: FoodExtra[];
  selectedOptions: { optionId: string; valueId: string; name: string }[];
  quantity: number;
}

export interface AddToCartInitialData {
  extras?: FoodExtra[];
  selectedOptions?: { optionId: string; valueId: string; name: string }[];
  quantity?: number;
}


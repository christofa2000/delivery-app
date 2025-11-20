import { FoodItem } from '../../services/types/api-types';

export interface FoodCardProps {
  item: FoodItem;
  onPress?: () => void;
  onAddToCart?: (item: FoodItem) => void;
}


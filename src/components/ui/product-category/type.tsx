// src/components/ui/product-category/type.ts

export interface CategoryItem {
  id: string;
  label: string; // Текст (например, "남성")
  image?: string; // Ссылка на фото (обязательно!)
}

export interface ProductCategoryUIProps {
  categories: CategoryItem[];
  selectedCategoryId: string | null;

  onFilterChange: (categoryId: string | null) => void;
}

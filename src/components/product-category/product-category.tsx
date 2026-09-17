import React, { useState, useMemo } from "react";
import { ProductCategoryUI } from "../../components/ui/product-category/product-category";
import { TProduct } from "../../utils/types";
import { categoriesConfig } from "../../data/ProductCategory";

export const ProductCategory: React.FC = () => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 600));

        setProducts([]);
      } catch (error) {
        console.error("Ошибка загрузки товаров:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    if (!selectedCategoryId) return products;
    return products.filter((p) => p.category === selectedCategoryId);
  }, [products, selectedCategoryId]);

  const handleFilterChange = (id: string | null) => {
    setSelectedCategoryId(id);
  };

  if (isLoading) {
    return <div className="loading">카탈로그 읽어오는 중...</div>;
  }

  return (
    <ProductCategoryUI
      categories={categoriesConfig}
      selectedCategoryId={selectedCategoryId}
      onFilterChange={handleFilterChange}
    />
  );
};

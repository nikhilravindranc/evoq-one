import { ProductsPage } from "@/components/products/ProductsPage";
import { pageMeta, PageJsonLd } from "@/lib/seo";

export const metadata = pageMeta("/products");

export default function Products() {
  return (
    <>
      <PageJsonLd path="/products" />
      <ProductsPage />
    </>
  );
}

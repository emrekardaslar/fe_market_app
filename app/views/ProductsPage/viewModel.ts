import { Filters } from "~/models/filter";
import {
  getProductsRepo,
  getCategoriesRepo,
  getProductWithCategoryRepo,
  getProductWithId,
  getProductsWithSubCategoryRepo,
  getFilterData,
} from "~/repository/generalRepository";

export default function ProductsViewModel() {
  async function getProducts() {
    return await getProductsRepo();
  }

  async function getCategories() {
    return await getCategoriesRepo();
  }

  async function getProductsWithCategory(category: string) {
    return await getProductWithCategoryRepo(category);
  }

  async function getProductsWithSubCategory(subcategory: string) {
    return await getProductsWithSubCategoryRepo(subcategory);
  }

  async function getProduct(id: string) {
    return await getProductWithId(id);
  }

  async function getProductWithFilter(params: Filters) {
    return await getFilterData(params);
  }

  function navigateToProduct(product: any, navigate: any) {
    navigate(
      `${product.category_name}/${product.subcategory_name}/${product.id}`.toLowerCase()
    );
  }

  function navigateToProductFromSubCategory(product: any, navigate: any) {
    navigate(`${product.subcategory_name}/${product.id}`.toLowerCase());
  }

  function getObject(products: any, names: any) {
    let res: any = {};
    names.forEach((name: string) => {
      res[name] = [];
      products.forEach((product: any) => {
        product.category_name == name && res[name].push(product);
      });
    });
    return res;
  }

  return {
    getObject,
    getProducts,
    getCategories,
    getProductsWithCategory,
    getProduct,
    navigateToProduct,
    navigateToProductFromSubCategory,
    getProductsWithSubCategory,
    getProductWithFilter,
  };
}

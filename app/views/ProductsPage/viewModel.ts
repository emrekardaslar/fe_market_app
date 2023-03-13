import {
  getProductsRepo,
  getCategoryNamesRepo,
  getProductWithCategoryRepo,
  getProductWithId,
  getProductsWithSubCategoryRepo,
} from "~/repository/generalRepository";

export default function ProductsViewModel() {
  async function getProducts() {
    return await getProductsRepo();
  }

  async function getCategoryNames() {
    return await getCategoryNamesRepo();
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

  function navigateToProduct(product: any, navigate: any) {
    navigate(`${product.category}/${product.subcategory}/${product.id}`);
  }

  function navigateToProductFromSubCategory(product: any, navigate: any) {
    navigate(`${product.subcategory}/${product.id}`);
  }

  function getObject(products: any, names: any) {
    let res: any = {};
    names.forEach((name: string) => {
      res[name] = [];
      products.forEach((product: any) => {
        product.category == name && res[name].push(product);
      });
    });
    return res;
  }

  return {
    getObject,
    getProducts,
    getCategoryNames,
    getProductsWithCategory,
    getProduct,
    navigateToProduct,
    navigateToProductFromSubCategory,
    getProductsWithSubCategory,
  };
}

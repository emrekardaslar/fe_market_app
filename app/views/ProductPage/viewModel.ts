import { getProductsRepo, getCategoryNamesRepo, getProductWithCategoryRepo } from "~/repository/generalRepository";

export default function ProductViewModel () {

    async function getProducts() {
        return await getProductsRepo();
    }

    async function getCategoryNames() {
        return await getCategoryNamesRepo();
    }

    async function getProductsWithCategory(category: string) {
        return await getProductWithCategoryRepo(category);
    }

    function clickHandler(product: any, navigate: any) {
        navigate(`${product.category}/${product.subcategory}/${product.id}`)
    }

    function getObject(products: any, names: any) {
        let res: any = {};
        names.forEach((name: string) => {
          res[name] = []
          products.forEach((product: any) => {
            product.category == name && res[name].push(product)
          })
        })
        return res;
    }

    return {
        getObject,
        getProducts,
        getCategoryNames,
        getProductsWithCategory,
        clickHandler
    }
}
import { useNavigate } from '@remix-run/react';
import { Hpl } from 'emrekardaslar-uikit';
import useViewModel from "./viewModel"

function ProductView({data}: any) {
    const navigate = useNavigate();
    const { getObject, clickHandler } = useViewModel();
    let products = data.products.results;
    let keys= data.categoryNames;
    let productsObject = getObject(products, keys);

    return (
        <>
            {keys.map((key: string) =>
            (
                <>
                    <h1 style={{ fontWeight: "bold", textTransform: "capitalize", marginLeft: "0.3rem" }}>{key}</h1>
                    <Hpl products={productsObject[key]} onClick={(product)=>clickHandler(product, navigate)} button={true} />
                </>
            )
            )}
        </>
    )
}

export default ProductView

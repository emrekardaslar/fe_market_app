import { HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "@remix-run/react";
import { Button, Rate, notification, Badge } from "antd"
import Meta from "antd/lib/card/Meta"
import { ProductImages } from "emrekardaslar-uikit";
import { useEffect, useState } from "react";
import { useShoppingCart } from "~/context/CartContext"
import Comments from "../../components/Comments";
import PageContent from "../../components/UI/PageContent"
import useViewModel from "./viewModel";

interface ProductPageProps {
    product: any,
    comments: any,
    favoriteList: any,
    setUpdate: any,
    isLoggedIn: boolean
}

function ProductPage({ product, comments, favoriteList, setUpdate, isLoggedIn }: ProductPageProps) {
    const navigate = useNavigate();
    const {
        increaseCartQuantity,
        getItemQuantity
    } = useShoppingCart();
    const [value, setValue] = useState(product.rating);
    const [itemQuantity, setItemQuantity] = useState(0);
    const [existingRatingId, setExistingRatingId] = useState(null);

    const { addToFavorite, isFavorited, giveRating, getRating } = useViewModel();

    const setRating = async () => {
       const res = await getRating(product.id, isLoggedIn);
       setValue(res.avg_rating);
       if (res.rating_id) {
        setExistingRatingId(res.rating_id);
       }
    }

    const setItemQty = () => {
        setItemQuantity(getItemQuantity(product.id))
    }

    useEffect(() => {
        setRating()
        setItemQty()
    }, [])

    const updateRating = async (val: number) => {
        await giveRating(product.id, val, existingRatingId);
        setValue(val);
    }

    const cartAddedNotification = (name: string, price: number) => {
        notification.open({
            message: `${name} added to your cart`,
            description:
                `${name} added to your cart for  $ ${price}`,
            onClick: () => {
                navigate("/cart")
            },
        });
        setItemQuantity(itemQuantity + 1)
    };

    return (
        <PageContent>
            <>
                <ProductImages content={
                    <>
                        <h2>{product.name}</h2>
                        <Rate allowHalf value={value} onChange={updateRating} />
                        <h4>Price: ${product.price}</h4>
                        <Meta description={product.description} />
                        <br></br>
                        <Badge count={itemQuantity} status={"success"} showZero>
                            <Button type='primary' onClick={() => { 
                                increaseCartQuantity(product.id, product.name, product.price); 
                                cartAddedNotification(product.name, product.price); 
                            }}>Add to Cart</Button>
                        </Badge>
                        <Button style={{marginLeft: "1rem"}} 
                            type={isFavorited(product.id, favoriteList) ? "primary" : "default"} 
                            shape="circle" icon={<HeartOutlined />} danger 
                            onClick={()=>{addToFavorite(product.id, favoriteList, setUpdate)}}></Button>
                        <Comments data={comments} user={null} />
                    </>
                } imageLinks={[
                    product.imgLink,
                    /* ...product.imgList */
                ]} 
                imageAlt = {product.name}
                />
            </>
        </PageContent>
    )
}

export default ProductPage
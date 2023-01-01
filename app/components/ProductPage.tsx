import { HeartOutlined } from "@ant-design/icons";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { Row, Card, Button, Col, Rate, notification, Badge, Space } from "antd"
import Meta from "antd/lib/card/Meta"
import { ProductImages } from "emrekardaslar-uikit";
import { useEffect, useState } from "react";
import { useShoppingCart } from "~/context/CartContext"
import Comments from "./Comments";
import PageContent from "./UI/PageContent"

interface ProductPageProps {
    product: any,
    comments: any,
    user: any,
    favoriteList: any
}

function ProductPage({ product, comments, user, favoriteList }: ProductPageProps) {
    const {
        increaseCartQuantity,
        getItemQuantity
    } = useShoppingCart()
    const [value, setValue] = useState(product.rating);
    const [itemQuantity, setItemQuantity] = useState(0);
    const fetcher = useFetcher();
    const data = useLoaderData();
    const navigate = useNavigate()

    const setRating = () => {
        const ratings = data.rating;
        let counter = 0;
        let total = 0;
        ratings.forEach((rating: any) => {
            total += rating.value
            counter++;
        });
        if (counter == 0) {
            setValue(5)
        }
        else {
            const average = total / counter;
            setValue(average)
        }
    }

    const setItemQty = () => {
        setItemQuantity(getItemQuantity(product.id))
    }

    useEffect(() => {
        setRating()
        setItemQty()
    }, [])

    const updateRating = (val: number) => {
        const rating = {
            value: val,
            userId: user.id,
            productId: product.id
        }

        fetcher.submit(
            { rating: JSON.stringify(rating) },
            { method: 'post' }
        )
        setValue(val)
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

    const addToFavorite = (product: any, user: any) => {
        fetcher.submit(
            {addToFavorite: JSON.stringify({productId: product.id, userId: user.id})},
            {method: 'post'}
        )
    }

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
                            <Button type='primary' onClick={() => { increaseCartQuantity(product.id, product.name, product.price); cartAddedNotification(product.name, product.price); }}>Add to Cart</Button>
                        </Badge>
                        <Button style={{marginLeft: "1rem"}} type={favoriteList.length == 0 ? "default" : "primary"} shape="circle" icon={<HeartOutlined />} danger onClick={()=>{addToFavorite(product, user)}}></Button>
                        <Comments data={comments} user={user} />
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
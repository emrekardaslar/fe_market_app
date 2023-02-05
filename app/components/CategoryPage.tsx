import { useNavigate } from '@remix-run/react'
import { Row, Col, Card, Button, notification } from 'antd'
import Meta from 'antd/lib/card/Meta'
import PageContent from './UI/PageContent'
import { useShoppingCart } from "~/context/CartContext";
import { HeartOutlined } from '@ant-design/icons';
import useFavoriteViewModel from "../views/FavoritesPage/viewModel";

interface CategoryProps {
    data: any;
    favoriteList: any;
    setUpdate: any;
}

function CategoryPage({ data, favoriteList, setUpdate }: CategoryProps) {
    const { addToFavorites, removeFromFavorites } = useFavoriteViewModel();
    const navigate = useNavigate()
    const {
        increaseCartQuantity,
    } = useShoppingCart()

    const cartAddedNotification = (name: string, price: number) => {
        notification.open({
            message: `${name} added to your cart`,
            description:
                `${name} added to your cart for  $ ${price}`,
            onClick: () => {
                navigate("/cart")
            },
        });
    };

    const addToFavorite = async (productId: any) => {
        if (isFavorited(productId)){
            favoriteList.forEach(async (item: any) => {
                if (item.product.id == productId) {
                    await removeFromFavorites(item.id)
                    setUpdate(Math.random());
                }
            })
        }
        else {
            await addToFavorites(productId)
            setUpdate(Math.random());
        }
    }

    const isFavorited = (productId: any) => {
        let result = false;
        favoriteList.forEach((item: any) => {
            if (item.product.id == productId) {
                result = true;
            }
        })
        return result;
    }

    return (
        <>
            <PageContent>
                <Row key={Math.random()} gutter={16}>
                    {data.map((item: any) => (
                        <>
                            <div className="site-card-wrapper">
                                <Col span={6}>
                                    <Card key={item.id} hoverable  title={item.name} bordered={false}
                                        style={{ width: "15rem" }} 
                                        cover={
                                            <div style={{ overflow: "hidden", height: "15rem"}}>
                                                <img alt="example" style={{ height: "100%" }} src={item.imgLink} onClick={() => navigate(`./${item.id}`)} />
                                            </div>
                                        }>
                                        <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                                        <br></br>
                                        <Button type='primary' onClick={() => { increaseCartQuantity(item.id, item.name, item.price); cartAddedNotification(item.name, item.price); }}>Add to Cart</Button>
                                        <Button style={{marginLeft: "1rem"}} type={isFavorited(item.id) ? "primary" : "default"} shape="circle" icon={<HeartOutlined />} danger 
                                            onClick={()=>addToFavorite(item.id)}></Button>
                                    </Card>
                                </Col>
                            </div>
                        </>
                    ))}
                </Row>
            </PageContent>
        </>
    )
}

export default CategoryPage
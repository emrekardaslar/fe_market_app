import { HeartOutlined } from '@ant-design/icons';
import { Outlet } from '@remix-run/react';
import { Row, Col, Card, Button } from 'antd';
import HeaderC from '~/components/Header';
import { useShoppingCart } from '~/context/CartContext';
import useViewModel from "./viewModel";
import { getHeaderItems } from "~/utils/helper";
import Meta from 'antd/lib/card/Meta'
import headerItems from "../../mock/headerItems"
import { useEffect, useState } from 'react';
import useLoginViewModel from "../LoginPage/viewModel";

function FavoritesView({data}: any) {
    const { cartAddedNotification, removeFromFavorites, getFavoriteList } = useViewModel();
    const { increaseCartQuantity } = useShoppingCart()
    const { getUserData } = useLoginViewModel();
    const [user, setUser] = useState(null);
    const [favorites, setFavorites] = useState([]);
    let items = getHeaderItems(data, headerItems)

    useEffect(()=>{
        async function getUser() {
            const token = await getUserData();
            if (!token) window.location.href = "/login"
            else {
                setUser(token)
                console.log(token)
                const favoriteList = await getFavoriteList();
                console.log(favoriteList.results)
                setFavorites(favoriteList.results)
            }
        }
        getUser();
    }, [])
    
    return (
        <>
            <HeaderC items={items} selectedKey='Favorite List' />
            <Outlet />
            <br></br>
            {user !=null && <Row key={Math.random()} gutter={16}>           
                {favorites.map((item: any) => (
                    <>
                        <div className="site-card-wrapper">
                            <Col span={6}>
                                <Card key={item.id} hoverable title={item.name} bordered={false}
                                    style={{ width: "15rem" }}
                                    cover={
                                        <div style={{ overflow: "hidden", height: "15rem" }}>
                                            <img alt="example" style={{ height: "100%" }} src={item.imgLink} onClick={() => window.location.href = (`http://${data.baseUrl}/products/${item.category}/${item.subCategory}/${item.id}`)} />
                                        </div>
                                    }>
                                    <Meta key={item.id} title={item.name} description={`Price: ${item.price}`} />
                                    <br></br>
                                    <Button type='primary' onClick={() => { increaseCartQuantity(item.id, item.name, item.price); cartAddedNotification(item.name, item.price); }}>Add to Cart</Button>
                                    <Button style={{ marginLeft: "1rem" }} type={"primary"} shape="circle" icon={<HeartOutlined />} danger onClick={() => { removeFromFavorites(item.id, data.user) }}></Button>
                                </Card>
                            </Col>
                        </div>
                    </>
                ))}
            </Row>}
        </>
    )
}

export default FavoritesView
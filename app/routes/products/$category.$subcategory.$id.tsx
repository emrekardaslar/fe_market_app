import { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import moment from 'moment';
import ProductPage from '~/views/ProductPage/view';
import { getUserId } from '~/services/sesssion.server';
import { db } from '~/utils/db.server';
import { capitalizeFirstLetter } from '~/utils/helper';
import useViewModel from "~/views/ProductsPage/viewModel";

export const loader: LoaderFunction = async ({ request, params }) => {
    const { getProduct } = useViewModel();
    let product = await getProduct(params.id);
    product = product.results[0];
    /* await db.product.findFirst({
        where: {
            id: params.id
        }
    }) */

    let comments = []/* await db.comment.findMany({
        where: {
            productId: product.id
        },
        select: {
            id: true,
            productId: true,
            content: true,
            createdAt: true,
            user: {
                select: {
                    username: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    }) */

    let userId = await getUserId(request);
    let user = null;
    if (userId) {
        user = await db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                username: true
            }
        })
    }

    comments.forEach((comment: any) => {
        comment.author = comment.user.username
        comment.avatar = 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'
        comment.datetime = moment(comment.createdAt).fromNow()
    })

    const rating = []/* await db.rating.findMany({
        where: {
            productId: product?.id
        }
    }) */

    const favoriteList = []/* await db.favoriteList.findMany({
        where: {
            productId: product?.id,
            userId: user?.id
        }
    }) */

    return { product: product, comments: comments, user: user, rating: rating, favoriteList: favoriteList }
};

export const meta: MetaFunction<typeof loader> = ({
    data,
  }) => {
    const { product } = data;
    return {
      title:capitalizeFirstLetter(product.name),
      description: product.description,
    };
  };

export const action: ActionFunction = async ({ request, params }): Promise<any> => {
    const formData = await request.formData();
    const response = JSON.parse(formData.get("data"))
    const edit = JSON.parse(formData.get("commentToEdit"))
    const rating = JSON.parse(formData.get("rating"))
    const addToFavorite =JSON.parse(formData.get("addToFavorite"))
    if (request.method == 'DELETE') {
        //delete comment
        const idToDelete = formData.get('commentToDelete')
        const deletedComment = await db.comment.delete({
            where: {
                id: idToDelete
            }
        })
        return { deletedComment }
    }

    else if (request.method === 'POST') {
        //update rating
        if (formData && rating) {
            //check if user has rating
            const doesExists = await db.rating.findFirst({
                where: {
                   AND: [
                    {productId: rating.productId},
                    {userId: rating.userId}
                   ]
                }
            })
            let userRating: any = null;
            if (doesExists) {
                //update
                userRating = await db.rating.update({
                    data: {
                        userId: rating.userId,
                        productId: rating.productId,
                        value: rating.value
                    },
                    where: {
                        id: doesExists.id
                     }
                })
            }
            else {
                //create
                userRating = await db.rating.create({
                    data: {
                        userId: rating.userId,
                        productId: rating.productId,
                        value: rating.value
                    }
                })
            }
            return {rating: userRating}
        }
        //create or update comment
        else if (formData && edit) {
            await db.comment.update({
                data: {
                    content: edit.content
                },
                where: {
                    id: edit.id
                }
            })
        }
        else if (formData && addToFavorite) {
            const favorited = await db.favoriteList.findFirst({
                where: {
                    productId: addToFavorite.productId,
                    userId: addToFavorite.userId
                }
            })
            if (!favorited) {
                await db.favoriteList.create({
                    data: {
                        productId: addToFavorite.productId,
                        userId: addToFavorite.userId
                    }
                })
            }
            else {
                await db.favoriteList.delete({
                    where: {
                        userId_productId: {
                            productId: addToFavorite.productId,
                            userId: addToFavorite.userId
                        }
                    }
                })
            }
        }
        else {
            await db.comment.create({
                data: {
                    content: response.value,
                    productId: params.id,
                    userId: response.user.id
                }
            })
        }
    }

    return {}
};

function ProductDetail() {
    const data = useLoaderData()
    return (
        <ProductPage product={data.product} comments={data.comments} user={data.user} favoriteList={data.favoriteList}/>
    )
}

export default ProductDetail
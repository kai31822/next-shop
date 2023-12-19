//server
async function getPostById(postId: string) {
    const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: 'GET',
    });
    return response.json();
}

//
const PostID = async ({ params, searchParams }: any) => {
    const { post } = await getPostById(params.id);
    console.log(post);

    return (
        <div>
            <h1>{post?.title}</h1>
            <p>{post?.description}</p>
        </div>
    );
};

export default PostID;

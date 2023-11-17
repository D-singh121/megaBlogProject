// import { PostCard, Container } from "../components"
import Container from "../components/container/Container"
import PostCard from "../components/PostCard"
import appwriteDbService from "../appWrite/databaseConfig"
import { useState, useEffect } from "react"


function AllPosts() {

	const [posts, setPosts] = useState([])

	useEffect(() => {
		appwriteDbService.getAllPost([]).then((posts) => {
			if (posts) {
				setPosts(posts.documents)
			}
		})
	}, [])

	return (
		<div className=" w-full py-8">
			<Container>
				<div className='flex flex-wrap'>
					{posts.map((post) => (
						<div key={post.$id} className='p-2 w-1/4'>
							<PostCard post={post} />
						</div>
					))}
				</div>
			</Container>
		</div>
	)
}

export default AllPosts;
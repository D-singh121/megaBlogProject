// import { Container, PostForm } from "../components"
import Container from "../components/container/Container"
import PostForm from "../components/postform/PostForm"
function AddPost() {
	return (
		<div className=" py-8">
			<Container>
				<PostForm />
			</Container>
		</div>
	)
}

export default AddPost;
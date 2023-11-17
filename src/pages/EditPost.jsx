// import { Container, PostForm } from '../components/index';
import Container from '../components/container/Container';
import PostForm from '../components/postform/PostForm';
import { useState, useEffect } from 'react';
import appwriteDbService from '../appWrite/databaseConfig';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
	const [post, setPost] = useState(null)
	const navigate = useNavigate()
	//*****  edit karne ke liye  jaise hi user edit pe click karega to hume ek url milega usme se "slug(id)" nikal lenge with the help of useParams hook  */
	const { slug } = useParams()

	useEffect(() => {
		//***** slug is nothing but it is an "Id" of post  */
		if (slug) {
			//**** agar id hai to post bhi mil jayega ,post mil gya to setpost me bhej denge agar nahi mila to homepage pe redirect kar denge */
			appwriteDbService.getPost(slug).then((post) => {
				if (post) {
					setPost(post)
				}
			})
		} else {
			navigate('/')
		}
	}, [slug, navigate]) //***** agar slug ya navigate me kuch changes hote hai to useEffect dir se run hoga  */


	return post ? (
		<div className=' py-8'>
			<Container>
				<PostForm post={post} />
			</Container>
		</div>
	) : null

}

export default EditPost
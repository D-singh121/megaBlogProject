import { useCallback, useEffect } from "react";
// import { Button, Select, Input, RTEditor } from "../index.js";
import Button from "../Button.jsx";
import Input from "../Input.jsx";
import Select from "../Select.jsx";
import RTEditor from "../RTEditor.jsx";
import { useForm } from "react-hook-form";
import appwriteDbService from "../../appWrite/databaseConfig.js";
import { useNavigate, } from "react-router-dom";
import { useSelector } from "react-redux";

//****** hume pta kaise chalega ki user editor me first time "write" karne aaya hai ki use "edit" karne aaya hai. but user agar edit karne aaya hai to edit button  me click karke hi ayega to jaise hi user click karega to hum post ki sari info argument me le lenge    */
function PostForm({ post }) {
	const navigate = useNavigate();
	//****** watch continue hamare form field ko watch karega ki usme koi changes huye hai ki nahi  */
	const { register, handleSubmit, watch, setValue, control, getValues } =
		useForm({
			defaultValues: {
				//***** agar post me se value aarahi hai to use hum show kar denge nahi to empty set kar denge  */
				title: post?.title || " ",
				content: post?.content || "",
				slug: post?.slug || " ",
				status: post?.status || "",
			},
		});

	const userData = useSelector((state) => state.user.userData);

	//***** ab user jab submit karega to 2 case ho sakte hai ki post ki value pahle se ho state me agar nahi hai to new entry create karenge  */
	const submit = async (data) => {
		if (post) {
			//*** agar humare pass file hai to upload kar denge database me */
			//**** ye data jo hai react-hook-form me data accept karta hai. to agar data me image hai to appwrite ki uploadfile service ki madad se file ko upload kardenge   */
			const file = data.image[0]
				? appwriteDbService.uploadFile(data.image[0])
				: null;

			// **** ab agar new file upload ho gai hai to old file ko deleate bhi to karn padega */
			if (file) {
				appwriteDbService.deleteFile(post.featuredImage);
			}

			//**** ab file  post ho gya hai to use update bhi to  karna padega uske liye appwrite ki service hai hamre pass  */

			const dbPost = await appwriteDbService.updatePost(post.$id, {
				...data,
				//**** image upload karne ke baad jo hume file mili hai usme se featuredImage ko override karna padega  */
				featuredImage: file ? file.$id : undefined,
			});

			//**** ab dbPost ho gya hai to user ko navigate bhi karna padega dbPost ki id se. */
			if (dbPost) {
				navigate(`/post/${dbPost.$id}`);
			}
		} else {
			const file = data.image[0]
				? await appwriteDbService.uploadFile(data.image[0])
				: null;

			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId;
				const dbPost = await appwriteDbService.createPost({
					...data,
					userId: userData.$id,
				});
				if (dbPost) {
					navigate(`/post/${dbPost.$id}`);
				}
			}
		}
	}

	//********** Interview related question also mIMP */
	const slugTransform = useCallback((value) => {
		if (value && typeof value == "string") {
			return value
				.trim()
				.toLowerCase()
				.replace(/^[a-zA-Z\d\s]+/g, '-')
				.replace(/\s/g, '-')

		}
		return ' ';
	}, [])


	useEffect(() => {
		const subScription = watch((value, { name }) => {
			if (name === 'title') {
				setValue('slug', slugTransform(value.title, { shouldValidate: true }))
			}
		})

		return () => {
			subScription.unsubscribe()
		}
	}, [watch, slugTransform, setValue])

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
					}}
				/>
				<RTEditor label="Content :" name="content" control={control} defaultValue={getValues("content")} />
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image", { required: !post })}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={appwriteDbService.getFilePreview(post.featuredImage)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	)
}

export default PostForm;

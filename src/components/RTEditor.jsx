//*** we are creating the text text editor with the help of @tinymce library */
import { Editor } from "@tinymce/tinymce-react"


function RTEditor() {
	return (
		<Editor
			initialValue="default value"
			init={
				{
					branding: false,
					height: 500,
					menubar: true,
					plugins: [
						"image", "advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "code", "help", "wordcount", "anchor",
					],
					toolbar:
						"undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
					content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
				}
			}


		/>

	)
}

export default RTEditor
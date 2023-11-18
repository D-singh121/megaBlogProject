import Container from './container/Container'

function Error() {
	return (
		<div className=' w-full '>
			<Container>
				<div className=' py-8'>
					<p className=' text-red-500 font-bold text-2xl'>404 Not Found page please go back to home page</p>
				</div>
			</Container>
		</div>
	)
}

export default Error
//****** This component is created for protected routes implementation   basically protected component*/
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Protected({ children, authentication = true }) {
	const [loader, setLoader] = useState(true);
	const navigate = useNavigate();

	//****** hum pahle authstore se check karenge ki user loggedIn hai ki nahi   */
	const authStatus = useSelector((state) => state.auth.status);

	useEffect(() => {
		if (authentication && authStatus !== authentication) {
			navigate("/login");
		} else if (!authentication && authStatus !== authentication) {
			navigate("/");
		}

		setLoader(false);
	}, [authStatus, navigate, authentication]);

	return loader ? <p>Loading....</p> : <>  {children}</>
}
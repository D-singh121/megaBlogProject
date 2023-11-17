import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import myStore from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// import { AuthLayout, Login } from "./components/index.js";
import AuthLayout from "./components/AuthLayout.jsx"
import Login from "./components/Login.jsx"
// import { Home, AddPost, SignUp, EditPost, Post, AllPosts } from "./pages/index.js"
import AddPost from "./pages/AddPost.jsx"
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "signup",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element: (
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            {" "}
            <AddPost />
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            {" "}
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: <Post />,
      },

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={myStore}>
      {/* basically comes form router-dom */}
      <RouterProvider router={router} />
    </Provider>,
  </React.StrictMode>
)

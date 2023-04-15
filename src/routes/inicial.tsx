import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from '../pages/login';
// import Home from '../../pages/home';

function IndexRouter() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      // children: [
      //   {
      //     path: "Home",
      //     element: <Home />,
      //   },
      // ],
    },
    // {
    //   path: "Home",
    //   element: <Home />,
    // }
  ]);

  return (
    <RouterProvider router={router}/>
  )
}

export default IndexRouter;
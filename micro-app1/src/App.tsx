import User from "./pages/User.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <User/>
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

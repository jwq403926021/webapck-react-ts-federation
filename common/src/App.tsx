import {createBrowserRouter, RouterProvider} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: null
    }
  ])
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}

export default App

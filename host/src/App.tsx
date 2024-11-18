import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";

function App() {
  return (
    <>
      <RouterProvider router={router} future={{
        v7_startTransition: true,
      }}/>
    </>
  )
}

export default App

import RootLayout from "../layout/RootLayout.tsx";
import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Order from "../pages/Order.tsx";
import MasterData from "../pages/MasterData.tsx";

import {lazy, Suspense} from "react";
// const Home = lazy(() => import('../pages/Home.tsx'));
// const Order = lazy(() => import('../pages/Order.tsx'));
// const MasterData = lazy(() => import('../pages/MasterData.tsx'));
const User = lazy(() => import('app1/User'));


export const routes = [
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Order/>
          </Suspense>
        ),
        needCache: true
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <User/>
          </Suspense>
        ),
        needCache: true
      },
      {
        path: "/masterData",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MasterData/>
          </Suspense>
        )
      },
    ]
  }
]
export const router = createBrowserRouter(routes);
function flattenChildren(routes) {
  return routes.flatMap((route) => {
    const children = route.children ? flattenChildren(route.children) : [];
    return [route, ...children];
  });
}
type ProjectRouteType = typeof routes
export const needCachedRoutes:ProjectRouteType = flattenChildren(routes).filter(i => i.needCache)


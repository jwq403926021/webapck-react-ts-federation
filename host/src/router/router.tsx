import RootLayout from "../layout/RootLayout.tsx";
import {createBrowserRouter, RouteObject} from "react-router-dom";
import Home from "../pages/Home.tsx";
// import Order from "../pages/Order.tsx";
// import MasterData from "../pages/MasterData.tsx";
// import User from "../pages/User.tsx";

import {lazy, Suspense} from "react";
import RootErrorComponent from "../components/RootErrorComponent.tsx";
// const Home = lazy(() => import('../pages/Home.tsx'));
const Order = lazy(() => import('../pages/Order.tsx'));
const MasterData = lazy(() => import('../pages/MasterData.tsx'));
const User = lazy(() => import('app1/User'));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout/>,
    errorElement: <RootErrorComponent/>,
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        needCache: true
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <User/>
          </Suspense>
        ),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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


import User from '../pages/User'
import {RemoteRoute} from "@/pages/RemoteRoute.tsx";
import {RouteObject} from "react-router";
// import {lazy} from "react";
// const User = lazy(() => import('../pages/User'))

const routes: RouteObject[] = [{
  "path": "/remote/user",
  "Component": User
}, {
  "path": "/remote/remote-router",
  "Component": RemoteRoute
}]
export default routes
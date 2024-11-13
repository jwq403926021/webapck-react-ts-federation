import {matchRoutes, useLocation, useOutlet} from "react-router-dom";
import {KeepAliveContext, KeepAliveContextType} from "../context/keepaliveContext.tsx";
import {useContext, useEffect} from "react";
import {needCachedRoutes, routes} from "../router/router.tsx";
function CachedOutlet() {
  const outlet = useOutlet()
  const location = useLocation()
  const {state, dispatch} = useContext(KeepAliveContext) as KeepAliveContextType
  const matchedRoutes = matchRoutes(routes, location.pathname);
  const isExistInCache = state.cachedPath.includes(location.pathname)
  useEffect(() => {
    // check current location path is a need cache route
    const isNeedCacheElement = !!needCachedRoutes.find(i => {
      return matchedRoutes?.length && i.path === matchedRoutes[matchedRoutes.length - 1].pathname
    })
    // check current location path is already in the cache stack or not
    if (isNeedCacheElement && !isExistInCache) {
      dispatch({
        type: 'add',
        payload: {
          cachedPath: location.pathname,
          cachedElement: outlet
        }
      })
    }
  }, [location.pathname, outlet]);
  return (
    <>
      {
        Object.entries(state.cachedElementMap).map(([key, value]) => {
          return <div key={key} hidden={key !== location.pathname}>{value}</div>
        })
      }
      {
        !isExistInCache && outlet
      }
    </>
  );
}

export default CachedOutlet;
import {useContext, useEffect} from "react";
import {KeepAliveContext} from "../context/keepaliveContext.tsx";
import {eventbus} from 'common/utils'
export interface CachedTabProps {}
const CachedTab: React.FC<CachedTabProps> = () => {
  const keepaliveContext = useContext(KeepAliveContext)
  // console.log('keepaliveContext:', keepaliveContext?.state)
  useEffect(() => {
    eventbus.on('test', () => {
      console.log(1)
    })
    return () => {
      eventbus.off('test')
    }
  }, []);
  return (
    <div>
      CachedTab {keepaliveContext?.state.cachedPath}
    </div>
  );
};

export default CachedTab;
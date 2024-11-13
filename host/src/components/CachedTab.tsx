import {useContext} from "react";
import {KeepAliveContext} from "../context/keepaliveContext.tsx";

export interface CachedTabProps {}
const CachedTab: React.FC<CachedTabProps> = () => {
  const keepaliveContext = useContext(KeepAliveContext)
  // console.log('keepaliveContext:', keepaliveContext?.state)
  return (
    <div>
      CachedTab {keepaliveContext?.state.cachedPath}
    </div>
  );
};

export default CachedTab;
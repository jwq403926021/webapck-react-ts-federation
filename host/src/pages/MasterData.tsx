import {Outlet} from "react-router-dom";

export interface MasterDataProps {}
const MasterData: React.FC<MasterDataProps> = () => {
  return (
    <div>
      MasterData
      <Outlet/>
    </div>
  );
};

export default MasterData;
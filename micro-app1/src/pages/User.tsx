import UserChild from "./UserChild.tsx";
import {useState} from "react";
import {useLocation} from "react-router";
import {eventbus} from 'common/utils'
export interface UserProps {}
const User: React.FC<UserProps> = () => {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
    eventbus.emit('test');
  }
  const location = useLocation();
  console.log(location)
  return (
    <div>
      User count: {count} - {process.env.API_URL}
      <br/><button onClick={add}>+1</button>
      这是一个remote组件的内部组件:<UserChild/>
    </div>
  );
};

export default User;
import UserChild from "./UserChild.tsx";
import {useState} from "react";

export interface UserProps {}
const User: React.FC<UserProps> = () => {
  const [count, setCount] = useState(0);
  const add = () => {
    setCount(count + 1);
  }
  return (
    <div>
      User count: {count}
      <br/><button onClick={add}>+1</button>
      这是一个remote组件的内部组件:<UserChild/>
    </div>
  );
};

export default User;
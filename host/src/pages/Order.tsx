import {useEffect, useState} from "react";
import {useUserStore} from "common/store"
import {abc ,ccc} from "common/utils"
export interface OrderProps {}
const Order: React.FC<OrderProps> = () => {
  const [count, setCount] = useState(0);
  const addOne = () => {
    setCount((draft) => draft + 1)
    setUser()
    console.log(abc, ccc)
  }
  const { userInfo, setUser } = useUserStore()
  useEffect(() => {
    console.log(userInfo, 'final!')
  }, [userInfo]);
  return (
    <div>
      Order {count} - {process.env.API_URL}
      <ul>
        <li>{userInfo.userId}</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
        <li>1</li>
      </ul>
      <button onClick={addOne}>+1</button>
    </div>
  );
};

export default Order;
import {useEffect, useState} from "react";
import {useUserStore} from "common/store"
export interface OrderProps {}
const Order: React.FC<OrderProps> = () => {
  const [count, setCount] = useState(0);
  const addOne = () => {
    setCount((draft) => draft + 1)
    setUser()
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
        <li>333</li>
        <li>5555</li>
        <li>1</li>
        <li>1</li>
      </ul>
      <button onClick={addOne}>+1</button>
    </div>
  );
};

export default Order;
import {useState} from "react";

export interface OrderProps {}
const Order: React.FC<OrderProps> = () => {
  const [count, setCount] = useState(0);
  const addOne = () => {
    setCount((draft) => draft + 1)
  }
  return (
    <div>
      Order {count} - {process.env.API_URL}
      <ul>
        <li>1</li>
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
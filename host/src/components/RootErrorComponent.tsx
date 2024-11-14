import {useRouteError} from "react-router";
import {useEffect} from "react";

function RootErrorComponent () {
  const error = useRouteError();
  useEffect(() => {
    console.log('RootErrorComponent log:', error)
  }, []);
  return <div>Error</div>;
}
export default RootErrorComponent
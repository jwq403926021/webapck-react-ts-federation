import {$get, $post, $postForm} from './axiosInstance.ts'
import eventbus from './mittInstance.ts'
const abc = (a: number, b: string, c: boolean) => {
  console.log(a, b, c)
}
const ccc = 123
export {
  eventbus,
  $get,
  $post,
  $postForm,
  abc,
  ccc
}
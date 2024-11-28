import { create } from 'zustand'
import { combine } from 'zustand/middleware'

const useUserStore = create(
  combine({
    userInfo: {
      userId: '',
      userName: ''
    }
  }, (setState, getState, store) => ({
    setUser: () => {
      console.log(getState(), store, 'before')
      setState((state) => {
        return {
          ...state,
          userInfo: { userId: '1', userName: '1' }
        }
      })
      console.log(getState(), store, 'after')
    }
  })),
)

export default useUserStore;
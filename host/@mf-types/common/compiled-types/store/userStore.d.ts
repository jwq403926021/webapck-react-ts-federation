declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<Omit<{
    userInfo: {
        userId: string;
        userName: string;
    };
}, "setUser"> & {
    setUser: () => void;
}>>;
export default useUserStore;

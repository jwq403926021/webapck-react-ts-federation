
    export type RemoteKeys = 'host/Shared';
    type PackageType<T> = T extends 'host/Shared' ? typeof import('host/Shared') :any;
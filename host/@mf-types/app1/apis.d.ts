
    export type RemoteKeys = 'app1/User' | 'app1/Router';
    type PackageType<T> = T extends 'app1/Router' ? typeof import('app1/Router') :T extends 'app1/User' ? typeof import('app1/User') :any;
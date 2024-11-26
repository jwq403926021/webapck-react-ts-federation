
    export type RemoteKeys = 'common/utils';
    type PackageType<T> = T extends 'common/utils' ? typeof import('common/utils') :any;
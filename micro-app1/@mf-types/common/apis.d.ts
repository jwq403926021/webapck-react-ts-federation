
    export type RemoteKeys = 'common/utils' | 'common/store';
    type PackageType<T> = T extends 'common/store' ? typeof import('common/store') :T extends 'common/utils' ? typeof import('common/utils') :any;
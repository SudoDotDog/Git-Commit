/**
 * @author WMXPY
 * @namespace Commit
 * @description Declare
 */

export type GitCommitPatternType = {

    readonly deliver: string;
    readonly description?: string;
};

export type GitCommitPatternModule = {

    readonly name: string;
    readonly description?: string;
};

export type GitCommitPatternRecord = {

    readonly allowWorkInProgress: boolean;
    readonly types: GitCommitPatternType[];
    readonly modules: GitCommitPatternModule[];
};

/**
 * @author WMXPY
 * @namespace Commit
 * @description Declare
 */

export type GitCommitInfo = {

    readonly type: string;
    readonly modules: string[];
    readonly subject: string;

    readonly explanation?: string[];
    readonly resolve?: string;
};

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

    readonly typeFormat: "double-colon"
    | "brackets"
    | "parentheses";

    readonly types: GitCommitPatternType[];
    readonly modules: GitCommitPatternModule[];
};

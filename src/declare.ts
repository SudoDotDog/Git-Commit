/**
 * @author WMXPY
 * @namespace Commit
 * @description Declare
 */

export type GitCommitInfo = {

    readonly type: string;
    readonly modules: string[];
    readonly subject: string;

    readonly explanations?: string[];
    readonly resolves?: string[];
};

export type GitCommitResult = {

    readonly message: string;
    readonly body?: string;
};

export type GitCommitPatternType = {

    readonly deliver: string;
    readonly description?: string;
};

export type GitCommitPatternModule = {

    readonly name: string;
    readonly description?: string;
};

export type GitCommitTypeFormat = "double-colon"
    | "brackets"
    | "parentheses";

export type GitCommitPatternRecord = {

    readonly allowWorkInProgress: boolean;

    readonly typeFormat: GitCommitTypeFormat;

    readonly types: GitCommitPatternType[];
    readonly modules: GitCommitPatternModule[];
};

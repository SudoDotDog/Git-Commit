/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Builder
 */

import { GitCommitPattern } from "./commit-pattern";

export class GitCommitBuilder {

    public static create(): GitCommitBuilder {

        return new GitCommitBuilder();
    }

    private readonly _pattern: GitCommitPattern;

    private constructor(pattern: GitCommitPattern) {

        this._pattern = pattern;
    }
}

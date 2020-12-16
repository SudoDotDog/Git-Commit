/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Builder
 */

import { GitCommitPattern } from "./commit-pattern";

export class GitCommitBuilder {

    public static withDefaultPattern(): GitCommitBuilder {

        return GitCommitBuilder.withPattern(GitCommitPattern.default());
    }

    public static withPattern(pattern: GitCommitPattern): GitCommitBuilder {

        return new GitCommitBuilder(pattern);
    }

    private readonly _pattern: GitCommitPattern;

    private constructor(pattern: GitCommitPattern) {

        this._pattern = pattern;
    }
}

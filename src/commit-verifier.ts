/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Verifier
 */

import { GitCommitPattern } from "./commit-pattern";

export class GitCommitVerifier {

    public static withDefaultPattern(): GitCommitVerifier {

        return GitCommitVerifier.withPattern(GitCommitPattern.default());
    }

    public static withPattern(pattern: GitCommitPattern): GitCommitVerifier {

        return new GitCommitVerifier(pattern);
    }

    private readonly _pattern: GitCommitPattern;

    private constructor(pattern: GitCommitPattern) {

        this._pattern = pattern;
    }
}

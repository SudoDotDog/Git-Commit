/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Builder
 */

import { GitCommitPattern } from "./commit-pattern";
import { GitCommitInfo, GitCommitResult } from "./declare";

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

    public buildCommit(info: GitCommitInfo): GitCommitResult {

        switch (this._pattern.typeFormat) {

            case 'double-colon':
                return this._buildDoubleColonCommit(info);
            case 'brackets':
                return this._buildBracketsCommit(info);
            case 'parentheses':
                return this._buildParenthesesCommit(info);
        }

        throw new Error(`[Git-Commit] Unknown type format: "${this._pattern.typeFormat as any}"`);
    }

    private _buildDoubleColonCommit(info: GitCommitInfo): GitCommitResult {

        return {
            commit: info.subject,
            body: info.subject,
        };
    }

    private _buildBracketsCommit(info: GitCommitInfo): GitCommitResult {

        return {
            commit: info.subject,
            body: info.subject,
        };
    }

    private _buildParenthesesCommit(info: GitCommitInfo): GitCommitResult {

        return {
            commit: info.subject,
            body: info.subject,
        };
    }
}

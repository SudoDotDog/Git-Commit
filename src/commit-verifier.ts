/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Verifier
 */

import { GitCommitPattern } from "./commit-pattern";
import { GitCommitResult, GitCommitTypeFormat } from "./declare";
import { verifyBracketsCommitMessage } from "./verify/brackets";
import { verifyDoubleColonCommitMessage } from "./verify/double-colon";
import { verifyParenthesesCommitMessage } from "./verify/parentheses";

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

    public verifyCommit(commit: GitCommitResult): boolean {

        return this._verifyCommitMessage(commit.message);
    }

    private _verifyCommitMessage(message: string): boolean {

        const parsedFormat: string | GitCommitTypeFormat = this._pattern.typeFormat as any;

        switch (parsedFormat) {

            case 'double-colon':
                return verifyDoubleColonCommitMessage(this._pattern, message);
            case 'brackets':
                return verifyBracketsCommitMessage(this._pattern, message);
            case 'parentheses':
                return verifyParenthesesCommitMessage(this._pattern, message);
        }

        return false;
    }
}

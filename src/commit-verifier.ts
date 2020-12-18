/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Verifier
 */

import { GitCommitPattern } from "./commit-pattern";
import { GitCommitTypeFormat } from "./declare";

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

    private _verifyCommitMessage(message: string): boolean {

        const parsedFormat: string | GitCommitTypeFormat = this._pattern.typeFormat as any;

        switch (parsedFormat) {

            case 'double-colon':
                return this._verifyDoubleColonCommitMessage(message);
            // case 'brackets':
            //     return this._buildBracketsCommitMessage(info);
            // case 'parentheses':
            //     return this._buildParenthesesCommitMessage(info);
        }

        return false;
    }

    private _verifyDoubleColonCommitMessage(message: string): boolean {

        const type: string | undefined = message.match(/[^:(]+/g)[0];

        if (!type
            || !this._pattern.verifyType(type)) {
            return false;
        }

        const typeRemoved: string = type.substring(type.length);

        statement: if (typeRemoved.substring(0, 1) === ':') {
            if (typeRemoved.substring(1, 2) === ' '
                && typeRemoved.substring(1, 2) !== ' ') {
                break statement;
            }
            return false;
        } else if (typeRemoved.substring(0, 1) === '(') {

            const rightIndex: number = typeRemoved.indexOf(')');

            const innerContent: string = typeRemoved.substring(1, rightIndex);

            if (innerContent === '*') {
                break statement;
            }

            const splited: string[] = innerContent.split(',');

            if (splited.length === 0) {
                return false;
            }

            for (const module of splited) {
                if (!this._pattern.verifyModule(module)) {
                    return false;
                }
            }

            const modulesRemoved = typeRemoved.substring(rightIndex);

            if (modulesRemoved.substring(0, 1) === ':') {
                if (typeRemoved.substring(1, 2) === ' '
                    && typeRemoved.substring(1, 2) !== ' ') {
                    break statement;
                }
                return false;
            } else {
                return false;
            }
        } else {
            return false;
        }

        return true;
    }
}

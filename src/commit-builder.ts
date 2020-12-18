/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Builder
 */

import { GitCommitPattern } from "./commit-pattern";
import { GitCommitInfo, GitCommitResult, GitCommitTypeFormat } from "./declare";

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

        return {
            message: this._buildCommitMessage(info),
            body: this._buildCommitBody(info),
        };
    }

    private _buildCommitMessage(info: GitCommitInfo): string {

        const parsedFormat: string | GitCommitTypeFormat = this._pattern.typeFormat as any;

        switch (parsedFormat) {

            case 'double-colon':
                return this._buildDoubleColonCommitMessage(info);
            case 'brackets':
                return this._buildBracketsCommitMessage(info);
            case 'parentheses':
                return this._buildParenthesesCommitMessage(info);
        }

        throw new Error(`[Git-Commit] Unknown type format: "${this._pattern.typeFormat as any}"`);
    }

    private _buildCommitBody(info: GitCommitInfo): string | undefined {

        if (!Array.isArray(info.explanations)
            && !Array.isArray(info.resolves)) {
            return undefined;
        }

        const lines: string[] = [];

        if (Array.isArray(info.explanations)
            && info.explanations.length > 0) {
            for (let i = 0; i < info.explanations.length; i++) {
                lines.push(`${i + 1}. ${info.explanations[i]}`);
            }

            lines.push('', '');
        }

        if (Array.isArray(info.resolves)
            && info.resolves.length > 0) {

            lines.push(`resolves: ${info.resolves.join(', ')}`);
        }

        return lines.join('\n');
    }

    private _buildDoubleColonCommitMessage(info: GitCommitInfo): string {

        return `${info.type}(${this._buildModule(info)}): ${info.subject}`;
    }

    private _buildBracketsCommitMessage(info: GitCommitInfo): string {

        return `[${info.type} - ${this._buildModule(info)}] ${info.subject}`;
    }

    private _buildParenthesesCommitMessage(info: GitCommitInfo): string {

        return `(${info.type} - ${this._buildModule(info)}) ${info.subject}`;
    }

    private _buildModule(info: GitCommitInfo): string {

        if (!Array.isArray(info.modules)) {
            return '*';
        }

        if (info.modules.length === 0) {
            return '*';
        }

        return info.modules.join(',');
    }
}

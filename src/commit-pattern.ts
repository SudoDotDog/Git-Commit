/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Pattern
 */

import { GitCommitPatternModule, GitCommitPatternRecord, GitCommitPatternType } from "./declare";

export class GitCommitPattern {

    public static empty(): GitCommitPattern {

        return new GitCommitPattern({
            allowWorkInProgress: true,
            types: [],
            modules: [],
        });
    }

    public static fromRecord(record: GitCommitPatternRecord): GitCommitPattern {

        return new GitCommitPattern(record);
    }

    private _allowWorkInProgress: boolean;

    private readonly types: Map<string, GitCommitPatternType>;
    private readonly modules: Map<string, GitCommitPatternModule>;

    private constructor(record: GitCommitPatternRecord) {

        this._allowWorkInProgress = record.allowWorkInProgress;

        this.types = new Map<string, GitCommitPatternType>();
        this.modules = new Map<string, GitCommitPatternModule>();
    }

    public enableWorkInProgress(): this {

        this._allowWorkInProgress = true;
        return this;
    }

    public disableWorkInProgress(): this {

        this._allowWorkInProgress = false;
        return this;
    }
}

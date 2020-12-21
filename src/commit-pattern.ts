/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Pattern
 */

import { GitCommitPatternModule, GitCommitPatternRecord, GitCommitPatternType, GitCommitTypeFormat } from "./declare";
import { DefaultGitCommitPatternRecord, EmptyGitCommitPatternRecord } from "./default";

export class GitCommitPattern {

    public static empty(): GitCommitPattern {

        return GitCommitPattern.fromRecord(EmptyGitCommitPatternRecord);
    }

    public static default(): GitCommitPattern {

        return GitCommitPattern.fromRecord(DefaultGitCommitPatternRecord);
    }

    public static fromRecord(record: GitCommitPatternRecord): GitCommitPattern {

        return new GitCommitPattern(record);
    }


    private _allowWorkInProgress: boolean;

    private _typeFormat: GitCommitTypeFormat;

    private readonly _types: Map<string, GitCommitPatternType>;
    private readonly _modules: Map<string, GitCommitPatternModule>;

    private constructor(record: GitCommitPatternRecord) {

        this._allowWorkInProgress = record.allowWorkInProgress;
        this._typeFormat = record.typeFormat;

        this._types = new Map<string, GitCommitPatternType>();
        this._modules = new Map<string, GitCommitPatternModule>();

        this.loadTypeArray(record.types);
        this.loadModuleArray(record.modules);
    }

    public get allowWorkInProgress(): boolean {
        return this._allowWorkInProgress;
    }
    public get typeFormat(): GitCommitTypeFormat {
        return this._typeFormat;
    }

    public enableWorkInProgress(): this {

        this._allowWorkInProgress = true;
        return this;
    }

    public disableWorkInProgress(): this {

        this._allowWorkInProgress = false;
        return this;
    }

    public setTypeFormat(format: GitCommitTypeFormat): this {

        this._typeFormat = format;
        return this;
    }

    public addType(type: GitCommitPatternType): this {

        if (this._types.has(type.deliver)) {
            throw new Error(`[Git-Commit] Duplicated type: "${type.deliver}"`);
        }
        this._types.set(type.deliver, type);
        return this;
    }

    public addModule(module: GitCommitPatternModule): this {

        if (this._modules.has(module.name)) {
            throw new Error(`[Git-Commit] Duplicated module: "${module.name}"`);
        }
        this._modules.set(module.name, module);
        return this;
    }

    public verifyType(deliver: string): boolean {

        return this._types.has(deliver);
    }

    public verifyModule(moduleName: string): boolean {

        return this._modules.has(moduleName);
    }

    public loadTypeArray(types: GitCommitPatternType[]): this {

        for (const type of types) {
            this.addType(type);
        }
        return this;
    }

    public loadModuleArray(modules: GitCommitPatternModule[]): this {

        for (const module of modules) {
            this.addModule(module);
        }
        return this;
    }

    public getRecord(): GitCommitPatternRecord {

        return {
            allowWorkInProgress: this._allowWorkInProgress,
            typeFormat: this._typeFormat,
            types: this.getTypeArray(),
            modules: this.getModuleArray(),
        };
    }

    public getTypeArray(): GitCommitPatternType[] {

        const result: GitCommitPatternType[] = [];
        result.push(...this._types.values());
        return result;
    }

    public getModuleArray(): GitCommitPatternModule[] {

        const result: GitCommitPatternModule[] = [];
        result.push(...this._modules.values());
        return result;
    }
}

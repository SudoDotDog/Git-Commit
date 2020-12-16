/**
 * @author WMXPY
 * @namespace Commit
 * @description Default
 */

import { GitCommitPatternRecord } from "./declare";

export const EmptyGitCommitPatternRecord: GitCommitPatternRecord = {

    allowWorkInProgress: true,
    typeFormat: 'double-colon',
    types: [],
    modules: [],
};

export const DefaultGitCommitPatternRecord: GitCommitPatternRecord = {

    allowWorkInProgress: true,
    typeFormat: 'double-colon',
    types: [
        {
            deliver: 'feature',
            description: 'feature changes',
        },
        {
            deliver: 'fix',
            description: 'bug fix changes',
        },
        {
            deliver: 'refactor',
            description: 'code refactor changes',
        },
        {
            deliver: 'improvement',
            description: 'code improvement changes',
        },
        {
            deliver: 'performance',
            description: 'performance improvement changes',
        },
        {
            deliver: 'log',
            description: 'log adding, removing only changes',
        },
        {
            deliver: 'document',
            description: 'document only adding removing changes',
        },
        {
            deliver: 'config',
            description: 'config changes',
        },
        {
            deliver: 'release',
            description: 'version release',
        },
        {
            deliver: 'chore',
            description: 'chore changes',
        },
        {
            deliver: 'style',
            description: 'code style changes',
        },
        {
            deliver: 'test',
            description: 'test changes',
        },
    ],
    modules: [],
};

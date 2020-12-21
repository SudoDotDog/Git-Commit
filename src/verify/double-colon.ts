/**
 * @author WMXPY
 * @namespace Verify
 * @description Double Colon
 */

import { GitCommitPattern } from "../commit-pattern";

export const verifyDoubleColonCommitMessage = (pattern: GitCommitPattern, message: string): boolean => {

    const matchResult: string[] | null = message.match(/[^:(]+/g);

    if (!matchResult) {
        return false;
    }

    const type: string | undefined = matchResult[0];

    if (!type
        || !pattern.verifyType(type)) {
        return false;
    }

    const typeRemoved: string = message.substring(type.length);

    statement: if (typeRemoved.substring(0, 1) === ':') {

        if (typeRemoved.substring(1, 2) === ' ') {
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
            if (!pattern.verifyModule(module)) {
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
};

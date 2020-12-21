/**
 * @author WMXPY
 * @namespace Verify
 * @description Brackets
 */

import { GitCommitPattern } from "../commit-pattern";

export const verifyBracketsCommitMessage = (pattern: GitCommitPattern, message: string): boolean => {

    if (message[0] !== '[') {
        return false;
    }

    const rightBracketIndex: number = message.indexOf(']');
    if (rightBracketIndex === -1) {
        return false;
    }

    const typeAndModules: string = message.substring(1, rightBracketIndex);
    const splitedTypeAndModules: string[] = typeAndModules.split('-');

    statement: if (splitedTypeAndModules.length === 1) {

        const type: string = splitedTypeAndModules[0].trim();
        if (!pattern.verifyType(type)) {
            return false;
        }
    } else {

        const type: string = splitedTypeAndModules[0].trim();
        if (!pattern.verifyType(type)) {
            return false;
        }

        const modules: string = splitedTypeAndModules[1].trim();
        if (modules === '*') {
            break statement;
        }

        const splited: string[] = modules.split(',');
        for (const module of splited) {

            const trimmedModule: string = module.trim();
            if (!pattern.verifyModule(trimmedModule)) {
                return false;
            }
        }
    }

    const description: string = message.substring(rightBracketIndex + 1);
    if (description[0] !== ' ') {
        return false;
    }

    const descriptionTrimmed: string = description.substring(1);

    return descriptionTrimmed.length >= 1;
};

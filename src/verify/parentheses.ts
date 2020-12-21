/**
 * @author WMXPY
 * @namespace Verify
 * @description Parentheses
 */

import { GitCommitPattern } from "../commit-pattern";

export const verifyParenthesesCommitMessage = (pattern: GitCommitPattern, message: string): boolean => {

    if (message[0] !== '(') {
        return false;
    }

    const rightParenthesisIndex: number = message.indexOf(')');
    if (rightParenthesisIndex === -1) {
        return false;
    }

    const typeAndModules: string = message.substring(1, rightParenthesisIndex);
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

    const description: string = message.substring(rightParenthesisIndex + 1);
    if (description[0] !== ' ') {
        return false;
    }

    const descriptionTrimmed: string = description.substring(1);

    return descriptionTrimmed.length >= 1;
};

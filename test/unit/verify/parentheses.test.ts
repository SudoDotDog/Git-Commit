/**
 * @author WMXPY
 * @namespace Verify
 * @description Parentheses
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { GitCommitPattern } from "../../../src/commit-pattern";
import { verifyParenthesesCommitMessage } from "../../../src/verify/parentheses";

describe('Given [Parentheses-Commit-Verify] functions', (): void => {

    const chance: Chance.Chance = new Chance('verify-parentheses-commit-verify');

    const pattern: GitCommitPattern = GitCommitPattern.default();
    pattern.setTypeFormat('parentheses');

    it('should be able to verify commit without module', (): void => {

        const commitMessage: string = `(chore) ${chance.sentence()}`;

        const result: boolean = verifyParenthesesCommitMessage(pattern, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to ensure content', (): void => {

        const commitMessage: string = `(chore)`;

        const result: boolean = verifyParenthesesCommitMessage(pattern, commitMessage);

        expect(result).to.be.false;
    });

    it('should be able to ensure content with space', (): void => {

        const commitMessage: string = `(chore) `;

        const result: boolean = verifyParenthesesCommitMessage(pattern, commitMessage);

        expect(result).to.be.false;
    });

    it('should be able to verify commit with module wildcard', (): void => {

        const commitMessage: string = `(chore - *) ${chance.sentence()}`;

        const result: boolean = verifyParenthesesCommitMessage(pattern, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to verify commit with module named', (): void => {

        const commitMessage: string = `(chore - test) ${chance.sentence()}`;
        const patternWithScope: GitCommitPattern = GitCommitPattern.default();
        patternWithScope.setTypeFormat('brackets');
        patternWithScope.addModule({
            name: 'test',
        });

        const result: boolean = verifyParenthesesCommitMessage(patternWithScope, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to verify commit with module named - sad path', (): void => {

        const commitMessage: string = `(chore - test) ${chance.sentence()}`;

        const result: boolean = verifyParenthesesCommitMessage(pattern, commitMessage);

        expect(result).to.be.false;
    });
});

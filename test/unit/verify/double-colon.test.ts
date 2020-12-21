/**
 * @author WMXPY
 * @namespace Verify
 * @description Double Colon
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { GitCommitPattern } from "../../../src/commit-pattern";
import { verifyDoubleColonCommitMessage } from "../../../src/verify/double-colon";

describe('Given [Double-Colon-Commit-Verify] functions', (): void => {

    const chance: Chance.Chance = new Chance('verify-double-colon-commit-verify');

    const pattern: GitCommitPattern = GitCommitPattern.default();

    it('should be able to verify commit without module', (): void => {

        const commitMessage: string = `chore: ${chance.sentence()}`;

        const result: boolean = verifyDoubleColonCommitMessage(pattern, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to ensure content', (): void => {

        const commitMessage: string = `chore:`;

        const result: boolean = verifyDoubleColonCommitMessage(pattern, commitMessage);

        expect(result).to.be.false;
    });

    it('should be able to ensure content with space', (): void => {

        const commitMessage: string = `chore: `;

        const result: boolean = verifyDoubleColonCommitMessage(pattern, commitMessage);

        expect(result).to.be.false;
    });

    it('should be able to verify commit with module wildcard', (): void => {

        const commitMessage: string = `chore(*): ${chance.sentence()}`;

        const result: boolean = verifyDoubleColonCommitMessage(pattern, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to verify commit with module named - happy path', (): void => {

        const commitMessage: string = `chore(test): ${chance.sentence()}`;
        const patternWithScope: GitCommitPattern = GitCommitPattern.default();
        patternWithScope.addModule({
            name: 'test',
        });

        const result: boolean = verifyDoubleColonCommitMessage(patternWithScope, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to verify commit with module named - sad path', (): void => {

        const commitMessage: string = `chore(test): ${chance.sentence()}`;

        const result: boolean = verifyDoubleColonCommitMessage(pattern, commitMessage);

        expect(result).to.be.false;
    });
});

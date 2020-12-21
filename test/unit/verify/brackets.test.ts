/**
 * @author WMXPY
 * @namespace Verify
 * @description Brackets
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { GitCommitPattern } from "../../../src/commit-pattern";
import { verifyBracketsCommitMessage } from "../../../src/verify/brackets";

describe('Given [Brackets-Commit-Verify] functions', (): void => {

    const chance: Chance.Chance = new Chance('verify-brackets-commit-verify');

    const pattern: GitCommitPattern = GitCommitPattern.default();
    pattern.setTypeFormat('brackets');

    it('should be able to verify commit without module', (): void => {

        const commitMessage: string = `[chore] ${chance.sentence()}`;

        const result: boolean = verifyBracketsCommitMessage(pattern, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to verify commit with module wildcard', (): void => {

        const commitMessage: string = `[chore - *] ${chance.sentence()}`;

        const result: boolean = verifyBracketsCommitMessage(pattern, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to verify commit with module named', (): void => {

        const commitMessage: string = `[chore - test] ${chance.sentence()}`;
        const patternWithScope: GitCommitPattern = GitCommitPattern.default();
        patternWithScope.setTypeFormat('brackets');
        patternWithScope.addModule({
            name: 'test',
        });

        const result: boolean = verifyBracketsCommitMessage(patternWithScope, commitMessage);

        expect(result).to.be.true;
    });

    it('should be able to verify commit with module named - sad path', (): void => {

        const commitMessage: string = `[chore - test] ${chance.sentence()}`;

        const result: boolean = verifyBracketsCommitMessage(pattern, commitMessage);

        expect(result).to.be.false;
    });
});

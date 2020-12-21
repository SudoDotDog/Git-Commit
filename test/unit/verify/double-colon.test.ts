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

describe('Given [Double-Colon-Commit-Verify] Functions', (): void => {

    const chance: Chance.Chance = new Chance('verify-double-colon-commit-verify');

    const pattern: GitCommitPattern = GitCommitPattern.default();

    it('should be able to verify commit', (): void => {

        const commitMessage: string = `chore: ${chance.sentence()}`;

        const result: boolean = verifyDoubleColonCommitMessage(pattern, commitMessage);

        expect(result).to.be.true;
    });
});

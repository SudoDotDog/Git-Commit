/**
 * @author WMXPY
 * @namespace Commit
 * @description Commit Pattern
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";
import { GitCommitPattern } from "../../src/commit-pattern";

describe('Given {GitCommitPattern} class', (): void => {

    const chance: Chance.Chance = new Chance('commit-pattern');

    it('should be able to instantiate', (): void => {

        const pattern: GitCommitPattern = GitCommitPattern.default();

        expect(pattern).to.be.instanceOf(GitCommitPattern);
    });

    it('should be able to verify module', (): void => {

        const moduleName: string = chance.string();

        const pattern: GitCommitPattern = GitCommitPattern.default();
        pattern.addModule({
            name: moduleName,
        });

        expect(pattern.verifyModule(moduleName)).to.be.true;
    });
});

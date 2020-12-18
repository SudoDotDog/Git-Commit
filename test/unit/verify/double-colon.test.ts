/**
 * @author WMXPY
 * @namespace Verify
 * @description Double Colon
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";

describe('Given [Double-Colon-Commit-Verify] Functions', (): void => {

    const chance: Chance.Chance = new Chance('placeholder');

    it('placeholder', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});

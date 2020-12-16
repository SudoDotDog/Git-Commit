/**
 * @author WMXPY
 * @namespace Commit
 * @description Placeholder
 * @override Unit
 */

import { expect } from "chai";
import * as Chance from "chance";

describe('Placeholder', (): void => {

    const chance: Chance.Chance = new Chance('placeholder');

    it('placeholder', (): void => {

        expect(chance.string()).to.be.not.equal(chance.string());
    });
});

import { expect, assert } from 'chai';
import { CashHandlerMulti } from '../src/cashHandlerMulti';
import { MissionWithFeels } from './mokData';


describe('', () => {
  let cashHandlerMulti: CashHandlerMulti;


  it('create cashHandler from Multi ', (done) => {
    cashHandlerMulti = new CashHandlerMulti();
    done();
  });


  it('Get mission and expend the entities fields', () => {
    return cashHandlerMulti.getFieldsOfMission(MissionWithFeels.mission0, MissionWithFeels.max, MissionWithFeels.min)
        .then((res) => {
          console.log(res);
          // res.forEatch((q) => {
          //   console.log('\n');
          // });
          // expect(res).to.deep.equal(query2Answer);
        })
        .catch(notOk);
  });
});


function notOk(err) {
  assert.isNotOk(err, 'Promise error');
}
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import noop from '../helpers/noop';

import {
  cancel
} from '../../../frontend/src/containers/Subscriptions';

chai.use(spies);

describe('containers/Subscriptions', () => {

  describe('cancel', () => {

    it('calls window.confirm', (done) => {
      const props = {
        notify: chai.spy(noop),
        cancelSubscription: () => Promise.reject({ message: 'canceling failed' }),
        token: 'token_abc'
      };

      const spy = chai.spy(window, 'confirm');

      cancel.call({props})
      expect(spy).to.have.been.called;
      done();
    });

    it('notifies if it fails', (done) => {
      const props = {
        notify: chai.spy(noop),
        cancelSubscription: () => Promise.reject({ message: 'canceling failed' }),
        token: 'token_abc'
      };

      window.confirm = () => true;

      cancel.call({props})
        .then(() => {
          expect(props.notify).to.have.been.called.with('error');
          done();
        });
    });

    it('notifies if it is successful', (done) => {
      const props = {
        notify: chai.spy(noop),
        cancelSubscription: noop,
        token: 'token_abc'
      };

      window.confirm = () => true;

      cancel.call({props})
        .then(() => {
          expect(props.notify).to.have.been.called.with('success');
          done();
        });
    });

  });

});

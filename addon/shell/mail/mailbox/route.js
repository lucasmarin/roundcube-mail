import Ember from 'ember';

export default Ember.Route.extend({
  /**
   * @param {params.mailbox_name} The name of the mailbox ('Inbox', 'Archives')
   */
  model(params) {
    var mailboxName = params.mailbox_name,
        mailboxes = this.modelFor('shell.mail');

    return new Ember.RSVP.Promise(function (resolve, reject) {
      var mailbox = _.find(mailboxes, _.matchesProperty('name', mailboxName));
      if (!mailbox) {
        console.error('No mailbox by that name found.');
        return reject();
      }

      // TODO: Need design input before we add ways to fetch more messages
      mailbox.getMessageList({
        sort: 'date desc',
        collapseThreads: true,
        fetchMessages: true,
        limit: 50
      }).then(function (response) {
        resolve(response[1]);
      }, reject);
    });
  }
});
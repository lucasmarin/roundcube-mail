import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.modelFor('shell').getMailboxes();
  },

  redirect: function(model, transition) {
    if (transition.targetName === 'shell.mail.index') {
      var inboxName = _.result(_.find(model, function(mailbox) {
        return mailbox.role && mailbox.role.value === 'inbox';
      }), 'name');

      // If a mailbox with the role 'inbox' is found, redirect to it by default
      if (inboxName) {
        this.transitionTo('shell.mail.mailbox', inboxName);
      }
    }
  },

  actions: {
    willTransition: function (transition) {
      this.redirect(this.context, transition);
    }
  }
});
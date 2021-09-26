import Mail from '#lib/Mailman.js';

class UpdatedUserEmail {
  get key() {
    return 'UpdatedUserEmailMail';
  }

  async handle({ user }) {
    await Mail.sendEmail({
      to: `${user.name} <${user.email}>`,
      subject: `${user.name} seu email foi atualizado!`,
      template: 'UpdatedUserEmail',
      context: {
        user_name: user.name,
      },
    });
  }
}

export default new UpdatedUserEmail();

import Mail from '#lib/Mailman.js';

class UpdatedUserPassword {
  get key() {
    return 'UpdatedUserPasswordMail';
  }

  async handle({ user }) {
    await Mail.sendEmail({
      to: `${user.name} <${user.email}>`,
      subject: `${user.name} sua senha foi atualizada!`,
      template: 'UpdatedUserPassword',
      context: {
        user_name: user.name,
      },
    });
  }
}

export default new UpdatedUserPassword();

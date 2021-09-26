import Mail from '#lib/Mailman.js';

class DeletedUser {
  get key() {
    return 'DeletedUserMail';
  }

  async handle({ data }) {
    await Mail.sendEmail({
      to: `${data.name} <${data.email}>`,
      subject: `${data.name} sua conta foi deletada!`,
      template: 'DeletedUser',
      context: {
        user_name: data.name,
      },
    });
  }
}

export default new DeletedUser();

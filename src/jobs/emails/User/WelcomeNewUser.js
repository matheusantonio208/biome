import Mail from '#lib/Mailman.js';

class WelcomeNewUser {
  get key() {
    return 'WelcomeNewUserMail';
  }

  async handle({ data }) {
    await Mail.sendEmail({
      to: `${data.name} <${data.email}>`,
      subject: `Bem vindo ${data.name}!`,
      template: 'WelcomeNewUser',
      context: {
        user_name: data.name,
      },
    });
  }
}

export default new WelcomeNewUser();

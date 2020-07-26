interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'brunoc.ambrozio@gmail.com', // E-mails configurados dentro do AWS
      name: 'Bruno Ambrózio',
    },
  },
} as IMailConfig;

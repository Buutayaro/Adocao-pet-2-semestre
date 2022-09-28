import nodemailer from 'nodemailer';
import mailConfig from '../config/mail.js';

async function createNewUser(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Conta criada no Adote Pets',
      text: `Conta criada com sucesso.\n\nAcesse o aplicativo para gerenciar o cadastro de pets.`,
      html: `<h1>Conta criada com sucesso.</h1><p>Acesse o aplicativo para gerenciar o cadastro de pets.</p>`,
    });

    console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    throw new Error(err);
  }
}

async function createNewPet(to) {
  try {
    const config = await mailConfig();

    const transporter = nodemailer.createTransport(config);

    const info = await transporter.sendMail({
      from: 'noreplay@email.com',
      to,
      subject: 'Pet cadastrado com Sucesso',
      text: `Pet cadastrado com sucesso em nosso sistema.\n\nAgora todos irão poder visualizar o novo pet que está disponível para adoção.`,
      html: `<h1>Pet cadastrado com sucesso em nosso sistema.</h1><p>Agora todos irão poder visualizar o novo pet que está disponível para adoção.</p>`,
    });

    console.log(`Send email: ${nodemailer.getTestMessageUrl(info)}`);
  } catch (err) {
    throw new Error(err);
  }
}

export default { createNewUser, createNewPet };
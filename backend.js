const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// Route API d'abord
app.post('/api/reservation', async (req, res) => {
  try {
    const { nom, prenom, parcours, dateVol, telephone, email, dateNaissance, numeroPasseport, dateExpirationPasseport } = req.body;

    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.ethereal.email',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipient = process.env.MAIL_RECIPIENT || email;

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #0a2d6e, #1a4fa8); padding: 24px; text-align: center;">
          <h1 style="color: #f5a623; margin: 0; font-size: 1.5rem; letter-spacing: 2px;">SAPHYR TOURS AFRICA</h1>
          <p style="color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 0.9rem;">Nouvelle Reservation de Vol</p>
        </div>

        <div style="padding: 28px 32px;">
          <h2 style="color: #0a2d6e; border-bottom: 2px solid #f5a623; padding-bottom: 8px; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px;">
            Informations personnelles
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #666; width: 40%;">Nom</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${nom}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Prenom</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${prenom}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Date de naissance</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${dateNaissance}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${email}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Telephone</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${telephone}</td></tr>
          </table>

          <h2 style="color: #0a2d6e; border-bottom: 2px solid #f5a623; padding-bottom: 8px; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px;">
            Documents de voyage
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #666; width: 40%;">Numero de passeport</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${numeroPasseport}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Date d'expiration</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${dateExpirationPasseport}</td></tr>
          </table>

          <h2 style="color: #0a2d6e; border-bottom: 2px solid #f5a623; padding-bottom: 8px; font-size: 1rem; text-transform: uppercase; letter-spacing: 1px;">
            Details du vol
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr><td style="padding: 8px 0; color: #666; width: 40%;">Parcours</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${parcours}</td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Date du vol</td><td style="padding: 8px 0; font-weight: 600; color: #222;">${dateVol}</td></tr>
          </table>
        </div>

        <div style="background: #f8f9ff; padding: 16px 32px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="color: #888; font-size: 0.8rem; margin: 0;">
            Saphyr Tours Africa &mdash; Ce message a ete genere automatiquement depuis le formulaire de reservation.
          </p>
        </div>
      </div>
    `;

    console.log("Tentative d'envoi d'email avec :");
    console.log("- SMTP_HOST:", process.env.SMTP_HOST);
    console.log("- SMTP_PORT:", process.env.SMTP_PORT);
    console.log("- SMTP_USER:", process.env.SMTP_USER);
    console.log("- MAIL_RECIPIENT:", recipient);

    await transport.sendMail({
      from: `"Saphyr Tours" <${process.env.SMTP_USER || 'no-reply@saphyr.com'}>`,
      to: recipient,
      subject: `Nouvelle reservation - ${prenom} ${nom} | ${parcours}`,
      html,
    });

    console.log("Email envoyé avec succès !");
    res.status(201).json({ success: true, message: 'Reservation envoyee par email avec succes' });
  } catch (err) {
    console.error("Erreur détaillée :", err);
    res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email. Veuillez reessayer.', details: err.message });
  }
});

// Ensuite, servir le frontend static
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Toutes les autres routes renvoient index.html (pour le routing SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur en cours d'exécution sur http://0.0.0.0:${PORT}`);
});

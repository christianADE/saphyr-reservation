# SAPHYR TOURS AFRICA - Système de Réservation de Vol

Un système simple de réservation de vol avec notification par email.

## Fonctionnalités

- Formulaire de réservation avec toutes les informations nécessaires
- Envoi d'email de confirmation
- Design responsive
- Déploiement simplifié avec Docker

## Développement local

### Prérequis

- Node.js 18+
- npm

### Installation

1. Installer les dépendances :
```bash
npm install
cd frontend
npm install
cd ..
```

2. Configurer les variables d'environnement :
Copier `.env.example` en `.env` et remplir les informations SMTP

3. Build le frontend :
```bash
cd frontend
npm run build
cd ..
```

4. Lancer le serveur :
```bash
npm run dev:backend
```

Le site sera accessible sur `http://localhost:80` (ou le port configuré dans `.env`)

## Déploiement avec Docker

### Prérequis

- Docker installé

### Instructions

1. Créez un fichier `.env` avec vos paramètres SMTP
2. Build l'image Docker :
```bash
docker build -t saphyr-reservation .
```
3. Lancez le conteneur :
```bash
docker run -d -p 80:80 --env-file .env --name saphyr-app saphyr-reservation
```

Le site sera accessible sur le port 80 de votre machine !

### Pour arrêter le conteneur :
```bash
docker stop saphyr-app
docker rm saphyr-app
```

## Configuration SMTP

### Pour tester gratuitement avec Ethereal
1. Allez sur [https://ethereal.email/](https://ethereal.email/)
2. Cliquez sur "Create Ethereal Account"
3. Copiez les informations SMTP affichées
4. Mettez-les dans votre fichier `.env`

Les emails envoyés seront visibles sur la page "Messages" de votre compte Ethereal !

### Pour un usage en production
Pour l'envoi d'email, configurez ces variables dans `.env` :
- `SMTP_HOST` : hôte SMTP (ex: `smtp.gmail.com`, `smtp.sendgrid.net`)
- `SMTP_PORT` : port SMTP (ex: `587`)
- `SMTP_USER` : votre email
- `SMTP_PASS` : votre mot de passe SMTP (pour Gmail, utilisez un "App Password")
- `MAIL_RECIPIENT` : email qui recevra les réservations

## Informations de contact

- Lomé, Togo : En face de UTB Avenou
- Abidjan, Côte d'Ivoire
- Téléphone : +228 9287 8585 / +228 9287 8484 / +225 05 76 80 08 08
- Email : contact@saphyrtours.africa

---
Développé par Christian

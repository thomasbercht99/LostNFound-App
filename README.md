# LostNFound-App

LostNFound est une application conçue et développée dans le cadre du cours DevMobile durant l'année académique 2023-2024 à la HEIG. 
LostNFound permet aux utilisateurs de signaler des objets trouvés au sein de la HEIG. Après s'être connectés, les utilisateurs accèdent à un feed des objets trouvés, enrichi de photos, informations de géolocalisation, descriptions et du nom de l'utilisateur qui a trouvé l'objet. Ils peuvent ainsi rechercher des objets perdus et entrer en contact avec la personne qui les a trouvés.

Nous soulignons l'importance du bon sens et de la bonne foi des utilisateurs pour utiliser cette API, car elle fonctionne sans vérification stricte de la propriété des objets perdus.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé [Node.js](https://nodejs.org/) et [npm](https://www.npmjs.com/) sur votre système.

## Installation

Suivez ces étapes pour configurer l'environnement de développement pour votre application Ionic.

1. **Installer Ionic CLI**
   
   Ouvrez un terminal et exécutez la commande suivante pour installer Ionic CLI globalement :
   ```bash
   npm install -g @ionic/cli
   ```

2. **Cloner le Répertoire**
   
   Clonez le répertoire de l'application sur votre machine locale :
   ```bash
   git clone https://lien_vers_votre_repo.git
   cd nom_du_dossier_cloné
   ```

3. **Installer les Dépendances**
   
   Dans le répertoire du projet, exécutez :
   ```bash
   npm install
   ```

## Configuration

1. **Configurer l'URL de l'API**

   Ouvrez le fichier `src/environments/environment.ts` et fournissez l'URL de votre API :
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'VOTRE_URL_API_ICI'
   };
   ```

   Remplacez `VOTRE_URL_API_ICI` par l'URL réelle de votre API.

## Lancement de l'Application

Pour lancer l'application sur un serveur de développement local, exécutez :

```bash
ionic serve
```

Cela démarrera l'application sur `http://localhost:8100`. Ouvrez cette URL dans votre navigateur pour voir l'application en action.

## Build et Déploiement

Pour générer un build de production, utilisez :

```bash
ionic build --prod
```

Suivez les instructions spécifiques de déploiement de votre plateforme cible pour déployer l'application.


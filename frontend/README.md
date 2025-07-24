# Projet de Scraping - France Travail

## 👥 Membres du Groupe
- Yannick COULIBALY
- Rufus Hilaire MOUAKASSA 
- Abondance KAZADI

## 📋 Description du Projet
Ce projet collecte et structure des données sur les startups françaises depuis https://www.francetravail.fr/. Il comprend :
- Un scraper Scrapy avec pipeline de traitement en temps réel
- Une base de données MongoDB pour le stockage
- Un backend FastAPI pour l'API
- Un frontend React.js & Vite pour la visualisation

## 🏗️ Architecture
\`\`\`
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Scrapy        │───▶│    MongoDB      │◀───│   Backend API   │
│   Scraper       │    │   Database      │    │   (FastAPI)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                               ┌─────────────────────┐
                                               │   Frontend          │
                                               │   (React.js + Vite) │  
                                               └─────────────────────│
\`\`\`

## 🚀 Installation et Exécution

### Prérequis
- Python 3.8\#43;
- MongoDB 4.4\#43;
- FastAPI 
### 1. Configuration de la Base de Données
\`\`\`bash
# Démarrer MongoDB
mongod --dbpath ./data/db
\`\`\`

### 2. Scraper Scrapy
\`\`\`bash
cd scraper
pip install -r requirements.txt
scrapy crawl startups
\`\`\`

### 3. Backend API
\`\`\`bash
cd backend
npm install
npm start
\`\`\`

### 4. Frontend React
\`\`\`bash
cd frontend
npm install
npm start
\`\`\`

## 📊 Données Collectées
- Nom de la startup
- Description
- Secteur d'activité
- Localisation
- Date de création
- Financement
- Équipe
- Technologies utilisées

## 🔧 Pipeline de Traitement
1. **Extraction** : Collecte des données depuis MyFrenchStartup
2. **Transformation** : Nettoyage et structuration
3. **Validation** : Vérification de la cohérence
4. **Sauvegarde** : Insertion immédiate en MongoDB

## 📁 Structure du Projet
\`\`\`
project/
├── scraper/           # Scrapy spider et pipelines
├── backend/           # API Node.js/Express
├── frontend/          # Interface React.js
├── data/             # Données exportées (CSV/JSON)
└── README.md         # Documentation
\`\`\`

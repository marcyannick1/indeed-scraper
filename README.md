# Projet de Scraping - France Travail

Scrapeur d'offres d'emploi sur candidat.francetravail.fr, avec API FastAPI et stockage MongoDB.
Permet de rechercher des offres selon un mot-clé et une localisation (département ou commune), puis de les afficher via
une API REST.

## 👥 Membres du Groupe

- **Yannick COULIBALY**
- **Rufus Hilaire MOUAKASSA**
- **Abondance KAZADI**

## 📁 Fonctionnalités

- ✅ Scraping automatisé d'offres d'emploi via Scrapy
- ✅ Extraction des détails d'annonce (titre, entreprise, lieu, salaire, type de contrat…)
- ✅ Nettoyage des données via pipelines (dates, sauts de lignes, espaces…)
- ✅ API REST FastAPI pour exposer les données
- ✅ Stockage dans MongoDB (local ou cloud)
- ✅ Interface frontend React/Vue.js pour visualiser les offres
- ✅ Script interactif pour lancer le scraping facilement

## 📂 Structure du Projet

```
jobs_scraper/
├── backend/                    # FastAPI backend
│   ├── config/
│   │   └── database.py
│   ├── models/
│   │   └── JobItem.py
│   ├── routes/
│   │   └── jobs.py
│   ├── main.py
│   ├── requirements.txt
│   └── .env
├── scraper/                    # Scrapy spider
│   ├── spiders/
│   │   └── jobs_spider.py
│   ├── pipelines.py
│   ├── items.py
│   ├── middlewares.py
│   ├── settings.py
│   ├── run_spider.py
│   ├── requirements.txt
│   └── .env
├── frontend/                   # Frontend React
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
└── README.md
```

## 🚀 Installation

### 1. Cloner le projet

```bash
git clone https://github.com/marcyannick1/jobs-scraper.git
cd jobs-scraper
```

### 2. Créer un environnement virtuel

```bash
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
```

### 3. Installer les dépendances backend

```bash
pip install -r backend/requirements.txt
pip install -r scraper/requirements.txt
```

### 4. Installer les dépendances frontend

```bash
cd frontend
npm install
cd ..
```

### 5. Configuration des variables d'environnement

Créer un fichier `.env` dans les dossiers `backend/` et `scraper/` :

**backend/.env**

```env
MONGO_URI=mongodb://localhost:27017/
MONGO_DATABASE=jobs_db
```

**scraper/.env**

```env
MONGO_URI=mongodb://localhost:27017/
MONGO_DATABASE=jobs_db
```

## 🕷️ Lancer le scraping

### Méthode interactive

Lance le script interactif depuis le dossier `scraper/` :

```bash
cd scraper
python run_spider.py
```

Puis saisir :

- **Mot-clé** (ex: `python`, `développeur`, `data`)
- **Code INSEE** du département ou de la commune (ex: `75D` pour Paris, `92050` pour Nanterre)

### Méthode en ligne de commande

```bash
cd scraper
scrapy crawl jobs_spider -a keyword="python" -a location="75D"
```

## 🖥️ Lancer l'API Backend

Depuis le dossier `backend/` :

```bash
cd backend
uvicorn main:app --reload
```

## 🌐 Lancer le Frontend

Depuis le dossier `frontend/` :

```bash
cd frontend
npm run dev
```

**Accès à l'interface :**

- 📍 [http://localhost:3000](http://localhost:3000) ou [http://localhost:5173](http://localhost:5173)

## 📦 Endpoints API

### **GET** `/jobs`

Récupère toutes les offres d'emploi

**Exemple de réponse :**

```json
[
  {
    "_id": "66bfcf4e5a3f4a6e9f1dca88",
    "title": "Développeur Python Back-End",
    "company": "LBESOFT",
    "location": {
      "postalCode": "75009",
      "city": "Paris",
      "region": "Île-de-France",
      "country": "FRANCE"
    },
    "contractType": "CDI",
    "salary": {
      "min": 38000.0,
      "max": 45000.0,
      "unit": "YEAR"
    },
    "description": "Nous recherchons un développeur Python expérimenté pour renforcer notre équipe backend...",
    "skills": [
      "Python",
      "Django",
      "REST API",
      "Git",
      "MongoDB"
    ],
    "experience": "3 ans",
    "publishDate": "2025-07-22T00:00:00",
    "url": "https://candidat.francetravail.fr/offres/recherche/detail/195MWHD",
    "companyInfo": {
      "size": "50 à 99 salariés",
      "description": "LBESOFT est une société spécialisée dans les solutions logicielles sur mesure.",
      "url": "https://www.lbesoft.fr"
    }
  }
]
```

### **GET** `/jobs/{job_id}`

Récupère une offre spécifique par son ID

## 🗃️ Structure des Données

Chaque offre d'emploi contient les champs suivants :

| Champ         | Type     | Description                      |
|---------------|----------|----------------------------------|
| `_id`         | String   | Identifiant unique MongoDB       |
| `title`       | String   | Titre du poste                   |
| `company`     | String   | Nom de l'entreprise              |
| `location`    | Object   | Informations de localisation     |
| `contractType` | String   | Type de contrat (CDI, CDD, etc.) |
| `salary`      | Object   | Fourchette de salaire            |
| `description` | String   | Description complète du poste    |
| `skills`      | Array    | Compétences requises             |
| `experience`  | String   | Expérience requises              |
| `publishDate` | DateTime | Date de publication              |
| `url`         | String   | URL de l'offre originale         |
| `companyInfo` | Object   | Informations sur l'entreprise    |

## 🛠️ Technologies Utilisées

### Backend

- **FastAPI** - Framework web moderne et rapide
- **MongoDB** - Base de données NoSQL
- **PyMongo** - Driver MongoDB pour Python

### Scraper

- **Scrapy** - Framework de scraping web
- **PyMongo** - Driver MongoDB pour Python

### Frontend

- **React/Vue.js** - Framework JavaScript
- **Axios** - Client HTTP
- **Tailwind** - Framework CSS

## 📋 TODO / Améliorations

- [ ] Ajout de filtres avancés (salaire, type de contrat)
- [ ] Système de notifications pour nouvelles offres
- [ ] Export des données (CSV, Excel)
- [ ] Interface d'administration
- [ ] Cache Redis pour améliorer les performances
- [ ] Dockerisation complète du projet
- [ ] CI/CD avec GitHub Actions
- [ ] Tests d'intégration
- [ ] Monitoring et logs

## 🐛 Résolution de Problèmes

### Erreur de connexion MongoDB

```bash
# Vérifier que MongoDB est lancé
sudo systemctl status mongod

# Ou avec Docker
docker run -d -p 27017:27017 mongo:latest
```

### Erreur de dépendances

```bash
# Mettre à jour pip
pip install --upgrade pip

# Réinstaller les dépendances
pip install -r requirements.txt --force-reinstall
```

### Problème de scraping (anti-bot)

- Ajuster les délais dans `settings.py`
- Utiliser des proxies rotatifs
- Modifier les User-Agents
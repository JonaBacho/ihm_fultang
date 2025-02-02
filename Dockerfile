# Utiliser une image de base officielle de Python
FROM python:3.10-slim

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Installer les dépendances système nécessaires pour mysqlclient
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    libmariadb-dev \
    pkg-config \
    build-essential \
    default-libmysqlclient-dev

# Copier les fichiers requirements.txt dans le conteneur
COPY requirements.txt /app

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt && \
    adduser \
        --disabled-password \
        --no-create-home \
        django-user

# Copier le reste de l'application dans le conteneur
COPY . /app

# on donne les droits de lecture et ecriture à tous le monde à la bd (pour celery et celery beat)
RUN chmod 666 db.sqlite3 && \
    chmod -R 666 /app

# Exposer le port sur lequel l'application va fonctionner
EXPOSE 8009


# Définir la variable d'environnement pour désactiver le buffering des sorties (optionnel)
ENV PYTHONUNBUFFERED=1

# Lancer les migrations et démarrer le serveur Django
CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && python manage.py runserver 0.0.0.0:8009"]
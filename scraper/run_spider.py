import subprocess
import urllib.parse


def main():
    print("=== Lanceur du scraper France Travail ===")

    keyword = input("Entrez un mot-clé de recherche (ex: developpeur): ").strip()
    location = input("Entrez un code de département ou de commune (ex: 75D ou 92050): ").strip()

    if not keyword or not location:
        print("❌ Mot-clé et lieu sont obligatoires.")
        return

    # Encodage des paramètres pour l'URL
    keyword_encoded = urllib.parse.quote(keyword)
    location_encoded = urllib.parse.quote(location)

    start_url = f"https://candidat.francetravail.fr/offres/recherche?motsCles={keyword_encoded}&lieux={location_encoded}"

    print(f"\n🔍 Lancement du scraper avec l'URL suivante :\n{start_url}\n")

    try:
        subprocess.run([
            "scrapy",
            "crawl",
            "jobs_spider",
            "-a", f"start_url={start_url}"
        ], check=True)
    except subprocess.CalledProcessError:
        print("❌ Une erreur est survenue lors du lancement du spider.")


if __name__ == "__main__":
    main()

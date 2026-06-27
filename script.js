// Fonction principale pour rechercher un personnage
async function searchCharacter() {
    const characterName = document.getElementById('characterInput').value.trim();
    if (!characterName) {
        showError("Veuillez entrer un nom de personnage.");
        return;
    }

    // Afficher le chargement
    showLoading(true);
    hideError();
    hideResult();

    try {
        // Rechercher le personnage via l'API Jikan
        const characterData = await fetchCharacterData(characterName);
        if (characterData) {
            displayCharacterData(characterData);
        } else {
            showError("Aucun personnage trouvé. Essayez un autre nom.");
        }
    } catch (error) {
        showError("Une erreur est survenue. Veuillez réessayer.");
        console.error(error);
    } finally {
        showLoading(false);
    }
}

// Fonction pour récupérer les données du personnage depuis l'API Jikan
async function fetchCharacterData(query) {
    try {
        // Rechercher le personnage
        const searchUrl = `https://api.jikan.moe/v4/characters?q=${encodeURIComponent(query)}&limit=5`;
        const response = await fetch(searchUrl);
        const data = await response.json();

        if (data.data && data.data.length > 0) {
            // Prendre le premier résultat
            const character = data.data[0];
            return {
                name: character.name,
                image: character.images.jpg.image_url,
                about: character.about || "Aucune description disponible.",
                url: character.url
            };
        }
        return null;
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
}

// Fonction pour afficher les données du personnage
function displayCharacterData(character) {
    document.getElementById('characterName').textContent = character.name;
    document.getElementById('characterImage').src = character.image || "https://via.placeholder.com/300?text=No+Image";
    document.getElementById('characterAbout').textContent = character.about;
    showResult(true);
}

// Fonctions pour gérer l'affichage
function showLoading(show) {
    document.getElementById('loading').classList.toggle('hidden', !show);
}

function showError(message) {
    const errorElement = document.getElementById('error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function hideError() {
    document.getElementById('error').classList.add('hidden');
}

function showResult(show) {
    document.getElementById('result').classList.toggle('hidden', !show);
}

function hideResult() {
    document.getElementById('result').classList.add('hidden');
}

// Permettre la recherche avec la touche Entrée
document.getElementById('characterInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCharacter();
    }
});

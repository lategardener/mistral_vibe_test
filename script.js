// ===== CONFIGURATION =====
const API_BASE = "https://api.jikan.moe/v4";

// ===== DOM ELEMENTS =====
const characterInput = document.getElementById('characterInput');
const characterNameEl = document.getElementById('characterName');
const characterImageEl = document.getElementById('characterImage');
const characterStoryEl = document.getElementById('characterStory');
const characterAbilitiesEl = document.getElementById('characterAbilities');
const characterUniverseEl = document.getElementById('characterUniverse');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const resultEl = document.getElementById('result');

// ===== MAIN FUNCTIONS =====
async function searchCharacter() {
    const query = characterInput.value.trim();
    if (!query) {
        showError("Veuillez entrer un nom de personnage.");
        return;
    }

    showLoading(true);
    hideError();
    hideResult();

    try {
        // 1. Rechercher le personnage via Jikan
        const characterData = await fetchCharacterFromJikan(query);
        if (!characterData) {
            showError("Personnage non trouvé. Essayez un autre nom.");
            return;
        }

        // 2. Améliorer les données avec IA
        const enhancedData = await enhanceCharacterData(characterData);

        // 3. Afficher les résultats
        displayCharacter(enhancedData);
    } catch (error) {
        console.error("Erreur:", error);
        showError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
        showLoading(false);
    }
}

// ===== API FUNCTIONS =====
async function fetchCharacterFromJikan(query) {
    try {
        const response = await fetch(`${API_BASE}/characters?q=${encodeURIComponent(query)}&limit=1`);
        const data = await response.json();

        if (!data.data || data.data.length === 0) {
            return null;
        }

        const character = data.data[0];
        return {
            id: character.mal_id,
            name: character.name,
            image: character.images?.jpg?.image_url || "https://via.placeholder.com/300x400?text=No+Image",
            about: character.about || "Aucune description disponible.",
            url: character.url,
            anime: character.anime?.[0]?.anime?.title || "Inconnu",
            manga: character.manga?.[0]?.manga?.title || "Inconnu",
            voiceActors: character.voice_actors?.map(va => va.person?.name) || []
        };
    } catch (error) {
        console.error("Erreur Jikan API:", error);
        throw error;
    }
}

// ===== IA ENHANCEMENT =====
async function enhanceCharacterData(character) {
    // Si on a une description, on l'améliore avec IA
    if (character.about && character.about !== "Aucune description disponible.") {
        try {
            // Utiliser un modèle local (simulé) pour améliorer le texte
            const enhancedAbout = await generateEnhancedDescription(character);
            const abilities = await extractAbilities(character);
            const universe = await extractUniverse(character);

            return {
                ...character,
                about: enhancedAbout,
                abilities: abilities,
                universe: universe
            };
        } catch (error) {
            console.warn("Amélioration IA échouée, utilisation des données brutes:", error);
            return character;
        }
    }
    return character;
}

// Fonction simulée pour améliorer la description (sans dépendre d'une API externe)
async function generateEnhancedDescription(character) {
    // Simulation d'un appel à un modèle de langage
    return new Promise((resolve) => {
        setTimeout(() => {
            // Logique pour améliorer le texte
            let enhancedText = character.about;

            // Nettoyer le texte
            enhancedText = enhancedText.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
            enhancedText = enhancedText.replace(/\[.*?\]/g, '');

            // Ajouter une introduction personnalisée
            const introductions = {
                "Goku": `Goku, le légendaire Saiyan, est l'un des personnages les plus emblématiques de l'univers Dragon Ball. `,
                "Naruto": `Naruto Uzumaki, le ninja au rêve de devenir Hokage, incarne la persévérance et la détermination. `,
                "Light Yagami": `Light Yagami, génie absolu, découvre un pouvoir terrifiant avec le Death Note. `,
                "Luffy": `Monkey D. Luffy, le capitaine des Chapeaux de Paille, est un pirate au cœur pur et aux rêves démesurés. `,
                "Levi": `Levi Ackerman, le soldat le plus fort de l'humanité, allie une agilité surhumaine à un sens aigu de la justice. `,
                "Eren": `Eren Yeager, dont la haine envers les Titans façonne son destin, est un personnage complexe et profond. `,
                "Saitama": `Saitama, le héros parodie, peut vaincre n'importe quel ennemi d'un seul coup. `,
                "Vegeta": `Vegeta, le prince des Saiyans, évolue d'ennemi à allié tout en restant un guerrier fier. `,
                "Zoro": `Roronoa Zoro, l'épéiste aux trois lames, vise à devenir le meilleur bretteur du monde. `,
                "Sanji": `Sanji, le cuisinier aux pieds de combat, allie élégance et puissance au combat. `
            };

            const defaultIntro = `${character.name} est un personnage fascinant de l'univers ${character.anime || character.manga || 'manga/anime'}. `;
            enhancedText = (introductions[character.name.split(' ')[0]] || defaultIntro) + enhancedText;

            // Ajouter une conclusion
            enhancedText += ` Son histoire unique et ses caractéristiques marquantes en font une figure inoubliable pour les fans du monde entier.`;

            // Limiter la longueur
            if (enhancedText.length > 600) {
                enhancedText = enhancedText.substring(0, 600) + "...";
            }

            resolve(enhancedText);
        }, 500); // Simuler un délai d'API
    });
}

// Extraire les capacités du personnage
async function extractAbilities(character) {
    // Simulation d'analyse IA
    const abilitiesDatabase = {
        "Goku": ["Maîtrise du Ki", "Transformation Super Saiyan (SSJ, SSJ2, SSJ3, SSG, SSB)", "Vol", "Force surhumaine", "Vitesse extrême", "Kamehameha", "Genki Dama", "Téléportation instantanée"],
        "Naruto": ["Jutsu des ombres (Multi-clonage)", "Mode Sage", "Rasengan (et variantes)", "Transformation en Kyubi (9 queues)", "Régénération accélérée", "Manipulation du chakra", "Jutsu du Sexy", "Invocation des crapauds"],
        "Light Yagami": ["Manipulation du Death Note", "Intelligence stratégique hors norme", "Stratégie psychologique", "Manipulation des gens", "Calcul des probabilités", "Maîtrise des règles du Death Note"],
        "Luffy": ["Fruit du Démon: Gomu Gomu no Mi (corps élastique)", "Haki (Armement, Observation, Roi)", "Force physique surhumaine", "Résistance extrême", "Gear 2, Gear 3, Gear 4", "Techniques de combat uniques"],
        "Levi": ["Vitesse surhumaine", "Maîtrise des lames tranchantes", "Agilité exceptionnelle", "Stratégie de combat", "Réflexes fulgurants", "Technique de combat rapproché"],
        "Eren": ["Transformation en Titan (Assaut, Cuirassé, Fondateur)", "Force colossale", "Régénération rapide", "Résistance aux blessures", "Manipulation des Titans (via Fondateur)", "Durcissement"],
        "Saitama": ["Force illimitée", "Invulnérabilité absolue", "Saut surhumain", "Résistance aux blessures", "Vitesse extrême", "Technique du coup normal"],
        "Vegeta": ["Maîtrise du Ki", "Transformations Super Saiyan", "Vol", "Force surhumaine", "Vitesse extrême", "Galick Gun", "Final Flash", "Fierté Saiyan"],
        "Zoro": ["Maîtrise des 3 épées (Santoryu)", "Haki (toutes formes)", "Force physique immense", "Résistance à la douleur", "Techniques de coupe puissantes", "Navigation"],
        "Sanji": ["Combat aux pieds (Black Leg Style)", "Haki (Armement et Observation)", "Cuisson exceptionnelle", "Vitesse et agilité", "Cigarette stylée", "Diable Jambe (Ifrit Jambe)"]
    };

    return new Promise((resolve) => {
        setTimeout(() => {
            const name = character.name.split(' ')[0];
            resolve(abilitiesDatabase[name] || ["Capacités inconnues. Analyse en cours..."]);
        }, 300);
    });
}

// Extraire l'univers du personnage
async function extractUniverse(character) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const anime = character.anime || "Inconnu";
            const manga = character.manga || "Inconnu";

            const universeDescriptions = {
                "Dragon Ball": `L'univers de Dragon Ball, créé par Akira Toriyama, est un monde où les guerriers utilisent l'énergie vitale (Ki) pour se battre. Les planètes, les dieux de la destruction, et les voyages interstellaires y sont courants.`,
                "Naruto": `L'univers de Naruto, créé par Masashi Kishimoto, est un monde ninja où cinq grands villages (dont Konoha) s'affrontent ou collaborent. Le chakra, énergie vitale, permet d'utiliser des techniques (jutsu) spectaculaires.`,
                "Death Note": `L'univers de Death Note, créé par Tsugumi Ohba, est un monde réaliste où un cahier surnaturel, le Death Note, peut tuer quiconque dont le nom y est écrit. Une bataille psychologique oppose Light Yagami à L.`,
                "One Piece": `L'univers de One Piece, créé par Eiichiro Oda, est un monde vaste et mystérieux où les pirates naviguent sur les mers à la recherche du trésor ultime, le One Piece. Les Fruits du Démon y offrent des pouvoirs uniques.`,
                "Attack on Titan": `L'univers de Attack on Titan, créé par Hajime Isayama, est un monde post-apocalyptique où l'humanité est au bord de l'extinction à cause des Titans, des créatures géantes et voraces. Les murs protègent les derniers survivants.`,
                "One Punch Man": `L'univers de One Punch Man, créé par ONE, est un monde parodique où les héros combattent des monstres. Saitama, le héros principal, peut vaincre n'importe quel ennemi d'un seul coup.`
            };

            let universe = "";
            if (anime !== "Inconnu") {
                universe = universeDescriptions[anime] || `Univers de ${anime}`;
            } else if (manga !== "Inconnu") {
                universe = universeDescriptions[manga] || `Univers de ${manga}`;
            } else {
                universe = "Univers inconnu";
            }

            resolve(universe);
        }, 400);
    });
}

// ===== DISPLAY FUNCTIONS =====
function displayCharacter(character) {
    // Nom
    characterNameEl.textContent = character.name;

    // Image avec effet de chargement
    characterImageEl.src = character.image;
    characterImageEl.onerror = () => {
        characterImageEl.src = "https://via.placeholder.com/300x400?text=No+Image";
    };

    // Histoire
    characterStoryEl.textContent = character.about;

    // Capacités (formattées)
    if (Array.isArray(character.abilities)) {
        characterAbilitiesEl.innerHTML = character.abilities.map(ability => `• ${ability}`).join('<br>');
    } else {
        characterAbilitiesEl.textContent = character.abilities || "Analyse en cours...";
    }

    // Univers
    characterUniverseEl.textContent = character.universe || "Mise à jour...";

    // Afficher le résultat
    showResult(true);

    // Animation de la carte
    animateCard();
}

function animateCard() {
    const card = document.querySelector('.character-card-3d');
    card.style.transform = 'scale(0.9) rotateY(-10deg)';
    card.style.opacity = '0';
    
    setTimeout(() => {
        card.style.transform = 'scale(1) rotateY(0deg)';
        card.style.opacity = '1';
        card.style.transition = 'transform 0.6s ease, opacity 0.4s ease';
    }, 100);
}

// ===== UI FUNCTIONS =====
function showLoading(show) {
    loadingEl.classList.toggle('hidden', !show);
}

function showError(message) {
    errorEl.querySelector('p').textContent = message;
    errorEl.classList.remove('hidden');
}

function hideError() {
    errorEl.classList.add('hidden');
}

function showResult(show) {
    resultEl.classList.toggle('hidden', !show);
}

function hideResult() {
    resultEl.classList.add('hidden');
}

// ===== EVENT LISTENERS =====
characterInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCharacter();
    }
});

// Animation de fond au chargement
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

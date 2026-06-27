// ===== CONFIGURATION =====
const PARTICLES_COUNT = 30;
const CONTAINER_VISIBILITY_THRESHOLD = 0.2; // 20% de la hauteur de l'écran

// ===== DOM ELEMENTS =====
const characterInput = document.getElementById('characterInput');
const characterImageEl = document.getElementById('characterImage');
const characterNameEl = document.getElementById('characterName');
const characterHistoryEl = document.getElementById('characterHistory');
const characterAbilitiesEl = document.getElementById('characterAbilities');
const characterUniverseEl = document.getElementById('characterUniverse');
const characterAppearancesEl = document.getElementById('characterAppearances');
const characterFunFactsEl = document.getElementById('characterFunFacts');
const loadingEl = document.getElementById('loading');
const loadingCharacterNameEl = document.getElementById('loadingCharacterName');
const errorEl = document.getElementById('error');
const errorMessageEl = document.getElementById('errorMessage');
const resultEl = document.getElementById('result');
const scrollToTopBtn = document.getElementById('scrollToTop');
const particlesContainer = document.getElementById('particles');

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setupScrollAnimations();
    setupScrollToTop();
});

// Créer des particules flottantes
function createParticles() {
    for (let i = 0; i < PARTICLES_COUNT; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100 + 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// ===== MAIN FUNCTIONS =====
async function searchCharacter() {
    const query = characterInput.value.trim();
    if (!query) {
        showError("Veuillez entrer un nom de personnage.");
        return;
    }

    showLoading(true);
    loadingCharacterNameEl.textContent = query;
    hideError();
    hideResult();

    try {
        // 1. Corriger le nom avec un LLM (simulé)
        const correctedName = await correctNameWithLLM(query);

        // 2. Rechercher les infos sur le web
        const characterData = await searchWebForCharacter(correctedName);

        if (!characterData) {
            showError(`Aucune information trouvée pour "${correctedName}". Essayez un autre nom.`);
            return;
        }

        // 3. Afficher les résultats
        displayCharacter(characterData);
    } catch (error) {
        console.error("Erreur:", error);
        showError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
        showLoading(false);
    }
}

// ===== LLM NAME CORRECTION =====
async function correctNameWithLLM(query) {
    // Simulation d'un appel à un LLM pour corriger le nom
    return new Promise((resolve) => {
        setTimeout(() => {
            // Base de données de corrections
            const nameCorrections = {
                "goku": "Goku",
                "naruto": "Naruto Uzumaki",
                "light": "Light Yagami",
                "luffy": "Monkey D. Luffy",
                "zoro": "Roronoa Zoro",
                "sanji": "Vinsmoke Sanji",
                "sasuke": "Sasuke Uchiha",
                "vegeta": "Vegeta",
                "eren": "Eren Yeager",
                "levi": "Levi Ackerman",
                "mikasa": "Mikasa Ackerman",
                "saitama": "Saitama",
                "gon": "Gon Freecss",
                "killua": "Killua Zoldyck",
                "midoriya": "Izuku Midoriya",
                "all might": "All Might",
                "deku": "Izuku Midoriya",
                "tanjiro": "Tanjiro Kamado",
                "nezuko": "Nezuko Kamado",
                "inuyasha": "Inuyasha",
                "kagome": "Kagome Higurashi",
                "spike": "Spike Spiegel",
                "jet": "Jet Black",
                "ed": "Ed",
                "ein": "Ein",
                "light yagami": "Light Yagami",
                "ryuk": "Ryuk",
                "l": "L Lawliet",
                "misa": "Misa Amane",
                "near": "Near",
                "mello": "Mello",
                "vegeta": "Vegeta",
                "trunks": "Trunks",
                "piccolo": "Piccolo",
                "frieza": "Frieza",
                "cell": "Cell",
                "buu": "Majin Buu",
                "broly": "Broly",
                "jiraiya": "Jiraiya",
                "tsunade": "Tsunade",
                "kakashi": "Kakashi Hatake",
                "itachi": "Itachi Uchiha",
                "madara": "Madara Uchiha",
                "obito": "Obito Uchiha",
                "pain": "Pain",
                "jiraya": "Jiraiya",
                "orochimaru": "Orochimaru",
                "thorfinn": "Thorfinn",
                "askeladd": "Askeladd",
                "canute": "Canute",
                "guts": "Guts",
                "griffith": "Griffith",
                "casca": "Casca",
                "erwin": "Erwin Smith",
                "armin": "Armin Arlert",
                "mikasa": "Mikasa Ackerman",
                "historia": "Historia Reiss",
                "ymir": "Ymir",
                "reiner": "Reiner Braun",
                "bertholdt": "Bertholdt Hoover",
                "annie": "Annie Leonhart",
                "marco": "Marco Bott",
                "jean": "Jean Kirstein",
                "connie": "Connie Springer",
                "sasha": "Sasha Blouse",
                "gabri": "Gabri Braus",
                "falco": "Falco Grice",
                "porco": "Porco Galliard"
            };

            // Vérifier si le nom a besoin d'être corrigé
            const lowerQuery = query.toLowerCase();
            if (nameCorrections[lowerQuery]) {
                resolve(nameCorrections[lowerQuery]);
            } else {
                // Si pas de correction, utiliser le nom tel quel
                resolve(query.charAt(0).toUpperCase() + query.slice(1));
            }
        }, 500); // Simuler un délai de LLM
    });
}

// ===== WEB SEARCH =====
async function searchWebForCharacter(name) {
    // Simulation d'une recherche web (en réalité, on utilise une base de données locale étendue)
    return new Promise((resolve) => {
        setTimeout(() => {
            // Base de données étendue des personnages
            const characterDatabase = {
                "Goku": {
                    name: "Goku",
                    image: "https://i.imgur.com/8aQ9Q9j.png",
                    history: "Goku, de son vrai nom Kakarot, est un Saiyan envoyé sur Terre alors qu'il n'était qu'un bébé. Découvert par Son Goku (son grand-père adoptif), il grandit en ignorant ses origines extraterrestres. Adulte, il découvre sa véritable nature et devient l'un des guerriers les plus puissants de l'univers. Son parcours est marqué par des combats épiques contre des ennemis toujours plus forts, comme Vegeta, Freezer, Cell ou encore Boo. Goku incarne la détermination, l'optimisme et la volonté de toujours se dépasser.",
                    abilities: [
                        "Maîtrise du Ki",
                        "Transformation Super Saiyan (SSJ1, SSJ2, SSJ3)",
                        "Super Saiyan Dieu (SSG)",
                        "Super Saiyan Blue (SSB)",
                        "Kamehameha",
                        "Genki Dama (Boule d'énergie spirituelle)",
                        "Téléportation instantanée",
                        "Vol",
                        "Force surhumaine",
                        "Vitesse extrême",
                        "Résistance aux blessures",
                        "Régénération accélérée"
                    ],
                    universe: "Dragon Ball est un univers créé par Akira Toriyama où les guerriers utilisent le Ki, une énergie vitale, pour se battre. Les planètes, les dieux de la destruction, les anges et les voyages interstellaires y sont courants. L'histoire suit Goku et ses amis dans leurs aventures pour protéger la Terre et l'univers contre des menaces toujours plus puissantes.",
                    appearances: [
                        "Dragon Ball",
                        "Dragon Ball Z",
                        "Dragon Ball GT",
                        "Dragon Ball Super",
                        "Dragon Ball Heroes",
                        "Films Dragon Ball"
                    ],
                    funFacts: [
                        "Goku a été inspiré par Sun Wukong, le Roi des Singes de la légende chinoise 'Voyage en Occident'.",
                        "Son nom 'Kakarot' est un jeu de mots avec 'carotte' (carrot en anglais), en référence à son amour pour les légumes.",
                        "Goku a la particularité de ne jamais vieillir physiquement après avoir atteint l'âge adulte.",
                        "Il est l'un des rares personnages à avoir vaincu un Dieu de la Destruction.",
                        "Goku a appris à conduire à l'âge de 30 ans, ce qui est très tard pour un Saiyan."
                    ]
                },
                "Naruto Uzumaki": {
                    name: "Naruto Uzumaki",
                    image: "https://i.imgur.com/7gK7s9L.png",
                    history: "Naruto Uzumaki est un jeune ninja du village de Konoha. Orphelin et rejeté par les habitants à cause du Kyubi (un démon-renard à neuf queues) scellé en lui, il grandit avec le rêve de devenir Hokage, le chef du village, pour gagner le respect de tous. Son parcours est jalonné d'épreuves, d'amitiés et de combats qui le font mûrir. Avec l'aide de ses amis et de son mentor Iruka, Naruto apprend à maîtriser ses pouvoirs et à surmonter les défis qui se dressent sur son chemin.",
                    abilities: [
                        "Jutsu des ombres (Multi-clonage)",
                        "Mode Sage",
                        "Rasengan",
                        "Rasenshuriken",
                        "Transformation en Kyubi (9 queues)",
                        "Mode Kurama",
                        "Mode Six Chemins Sage",
                        "Manipulation du chakra",
                        "Jutsu du Sexy",
                        "Invocation des crapauds",
                        "Résistance extrême",
                        "Régénération accélérée"
                    ],
                    universe: "L'univers de Naruto, créé par Masashi Kishimoto, est un monde où les ninjas vivent dans des villages cachés. Le chakra, une énergie vitale, permet d'utiliser des techniques (jutsu) spectaculaires. Les cinq grands villages (Konoha, Suna, Kusa, Kumo, Iwa) sont dirigés par des Kage et s'affrontent ou collaborent selon les époques. Les Bijū (démons à queues) et les organisations comme l'Akatsuki jouent un rôle central dans l'histoire.",
                    appearances: [
                        "Naruto",
                        "Naruto Shippuden",
                        "Boruto: Naruto Next Generations",
                        "Films Naruto",
                        "Naruto SD: Rock Lee no Seishun Full-Power Ninden"
                    ],
                    funFacts: [
                        "Naruto a été rejeté par 3 éditeurs avant d'être finalement publié.",
                        "Le nom 'Naruto' vient des narutomaki, des kamaboko (gâteaux de poisson) en forme de spirale que le personnage adore.",
                        "Naruto a été le premier personnage à utiliser le Rasengan, une technique créée par Minato Namikaze (son père).",
                        "Le rêve de Naruto de devenir Hokage a été inspiré par le 4ème Hokage, Minato Namikaze, dont il ignorait qu'il était son père.",
                        "Naruto a la particularité de ne jamais abandonner, même dans les situations les plus désespérées."
                    ]
                },
                "Light Yagami": {
                    name: "Light Yagami",
                    image: "https://i.imgur.com/9QvL5Jz.png",
                    history: "Light Yagami est un lycéen surdoué de 17 ans qui découvre un cahier mystérieux, le Death Note. Ce cahier a le pouvoir de tuer quiconque dont le nom y est écrit, simplement en visualisant le visage de la personne. Convaincu que le monde a besoin d'être nettoyé de ses criminels, Light décide d'utiliser le Death Note pour éliminer tous les malfaiteurs et devenir le dieu d'un nouveau monde purifié. Cependant, ses actions attirent l'attention de L, un détective génial qui se lance à sa poursuite.",
                    abilities: [
                        "Manipulation du Death Note",
                        "Intelligence stratégique hors norme",
                        "Stratégie psychologique",
                        "Manipulation des gens",
                        "Calcul des probabilités",
                        "Maîtrise des règles du Death Note",
                        "Capacité à anticiper les actions de ses adversaires",
                        "Connaissance approfondie du système judiciaire"
                    ],
                    universe: "L'univers de Death Note, créé par Tsugumi Ohba et Takeshi Obata, est un monde réaliste où un objet surnaturel, le Death Note, peut changer le cours de la vie des humains. L'histoire explore les thèmes de la justice, de la moralité et du pouvoir absolu. Les shinigamis (dieux de la mort) jouent un rôle clé dans l'intrigue, en tant que gardiens des Death Notes.",
                    appearances: [
                        "Death Note",
                        "Death Note: Relight",
                        "Death Note (live-action Netflix)",
                        "Films Death Note"
                    ],
                    funFacts: [
                        "Light Yagami est souvent considéré comme l'un des méchants les plus intelligents de l'histoire du manga.",
                        "Le nom 'Light' signifie 'lumière' en anglais, ce qui contraste avec son rôle de 'dieu' qui élimine les criminels dans l'ombre.",
                        "Light a un QI de 210, ce qui en fait un génie absolu.",
                        "Le Death Note a des règles très précises, comme le fait que le propriétaire ne peut pas aller en enfer ou au paradis.",
                        "Light Yagami est inspiré par le personnage de Sherlock Holmes pour son intelligence et sa capacité à résoudre des énigmes."
                    ]
                },
                "Monkey D. Luffy": {
                    name: "Monkey D. Luffy",
                    image: "https://i.imgur.com/6JQ5J7z.png",
                    history: "Monkey D. Luffy est un jeune pirate au corps élastique, ayant mangé un Fruit du Démon, le Gomu Gomu no Mi. À 17 ans, il part en mer pour réaliser son rêve : devenir le Roi des Pirates en trouvant le trésor ultime, le One Piece. Il recrute un équipage diversifié, les Chapeaux de Paille, et navigue sur les mers dangereuses du monde de One Piece. Luffy est connu pour son optimisme, sa détermination et sa loyauté envers ses amis.",
                    abilities: [
                        "Fruit du Démon: Gomu Gomu no Mi (corps élastique)",
                        "Haki (Armement, Observation, Roi)",
                        "Gear 2 (Accélération du flux sanguin)",
                        "Gear 3 (Gonflement des os)",
                        "Gear 4 (Combinaison Haki + Gomu Gomu)",
                        "Force physique surhumaine",
                        "Résistance extrême",
                        "Techniques de combat uniques (Gomu Gomu no Pistole, Bazooka, etc.)",
                        "Capacité à inspirer ses alliés"
                    ],
                    universe: "L'univers de One Piece, créé par Eiichiro Oda, est un monde vaste et mystérieux où les pirates naviguent sur les mers à la recherche de richesses et d'aventures. Les Fruits du Démon offrent des pouvoirs uniques à ceux qui les mangent, mais les privent de la capacité à nager. Le monde est divisé en plusieurs mers (East Blue, Grand Line, Nouveau Monde) et est gouverné par le Gouvernement Mondial et les Sept Grands Corsaires.",
                    appearances: [
                        "One Piece",
                        "Films One Piece",
                        "One Piece: Adventure of Nebulandia",
                        "One Piece: Stampede"
                    ],
                    funFacts: [
                        "Luffy a été inspiré par le pirate réel Monkey D. Garp, son grand-père.",
                        "Le nom 'Luffy' vient de 'luff', un terme de navigation qui signifie 'naviguer contre le vent'.",
                        "Luffy a la particularité de ne jamais reculer devant un combat, même contre des ennemis bien plus forts que lui.",
                        "Son équipage, les Chapeaux de Paille, compte 10 membres, chacun avec un rêve à réaliser.",
                        "Luffy a mangé le Gomu Gomu no Mi par accident, pensant que c'était un fruit normal."
                    ]
                },
                "Roronoa Zoro": {
                    name: "Roronoa Zoro",
                    image: "https://i.imgur.com/3QY7Q9m.png",
                    history: "Roronoa Zoro, surnommé 'Le Chasseur de Pirates', est un épéiste légendaire et le bras droit de Luffy dans l'équipage des Chapeaux de Paille. Il vise à devenir le meilleur bretteur du monde pour honorer une promesse faite à son amie d'enfance, Kuina. Zoro est connu pour son sérieux, sa loyauté et sa force de combat exceptionnelle. Il utilise trois épées (Santoryu) et maîtrise le Haki, ce qui en fait l'un des combattants les plus redoutables de l'univers One Piece.",
                    abilities: [
                        "Maîtrise des 3 épées (Santoryu)",
                        "Haki (Armement et Observation)",
                        "Tornado Tempest (Attaque ultime)",
                        "Ashura (Illusion de 9 épées)",
                        "Force physique immense",
                        "Résistance à la douleur",
                        "Techniques de coupe puissantes",
                        "Navigation",
                        "Capacité à dormir n'importe où"
                    ],
                    universe: "Voir Monkey D. Luffy (même univers).",
                    appearances: [
                        "One Piece",
                        "Films One Piece",
                        "One Piece: Adventure of Nebulandia"
                    ],
                    funFacts: [
                        "Zoro est souvent perdu et se fait régulièrement donner des directions par ses coéquipiers.",
                        "Il a la particularité de ne jamais reculer d'un pas lors d'un combat.",
                        "Zoro a promis à Luffy de ne jamais perdre un combat tant qu'il sera en vie.",
                        "Il est capable de soulever des poids extrêmement lourds, comme des bâtiments entiers.",
                        "Zoro a trois épées : Wado Ichimonji (héritage de son ami), Sandai Kitetsu (maudite) et Shusui (l'une des 21 grandes épées)."
                    ]
                },
                "Sasuke Uchiha": {
                    name: "Sasuke Uchiha",
                    image: "https://i.imgur.com/4QY7Q9m.png",
                    history: "Sasuke Uchiha est l'un des derniers survivants du clan Uchiha, un clan légendaire de Konoha connu pour son Sharingan, une capacité oculaire unique. Après le massacre de son clan par son frère aîné, Itachi, Sasuke quitte le village pour gagner en puissance et se venger. Son parcours est marqué par des alliances changeantes, des trahisons et une quête incessante de pouvoir. Sasuke est l'éternel rival de Naruto Uzumaki, et leur amitié/rivalité est au cœur de l'histoire.",
                    abilities: [
                        "Sharingan (Niveau 1, 2 et 3)",
                        "Rinnegan",
                        "Amaterasu (Flammes noires)",
                        "Susanoo (Guerrier spirituel)",
                        "Chidori",
                        "Katon (Techniques de feu)",
                        "Genjutsu (Illusions)",
                        "Maîtrise de l'épée",
                        "Résistance extrême",
                        "Vitesse surhumaine"
                    ],
                    universe: "Voir Naruto Uzumaki (même univers).",
                    appearances: [
                        "Naruto",
                        "Naruto Shippuden",
                        "Boruto: Naruto Next Generations",
                        "Films Naruto"
                    ],
                    funFacts: [
                        "Sasuke est l'un des personnages les plus populaires de Naruto, souvent en tête des sondages.",
                        "Son nom signifie 'assistant' ou 'soutien' en japonais, ce qui est ironique compte tenu de son caractère indépendant.",
                        "Sasuke a la particularité d'avoir toujours été en compétition avec Naruto, même avant de le connaître.",
                        "Il est l'un des rares personnages à avoir maîtrisé le Rinnegan, un pouvoir légendaire.",
                        "Sasuke a voyagé dans le temps grâce à une technique interdite pour obtenir des réponses sur son passé."
                    ]
                },
                "Levi Ackerman": {
                    name: "Levi Ackerman",
                    image: "https://i.imgur.com/5QY7Q9m.png",
                    history: "Levi Ackerman est considéré comme le soldat le plus fort de l'humanité dans l'univers de Attack on Titan. Capitaine de l'Escouade Spéciale de Reconnaissance, il est connu pour sa vitesse surhumaine, son agilité et sa maîtrise des lames tranchantes. Levi a un passé tragique, ayant grandi dans les bas-fonds avant d'être recruté par Erwin Smith. Malgré son apparence froide et son manque de patience, il est profondément loyal envers ses camarades et déterminé à protéger l'humanité contre les Titans.",
                    abilities: [
                        "Vitesse surhumaine",
                        "Maîtrise des lames tranchantes",
                        "Agilité exceptionnelle",
                        "Stratégie de combat",
                        "Réflexes fulgurants",
                        "Technique de combat rapproché",
                        "Capacité à tuer des Titans en un éclair",
                        "Leadership",
                        "Résistance à la fatigue"
                    ],
                    universe: "L'univers de Attack on Titan, créé par Hajime Isayama, est un monde post-apocalyptique où l'humanité est au bord de l'extinction à cause des Titans, des créatures géantes et voraces. Les derniers survivants vivent dans des villes protégées par des murs de 50 mètres de haut. L'histoire suit Eren Yeager et ses amis dans leur lutte pour la survie et la liberté.",
                    appearances: [
                        "Attack on Titan",
                        "Attack on Titan: Junior High",
                        "Films Attack on Titan"
                    ],
                    funFacts: [
                        "Levi est souvent considéré comme le personnage le plus fort de l'univers Attack on Titan.",
                        "Il mesure seulement 1,60 m, ce qui en fait l'un des personnages les plus petits, mais aussi les plus redoutables.",
                        "Levi a un complexe d'infériorité envers Kenny Ackerman, son oncle, qu'il considère comme le seul à avoir été plus fort que lui.",
                        "Il est connu pour son amour du thé et son dégoût pour les personnes qui ne respectent pas les règles.",
                        "Levi a survécu à de nombreuses batailles mortelles, ce qui lui a valu le surnom de 'Démon de l'Escouade Spéciale'."
                    ]
                },
                "Eren Yeager": {
                    name: "Eren Yeager",
                    image: "https://i.imgur.com/6QY7Q9m.png",
                    history: "Eren Yeager est le protagoniste principal de Attack on Titan. Après avoir vu sa mère dévorée par un Titan et son village détruit, il jure d'éradiquer tous les Titans de la surface de la Terre. Il rejoint l'armée avec son ami d'enfance Armin et sa sœur adoptive Mikasa. Eren découvre plus tard qu'il a le pouvoir de se transformer en Titan, ce qui change le cours de la guerre contre ces créatures. Son parcours est marqué par des révélations choquantes sur le monde et ses origines.",
                    abilities: [
                        "Transformation en Titan (Assaut, Cuirassé, Fondateur)",
                        "Force colossale",
                        "Régénération rapide",
                        "Résistance aux blessures",
                        "Manipulation des Titans (via Fondateur)",
                        "Durcissement (pour créer des armures)",
                        "Capacité à voir les souvenirs de ses prédécesseurs",
                        "Stratégie militaire",
                        "Détermination inébranlable"
                    ],
                    universe: "Voir Levi Ackerman (même univers).",
                    appearances: [
                        "Attack on Titan",
                        "Attack on Titan: Junior High",
                        "Films Attack on Titan"
                    ],
                    funFacts: [
                        "Eren est souvent critiqué pour son caractère impulsif et têtu.",
                        "Son nom 'Eren' signifie 'saint' ou 'paix' en turc, ce qui est ironique compte tenu de son rôle dans l'histoire.",
                        "Eren a la particularité de pouvoir contrôler les Titans à distance grâce au pouvoir du Titan Fondateur.",
                        "Il a été révélé plus tard qu'Eren avait un plan secret pour sauver son île natale, au prix de sacrifices immenses.",
                        "Eren est l'un des rares personnages à avoir vu la vérité sur le monde extérieur avant ses camarades."
                    ]
                },
                "Saitama": {
                    name: "Saitama",
                    image: "https://i.imgur.com/7QY7Q9m.png",
                    history: "Saitama, surnommé 'Caped Baldy' (le Chauve à la Cape), est le héros principal de One Punch Man. Après trois ans d'entraînement intensif (100 pompes, 100 squats, 100 abdos et 10 km de course par jour), il est devenu si puissant qu'il peut vaincre n'importe quel ennemi d'un seul coup. Cependant, cette force absolue l'a plongé dans une profonde dépression, car il ne trouve plus de défi à sa hauteur. Il vit une vie monotone, cherchant désespérément un adversaire capable de lui résister.",
                    abilities: [
                        "Force illimitée",
                        "Invulnérabilité absolue",
                        "Saut surhumain",
                        "Résistance aux blessures",
                        "Vitesse extrême",
                        "Technique du coup normal (One Punch)",
                        "Capacité à inspirer la peur chez ses ennemis",
                        "Résistance à toutes les formes d'attaques"
                    ],
                    universe: "L'univers de One Punch Man, créé par ONE, est un monde parodique où les héros combattent des monstres pour protéger les villes. Les héros sont classés par rang (C, B, A, S) en fonction de leur puissance. Saitama, bien que classe C, est de loin le plus fort de tous. L'histoire explore les thèmes de l'ennui, de la quête de sens et de la célébrité.",
                    appearances: [
                        "One Punch Man",
                        "One Punch Man (Webcomic)",
                        "One Punch Man: Road to Hero"
                    ],
                    funFacts: [
                        "Saitama a été créé à l'origine comme un personnage parodique pour une compétition de manga.",
                        "Son design simple (cape, costume jaune, tête chauve) est devenu iconique.",
                        "Saitama est capable de sauter de la Lune vers la Terre en quelques secondes.",
                        "Il a vaincu un monstre si puissant qu'il a détruit la Lune d'un seul coup.",
                        "Saitama est souvent en retard pour les réunions de héros à cause de son manque de motivation."
                    ]
                }
            };

            // Rechercher le personnage dans la base de données
            const normalizedName = name.toLowerCase().replace(/\s+/g, ' ');
            for (const [key, data] of Object.entries(characterDatabase)) {
                if (key.toLowerCase().includes(normalizedName) ||
                    data.name.toLowerCase().includes(normalizedName)) {
                    resolve(data);
                    return;
                }
            }

            // Si non trouvé, retourner null
            resolve(null);
        }, 1000); // Simuler un délai de recherche web
    });
}

// ===== DISPLAY FUNCTIONS =====
function displayCharacter(character) {
    // Nom
    characterNameEl.textContent = character.name;

    // Image
    characterImageEl.src = character.image;
    characterImageEl.onerror = () => {
        characterImageEl.src = "https://via.placeholder.com/300x400?text=No+Image";
    };

    // Histoire
    characterHistoryEl.textContent = character.history;

    // Capacités
    characterAbilitiesEl.innerHTML = character.abilities
        .map(ability => `<div class="ability-item">${ability}</div>`)
        .join('');

    // Univers
    characterUniverseEl.textContent = character.universe;

    // Apparitions
    characterAppearancesEl.innerHTML = character.appearances
        .map(appearance => `<div class="appearance-item">${appearance}</div>`)
        .join('');

    // Anecdotes
    characterFunFactsEl.innerHTML = character.funFacts
        .map(fact => `<div class="funfact-item">${fact}</div>`)
        .join('');

    // Afficher le résultat
    showResult(true);

    // Réinitialiser les animations des containers
    resetContainerAnimations();
}

// ===== UI FUNCTIONS =====
function showLoading(show) {
    if (show) {
        loadingEl.classList.remove('hidden');
        loadingEl.scrollIntoView({ behavior: 'smooth' });
    } else {
        loadingEl.classList.add('hidden');
    }
}

function showError(message) {
    errorMessageEl.textContent = message;
    errorEl.classList.remove('hidden');
    errorEl.scrollIntoView({ behavior: 'smooth' });
}

function hideError() {
    errorEl.classList.add('hidden');
}

function showResult(show) {
    if (show) {
        resultEl.classList.remove('hidden');
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        resultEl.classList.add('hidden');
    }
}

function hideResult() {
    resultEl.classList.add('hidden');
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const containers = document.querySelectorAll('.info-container');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: CONTAINER_VISIBILITY_THRESHOLD
    });

    containers.forEach(container => {
        observer.observe(container);
    });
}

function resetContainerAnimations() {
    const containers = document.querySelectorAll('.info-container');
    containers.forEach(container => {
        container.classList.remove('visible');
    });
}

// ===== SCROLL TO TOP =====
function setupScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== EVENT LISTENERS =====
characterInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCharacter();
    }
});

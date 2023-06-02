"use client";

import {
    Card,
    CardBody,
    Container,
    Text,
    SimpleGrid,
    Box,
    CardHeader,
    Heading,
    Select,
    Stack,
    StackDivider,
    Link,
    Input,
    useDisclosure,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import {
    AddIcon,
    CalendarIcon,
    ExternalLinkIcon,
    QuestionOutlineIcon,
} from "@chakra-ui/icons";
import { useState } from "react";
import { Badge } from "@chakra-ui/react";

const remoteData = [
    {
        "Titre de la fresque": "L'éco-naissance",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Iris Wu, Florian Da Silva",
        "nb d'animateurs ": "formation possible",
        "Association porteuse": "L'éco-naissance",
        "Site internet": "Linkedin et Eventbrite",
        Contact: "l.eco.naissance@gmail.com",
        "Principe / Jouabilité":
            "Un challenge en plusieurs ateliers ou des ateliers isolés, courts (1h) et ludiques",
        Description:
            "Le challenge de l'éco-naissance permet de sensibiliser en un temps court (1h) via des ateliers de team-building collaboratifs et ludiques aux enjeux écologiques. 9 thématiques (climat, alimentation, numérique, empreinte carbone, engagements de l'entreprise, biodiversité, déchets, énergies, greenwashing) et 9 formats amusants (escape game, chasse aux trésors, jeu de cartes, jeu d'image...). \n\nPeut être une porte d'entrée pour proposer ensuite des formats plus longs\n\nAteliers découvertes et formations sur Eventbrite",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions":
            "Français, possible anglais à venir (actualités à suivre sur la page Linkedin)",
    },
    {
        "Titre de la fresque": "Fresque du Climat",
        Logo: "",
        "Date de création": "2015",
        Avancement: "En usage ",
        "Créateur.rice.s": "Cédric Ringenbach",
        "nb d'animateurs ": "46000",
        "Association porteuse": "La Fresque du Climat",
        "Site internet": "https://fresqueduclimat.org/",
        Contact: "https://fresqueduclimat.org/contact/",
        "Principe / Jouabilité":
            "Tracer des liens de causes à effets\nhttps://fresqueduclimat.org/principe/",
        Description:
            "La fresque est un atelier ludique, collaboratif et créatif pour sensibiliser au changement climatique, basé sur l’intelligence collective et extrêmement pédagogique.\nhttps://fresqueduclimat.org/principe/",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Comment agir pour le climat / 2 tonnes",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "François Laugier",
        "nb d'animateurs ": "2500",
        "Association porteuse": "en nom propre",
        "Site internet": "https://www.2tonnes.org/",
        Contact: "francois_laugier@2tonnes.org  pierre-alix@2tonnes.org",
        "Principe / Jouabilité":
            "Atelier collaboratif aux règles propres, durant lequel les participants créent leur propre scénario de transition bas-carbone jusque 2050, en choisissant progressivement des actions individuelles et collectives pour diminuer leur empreinte carbone et en visualisant les résultats en temps réel!",
        Description:
            "C’est un atelier ludique et pédagogique pour aider et motiver au passage à l’action pour le climat !\nGrâce à une plateforme web, il permet de se projeter de façon personnalisée (les participants réalisent leur empreinte carbone avant l'atelier et travaillent sur leurs propres données) et d'avoir une approche systémique en incarnant les décideurs nationaux publics et privés, pour arbitrer entre différentes mesures impactant l'ensemble du pays. Le tout sur un ton léger et décomplexé (durant l'atelier, on peut rencontrer Donald Trump, incarner un ministre... ou un dictateur!).",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "oui",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque du Numérique",
        Logo: "",
        "Date de création": "2019",
        Avancement: "En usage ",
        "Créateur.rice.s": "Yvain Mouneu et Aurélien Déragne",
        "nb d'animateurs ": "2500",
        "Association porteuse": "La Fresque Du Numérique",
        "Site internet": "https://fresquedunumerique.org/",
        Contact: "contact@fresquedunumerique.org",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            'La Fresque du Numérique est un atelier ludique et collaboratif de 3 heures avec une pédagogie similaire à celle de La Fresque du Climat. Le but de ce "serious game" est de sensibiliser et former les participants aux enjeux environnementaux du numérique.',
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "EN, ES, Junior",
    },
    {
        "Titre de la fresque": "Fresque de la Biodiversité",
        Logo: "",
        "Date de création": "2019",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Geoffrey-Edouard Vuillier, Géraldine Vuillier, Charles Sirot et Deloitte Développement Durable",
        "nb d'animateurs ": "500",
        "Association porteuse": "La Fresque de la Biodiversité",
        "Site internet": "https://fresquedelabiodiversite.org/",
        Contact:
            "geoffrey.edouard@querceo.fr\ngeraldine.vuillier@gmail.com\ncharles@greentastic.io",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "C’est un atelier ludique et pédagogique pour aider et motiver au passage à l’action pour le climat !\nGrâce à une plateforme web, il permet de se projeter de façon personnalisée (les participants réalisent leur empreinte carbone avant l'atelier et travaillent sur leurs propres données) et d'avoir une approche systémique en incarnant les décideurs nationaux publics et privés, pour arbitrer entre différentes mesures impactant l'ensemble du pays. Le tout sur un ton léger et décomplexé (durant l'atelier, on peut rencontrer Donald Trump, incarner un ministre... ou un dictateur!).",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "EN, PL, NL",
    },
    {
        "Titre de la fresque": "Fresque de la renaissance écologique",
        Logo: "",
        "Date de création": "2014",
        Avancement: "En usage ",
        "Créateur.rice.s": "Julien Dossier  ",
        "nb d'animateurs ": "400",
        "Association porteuse": "Renaissance Écologique",
        "Site internet": "https://www.renaissanceecologique.fr/",
        Contact: "contact@renaissanceecologique.org",
        "Principe / Jouabilité":
            "Atelier collaboratif aux règles propres, utilisant comme support une fresque (au sens artistique)",
        Description:
            "A quoi ressemble un monde qui a réussi sa transition écologique et comment pourrions-nous y parvenir? La fresque de la Renaissance Écologique consiste à construire en intelligence collective des projets pour mener une organisation vers la transition écologique, en s'appuyant sur une adaptation contemporaine de la fresque de Lorenzetti Allégorie et effets du Bon Gouvernement : un dessin en noir et blanc qui représente un monde bas carbone, la ville et la campagne. L’atelier s’adapte à des thématiques particulières, des cibles variées et ouvre le champ des possibles.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "EN IT ESP",
    },
    {
        "Titre de la fresque": "Fresque des Nouveaux Récits",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Alexis KLEIN, Benoît ROLLAND DE RAVEL, Célia FONTAINE, Damien PASQUALI, Laetitia GUIBERT",
        "nb d'animateurs ": "250",
        "Association porteuse": "en nom propre",
        "Site internet": "https://www.fresquedesnouveauxrecits.org/",
        Contact: "fresquedesnouveauxrecits@mailo.fr\nalexis.klein08@gmail.com",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "La Fresque des Nouveaux Récits vise à faire émerger un futur compatible avec les limites planétaires qui soit désirable pour tous en facilitant l’adoption de comportements soutenables grâce à l‘imagination de nouveaux récits.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque des déchets",
        Logo: "N/A",
        "Date de création": "Janvier 2020",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Green Donut (bureau: Genia Oganian, Alice Bourlier, Gautier Vandenbogaerde)",
        "nb d'animateurs ": "162",
        "Association porteuse": "Green Donut",
        "Site internet": "https://www.greendonut.org ",
        Contact: "greendonut.info@gmail.com",
        "Principe / Jouabilité":
            "Similaire à la FDC, avec en plus de la logique des cause à effet, une logique de flux de matières entre les différentes étapes de traitement des déchets.",
        Description:
            '"La Fresque des Déchets" est un atelier basé sur l\'intelligence collective et la coopération invitant les participants à schématiser le devenir de leurs déchets et à approfondir les impacts de leurs habitudes de consommation. Il permet de prendre conscience de notre consommation de ressources au quotidien au travers le prisme des déchets tout en sensibilisant sur les bonnes pratiques de tri et surtout de prévention',
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "IL EST TEMPS",
        Logo: "",
        "Date de création": "2021",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Yann Mouvet et Ninon Dupeuble",
        "nb d'animateurs ": "150",
        "Association porteuse": "Avec Nos Ateliers",
        "Site internet": "www.facebook.com/ilesttemps.jeu",
        Contact: "ilesttemps.jeu@gmail.com",
        "Principe / Jouabilité":
            "Faire en 20 minutes un rapide bilan carbone et voir quelques actions personnalisées",
        Description:
            "Conçu pour les débrief de Fresque du Climat, IL EST TEMPS permet en 20 minutes :\n- de faire un rapide bilan carbone (5 minutes)\n- d'aborder des actions adaptées à son profil (10 minutes)\nAu cours de cette démarche, les participants sont confrontés aux ordres de grandeurs du bilan carbone individuel",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "Version Anglaise en cour de création",
    },
    {
        "Titre de la fresque": "Nos vies bas carbone",
        Logo: "",
        "Date de création": "2019",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Gildas Veret, Claire Veret, Arnaud Brulaire, Francois Joseph Grimault, Mathieu Hestin",
        "nb d'animateurs ": "100",
        "Association porteuse":
            "Association : Inventons nos vies bas carbone (animée par le collectif Résistance Climatique)",
        "Site internet":
            "https://www.resistanceclimatique.org/inventons_nos_vies_bas_carbone",
        Contact: "reseau@resistanceclimatique.org",
        "Principe / Jouabilité":
            'Le jeu "Inventons nos vies bas carbone"🌍 est un outil complémentaire de la Fresque du Climat créé par Résistance Climatique. Il peut être utilisé en support de la Fresque du Climat lors du débrief (20min) et être animé dans des ateliers dédiés (2h-3h et plus).',
        Description:
            "Ce kit donne à voir les ordres de grandeur (hauteur de la marche) de la transition à opérer : 12 t CO2e => <2 t CO2e, visualiser des tonnes de CO2e avec des cartes simples et efficaces : rouler, voler, manger de la viande, consommer, chauffer un logement, etc.) et tout ce qu'on peut va pouvoir faire en plus dans une vie bas carbone. Il y a deux lots de cartes : constats pour comprendre comment la physique du climat nous engage (budget carbone...) et solutions pour voir ce qu'on peut et ce qu'on doit changer pour les engagements pris dans l'accord de Paris, traduits dans la loi (SNBC).",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de l'Alimentation",
        Logo: "",
        "Date de création": "01/01/2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Julien Briton et Thomas Moulin",
        "nb d'animateurs ": "89",
        "Association porteuse": "La Fresque de l'Alimentation",
        "Site internet": "http://fresquealimentation.org/",
        Contact: "julien_briton@yahoo.fr\ncontact@fresquealimentation.org",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "Comprendre les grandes lignes de notre alimentation et les impacts environnementaux, sanitaires et sociaux qu'elle engendre.\nPuis définir ce qu'est une alimentation durable (végétalisée, locale et en agriculture bio).\nComprendre en quoi une alimentation durable améliore la résilience alimentaire.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "EN, Kids",
    },
    {
        "Titre de la fresque": "Fresque du sexisme",
        Logo: "",
        "Date de création": "2021",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Anastasia Dereppe\nAlexis Klein\nAnne Le Corre\nRoxane Depelet\nPauline Roux",
        "nb d'animateurs ": "85",
        "Association porteuse": "Fresque du sexisme",
        "Site internet":
            "Site internet\n\nRéservations\n\nPlaquette présentation",
        Contact: "contact@fresque-du-sexisme.org",
        "Principe / Jouabilité":
            "Similaire à la FDC\nAvec interactions immersives, mises en situation ",
        Description:
            "La Fresque du sexisme est un atelier d'intelligence collective pour détricoter la mécanique sexiste et se projeter dans une société égalitaire.\nLa pédagogie est inspirée de celle de la Fresque du Climat : active, scientifique, collaborative et créative.\n\nLe but de l'atelier est d’accompagner les participant·es dans la compréhension des instances de pouvoirs et d’identifier les moyens d’enrayer la mécanique sexiste.\n\nL'atelier vise aussi à permettre l’expression libre et sécurisée, dans un cadre d’intelligence collective.\nLes participant·es repartent avec un baluchon de concepts et chiffres clés pour accompagner les situations de vie futures.\n\nFormats présentiels et distanciels : en français uniquement.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "Junior en cours",
    },
    {
        "Titre de la fresque": "La fresque du facteur humain",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Jérémy Dumont, Audrey Geradin, Alban Torette",
        "nb d'animateurs ": "80",
        "Association porteuse": "L'université du facteur humain",
        "Site internet": "https://www.linkedin.com/company/79660721",
        Contact: "jeremy@noussommesvivants.co",
        "Principe / Jouabilité":
            "Atelier de 3h sur les facteurs de changement sur la base d'un changement de comportement sélectionné par le groupe",
        Description:
            "La fresque du facteur humain apporte un éclairage sur ce qui est en jeu dans l’évolution de nos comportements face aux transitions en cours. Elle permet de croiser les perceptions et de créer une représentation collective des leviers cognitifs que nous pouvons saisir pour augmenter notre capacité d’agir.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de l'Eau",
        Logo: "",
        "Date de création": "Mai 2021",
        Avancement: "En usage ",
        "Créateur.rice.s": "Sébastien Legrand / Laurie Caillouet",
        "nb d'animateurs ": "50",
        "Association porteuse": "Eau'Dyssée",
        "Site internet": "www.eaudyssee.org",
        Contact: "eaudyssee.asso@gmail.com",
        "Principe / Jouabilité":
            "Similaire FDC, 4 lots de carte puis un débat.",
        Description:
            "1. Cycle de l'eau naturel : reconstruire le cycle de l'eau avec les stocks et les flux associés sur un plateau de jeu, 2. Cycle anthropique : comprendre la notion de prélèvement et de restitution, 3. Impacts activités humaines : impact de 7 activités humaines sur l'eau et son cycle, 4. Impact du changement climatique : mise en place de vignette sur les stocks/flux du jeu 1 pour savoir comment va se répartir l'eau suite au CC",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "oui",
        "Autres langues et versions":
            "Version anglaise en cours de traduction ",
    },
    {
        "Titre de la fresque": "Fresque de l'économie circulaire",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Elsa Bortuzzo & Anne-France Mariacher",
        "nb d'animateurs ": "50",
        "Association porteuse": "La fresque de l'économie Circulaire",
        "Site internet": "https://www.lafresquedeleconomiecirculaire.com/",
        Contact: "fresque.economiecirculaire@gmail.com",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "Comprendre les limites du système de production-consommation linéaire, pour envisager la nécessaire transition vers un modèle plus vertueux, économe en ressources naturelles et moins producteur de déchets. Après une première partie sur les constats, découvrez par quelles opérations passe-t-on d’un modèle à l’autre !",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "EN",
    },
    {
        "Titre de la fresque": "Fresque de la mobilité",
        Logo: "",
        "Date de création": "nov. 2019",
        Avancement: "En usage ",
        "Créateur.rice.s": "Laurent Perron",
        "nb d'animateurs ": "45",
        "Association porteuse": "The Shifters",
        "Site internet": "https://fresquedelamobilite.org",
        Contact: "fresquedelamobilite@theshifters.org",
        "Principe / Jouabilité":
            "Atelier collaboratif aux règles propres en 2 parties.",
        Description:
            "Cet atelier est un outil de sensibilisation et de formation aux enjeux et aux solutions de décarbonation de la mobilité des personnes. Il s'adresse au grand public, mais aussi aux entreprises et aux collectivités.\nIl se déroule en 2 parties. La première permet de décrire de la mobilité actuelle et de ses conséquences, de l'énergie requise aux pollutions sonores ou atmosphériques, tandis que la seconde est un jeu de rôles permettant de balayer les leviers d'action de mobilité bas carbone.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque":
            "Fresque de la RSE / Fresque de l'Impact / Fresque du Développement Durable",
        Logo: "",
        "Date de création": "04/2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Rémi Demersseman (Fondation Oïkos)",
        "nb d'animateurs ": "40",
        "Association porteuse": "M4Impact www.m4impact.org",
        "Site internet": "www.fresquedelarse.org",
        Contact: "contact@fresquedelarse.org",
        "Principe / Jouabilité":
            "Relier des cartes descriptive des organisations, des enjeux et des solutions, puis utiliser des jetons parties prenantes pour se projeter en tant qu'acteur économique et batir un premier plan d'action RSE. ",
        Description: "47 cartes, 15 jetons. https://fresquedelarse.org/",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "comment faire ?",
        "Autres langues et versions": "en cours",
    },
    {
        "Titre de la fresque": "Fresque de l'assurance responsable",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Patrick Conan",
        "nb d'animateurs ": "30",
        "Association porteuse":
            "Collectif AXA pour la planète, France assureur",
        "Site internet": "à venir",
        Contact: "axapourleclimat@axa.fr",
        "Principe / Jouabilité": "Inspiré par la FDC et biodiversité",
        Description:
            "Atelier collaboratif permettant de déterminer les causes / risques / solutions concernant l’assurance pour répondre aux enjeux \r\nclimat / biodiversité à l’aide de cartes pédagogiques et de liens entre elles et de regarder comment cela se traduit dans chaque métier de l’entreprise \r\n",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "Anglais",
    },
    {
        "Titre de la fresque": "Fresque de la Diversité",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Isabelle Bapteste et Guillaume Lenoble de Belugames, Sandie Meusnier et Carine Mira de l’ESSEC.",
        "nb d'animateurs ": "25",
        "Association porteuse": "ESSEC Business School et Belugames",
        "Site internet": "https://fresquedeladiversite.org/",
        Contact: "isabelle@belugames.com, centre-edc@essec.edu",
        "Principe / Jouabilité":
            "Inspirée de la FDC, elle reprend le principe de lots de cartes à relier entre elle de façon logique et propose des animations entre chaque round",
        Description:
            "La Fresque de la Diversité est un outil de sensibilisation qui permet de susciter efficacement des prises de conscience et questionnements sur les enjeux de discriminations et d’inclusion au sein des organisations. Inspirée de la Fresque du Climat, elle prend la forme d’un atelier d’intelligence collective réunissant une dizaine de personnes et un animateur ou une animatrice.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "Version anglaise en cours",
    },
    {
        "Titre de la fresque": "Fresque de la publicité",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Youmatter",
        "nb d'animateurs ": "25",
        "Association porteuse": "À venir\n(association dédiée)",
        "Site internet": "https://www.fresquedelapublicite.org/",
        Contact: "https://www.fresquedelapublicite.org/",
        "Principe / Jouabilité": "",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "Belge",
    },
    {
        "Titre de la fresque": "Mes Solutions Climat",
        Logo: "à venir",
        "Date de création": "septembre 2020",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Little Big Impact, Théolène Cerney et participation de Sophie Pottier",
        "nb d'animateurs ": "25",
        "Association porteuse": "société littlebigimpact.com",
        "Site internet":
            "https://www.littlebigimpact.com/mes-solutions-climat/",
        Contact: "vincent.juilliard@littlebigimpact.com\nsophie@spr-its.me",
        "Principe / Jouabilité":
            "Atelier de 2h, orienté actions individuelles (réduction empreinte carbone + préservation des ressources + sensibilisation autour de soi)\nPeut être utilisé à la suite de la FdC pour un débrief orienté action. Max 8 joueurs par session",
        Description:
            "“Mes Solutions Climat” est un atelier collectif ludique de 2h pour déterminer les écogestes à lancer à votre niveau afin de réduire votre impact carbone et préserver les ressources naturelles. Il peut être utilisé en support de la FdC pour un débrief orienté action",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque Agri’Alim",
        Logo: "",
        "Date de création": "janvier 2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Céline Monthéard, Astrid Tarteret",
        "nb d'animateurs ": "21",
        "Association porteuse": "La Fresque Agri'Alim",
        "Site internet":
            "http://fresqueagrialim.org\nhttps://www.facebook.com/fresqueagrialim\nhttps://www.linkedin.com/company/fresqueagrialim",
        Contact: "contact@fresqueagrialim.org",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "La Fresque Agri’Alim est un atelier participatif pour comprendre les mécanismes qui ont conduit à la formation de notre système agri-alimentaire et les enjeux et menaces auxquels il est confronté. Du champ à l’assiette, il donne une vue d’ensemble objective et scientifique, et permet aux participants d’échanger sur les actions à mener pour tendre vers une alimentation durable pour tous.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "anglais",
    },
    {
        "Titre de la fresque": "Fresque du Sol ",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s": "Afes / ADEME ",
        "nb d'animateurs ": "20",
        "Association porteuse": "AFES",
        "Site internet": "www.afes.fr",
        Contact: "sophie.raous@afes.fr",
        "Principe / Jouabilité":
            "Présenter ce que sont les sols, leur fonctionnement, les enjeux de ler préservation et comment agir pour mieux les préserver ",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque Océane",
        Logo: "",
        "Date de création": "2019",
        Avancement: "En usage ",
        "Créateur.rice.s": "Alice Vitoux",
        "nb d'animateurs ": "20",
        "Association porteuse": "Fresque Océane",
        "Site internet": "https://fresqueoceane.com",
        Contact: "alicevitoux@gmail.com",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "La Fresque Océane est un atelier collaboratif pour sensibiliser à la protection de l'Océan.\nGrâce à 100 cartes, devinez les services écosystémiques de l'Océan, plongez-vous dans la biodiversité marine, mais aussi découvrez les impact des activités humaines comme la pêche, les industries maritimes, le dérèglement climatique ou encore la pollution. Et bien sûr, échangez sur les solutions !\nCet atelier s'adresse aux entreprises, collectivités, associations,... et à tous les citoyens qui veulent en savoir plus sur cet écosystème !",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "EN",
    },
    {
        "Titre de la fresque": "Programme 21 jours d'actions",
        Logo: "pub",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Gaspard Chameroy",
        "nb d'animateurs ": "20",
        "Association porteuse": "Bandes d'Abeilles",
        "Site internet": "https://bandesdabeilles.org",
        Contact: "gaspard@bandesdabeilles.org",
        "Principe / Jouabilité":
            "Programme WhatsApp de 21 jours d'actions écolos. 7 thématiques, 3 niveaux, et des actions illustrées quotidiennes",
        Description:
            "Programme WhatsApp de 21 jours à créer avec son entourage. 7 thématiques, 3 niveaux, et des actions illustrées quotidiennes, sur lesquelles rebondir ensemble !\nPossible de créer sa bande en étant guidé sur le site internet, ou d'en rejoindre une sur frama.link/rejoindre-une-bande",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Carbone à ras",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Avenir Climatique",
        "nb d'animateurs ": "15",
        "Association porteuse": "Avenir Climatique",
        "Site internet":
            "https://educlimat.fr/la-mediatheque/kit-college-lycee/\nou\nhttps://educlimat.fr/carbonaras",
        Contact: "contact@avenirclimatique.org",
        "Principe / Jouabilité":
            "Le jeu permet aux élèves d’établir leur bilan carbone de l’année de manière simplifiée, par empilement de vignettes sur une échelle, en tenant compte de leur comportement de consommation. L’activité permet une compréhension rapide des ordres de grandeur en matière d’émission de gaz à effet de serre.\nCe jeu se compose d’un plateau et d’un jeu de carte à imprimer, représentant différents postes d’émission de carbone. ",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Carbonomètre",
        Logo: "",
        "Date de création": "2021",
        Avancement: "En usage ",
        "Créateur.rice.s": "Avenir Climatique",
        "nb d'animateurs ": "15",
        "Association porteuse": "Avenir Climatique",
        "Site internet":
            "https://educlimat.fr/la-mediatheque/kit-college-lycee/\nou\nhttps://educlimat.fr/Carbonometre-general",
        Contact: "contact@avenirclimatique.org",
        "Principe / Jouabilité":
            "Le Carbonomètre est un jeu de cartes pédagogique qui propose de classer différentes activités selon leurs impacts carbone.\nInspiré du jeu « Timeline » dans sa mécanique, le but est de placer les cartes les unes après les autres par rapport à celles déjà présentes.",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de l'événementiel",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Réseau éco événement",
        "nb d'animateurs ": "15",
        "Association porteuse": "Réseau éco événement / REEVE",
        "Site internet":
            "https://www.reseau-eco-evenement.net/fresquedelevenementiel\nhttps://www.reseau-eco-evenement.net/fresqu-event/",
        Contact: "bonjour@reseau-eco-evenement.net",
        "Principe / Jouabilité":
            "Faire le lien entre activités d'organisation d'un événement et impacts écologiques, économiques et sociaux",
        Description:
            "A vous qui organisez un événement culturel, sportif, pro, familial ou autre. Agence, donneur d'ordres, prestataire ou étudiant. Pour comprendre comment les événements contribuent aux déréglements climatiques et sociétaux et peuvent également devenir des acteurs de la transition écologique et solidaire",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la construction",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Renaud Bonnel, Martin Dubourg, Laura Lecable, Frédérique Triballeau Sylvain Grisot, Sébastien Lortolary, Cyril Retourné, Anais Radepont, Guillaume Menet, Thimothée Marais, ologa Gogoleva , Frederic Bourgeon",
        "nb d'animateurs ": "15",
        "Association porteuse": "La fresque de la construction",
        "Site internet":
            "https://www.fresquedelaconstruction.org/\n\nhttps://www.linkedin.com/company/la-fresque-de-la-construction/",
        Contact: "renaudbonnel@gmail.com",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "Cette fresque s'adresse a tous les acteurs de la ville , l'urbain et la construction mais aussi a chaque citoyen. Il permet de comprendrre ou se cachent les gaz a effet de serre dasn nos constructions moderne. L'atelier aidera également les participant a identifer les levier d'action pouir changer nos facons de construire et d'habiter.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "EN",
    },
    {
        "Titre de la fresque": "Fresque de la Montagne",
        Logo: "N/A",
        "Date de création": "janv. 2021",
        Avancement: "En création",
        "Créateur.rice.s": "Natur'Adapt, gestionnaires d'ENP, Nicolas Boillot",
        "nb d'animateurs ": "15",
        "Association porteuse": "en nom propre",
        "Site internet": "",
        Contact: "nicolasboillot@yahoo.com",
        "Principe / Jouabilité":
            "Dessin collectif pour représentation de l'imaginaire, Cartes d'impacts pour vue systèmique, Cartes exemples pour l'application aux territoires",
        Description:
            "''Un atelier collaboratif de 2h qui permet de comprendre de manière systémique l'impact des pressions humaines sur le milieu montagnard, avec des exemples déclinés par massifs. Il offre aussi un espace de discussion -entre habitants, acteurs politiques et économiques..ou simples amoureux de la montagne- pour envisager des solutions concrètes d'atténuation ou d'adaptation, en s'inspirant de celles déjà existantes''",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "la Fresque des Low-techs",
        Logo: "",
        "Date de création": "déc. 2020",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Low-tech lab Montréal + autres membres du LTL en France",
        "nb d'animateurs ": "15",
        "Association porteuse": "Low-tech lab Montréal",
        "Site internet": "https://fresquedeslowtechs.org/",
        Contact: "fresquelowtechs@outlook.com",
        "Principe / Jouabilité":
            "7 catégories qui définissent la low-tech à trouver, en s'aidant des cartes de chaque lots",
        Description:
            "(non)soutenabillité des technologies au point de vue environnemental et social, d'un point de vue économique et général, et solution low-tech",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "version expert",
    },
    {
        "Titre de la fresque":
            "PSI Climat : Puzzle des Solutions Individuelles Climat",
        Logo: "",
        "Date de création": "2021",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Benoit Marienval\nAurélien Deragne\nThierry Sifodil",
        "nb d'animateurs ": "15",
        "Association porteuse": "N/A",
        "Site internet": "https://billetweb.fr/pro/psiclimat",
        Contact: "psi.climat@gmail.com",
        "Principe / Jouabilité":
            'Jeu de plateau type "Puzzle" en challenge par équipe',
        Description:
            "L'objectif du PSI est de vous permettre de connaître en détail et de manière ludique la situation française en termes d'émissions de gaz à effet de serre ainsi que de vous donner des clés d'actions efficaces pour diviser par deux l'empreinte carbone moyenne des français·es dès 2025.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "FR",
    },
    {
        "Titre de la fresque": 'Atelier "Notre Tour',
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Fabien Lopez - Joel Grea - Mush",
        "nb d'animateurs ": "10",
        "Association porteuse": "Mush ",
        "Site internet": "www.wearemush.com",
        Contact: "fabien@wearemush.com",
        "Principe / Jouabilité":
            "“Notre Tour” s’inspire du mécanisme du Jenga, et utilise une tour de Kapla représentant notre monde en 4 systèmes construits les uns sur les autres : système Climat comme base de la tour, biodiversité par dessus, ressources fossiles au-dessus et économie trônant sur ces 3 derniers.",
        Description:
            "Avec Mush, le mouvement visant à unir et aider 1 milliard de personnes pour stabiliser le climat et restaurer la biodiversité, nous venons tout juste de créer un nouveau jeu sur les enjeux environnementaux/systémiques ! \n\nPendant le jeu, les joueurs fontt évoluer “Notre Tour” suivant les données historiques pour chaque système, de 1850 à aujourd'hui, en 8 tours, avec pleins de cartes racontant des faits historiques sur l'énergie, le climat, le vivant, l'économie, les alertes scientifiques, la culture etc..\n\nCe jeu utilise l'histoire, les émotions et le jeu, comme leviers d'acquisition des enjeux.\r\n\r\nRestera-t-elle en équilibre ?\r\n",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Yes !",
        "Apparaît sur la fresque RE": "Yes !",
        "Autres langues et versions": "Fr uniquement pour l'instant",
    },
    {
        "Titre de la fresque": "Fresque de la Politique",
        Logo: "A venir",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s":
            "Anatole Raverbori, Lise Dargentolle, Gaspard Chameroy",
        "nb d'animateurs ": "10",
        "Association porteuse": "",
        "Site internet": "",
        Contact: "fresquedelapolitique@gmail.com",
        "Principe / Jouabilité":
            "Ce serious game axé sur la politique a l'objectif de permettre aux citoyens de tous horizons et de tous âges de s'impliquer davantage dans la vie politique et de contribuer à un changement positif dans la société. Le jeu vise à encourager la participation citoyenne, l'échange d'idées et la prise de conscience des enjeux politiques actuels.",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "Oui",
        "Autres langues et versions": "Français",
    },
    {
        "Titre de la fresque": "Fresque des ressources minérales",
        Logo: "N/A",
        "Date de création": "2021",
        Avancement: "En création",
        "Créateur.rice.s": "Philippe Lionel EBENGUE ATEGA",
        "nb d'animateurs ": "10",
        "Association porteuse": "VULGARYS",
        "Site internet": "vulgarys.com",
        Contact: "",
        "Principe / Jouabilité": "",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque du textile",
        Logo: "N/A",
        "Date de création": "Janvier 2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Green Donut",
        "nb d'animateurs ": "10",
        "Association porteuse": "Green Donut",
        "Site internet":
            "https://www.greendonut.org \nhttps://www.facebook.com/GreenDonut/?ref=br_rs\nhttps://www.linkedin.com/company/greendonut/?viewAsMember=true",
        Contact: "greendonut.info@gmail.com",
        "Principe / Jouabilité":
            "Similaire à la FDC, avec en plus de la logique des cause à effet, une logique de flux de matières entre les différentes étapes de traitement des déchets.",
        Description:
            "\"La Fresque du Textile\" est un atelier basé sur l'intelligence collective et la coopération invitant les participants à schématiser l'ensemble de chaîne de valeur de l'industrie du textile, de la production à la fin de vie en passant par le cycle d'usage. Il permet de prendre conscience des impacts environnementaux et sociaux de ce secteur tout en sensibilisant sur les bonnes pratiques de choix et d'utilisation du textile.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "English",
    },
    {
        "Titre de la fresque": "Fresque de l'Energie",
        Logo: "",
        "Date de création": "Janvier 2021",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Gregory Kotnarovsky, Antoine Rabain, Arnaud VBB , Brice Quentin, Nicolas Julien, Clément Espaze, Fred Aubert",
        "nb d'animateurs ": "7",
        "Association porteuse": "Association loi 1901",
        "Site internet": "",
        Contact: "antoine.rabain@geckosphere.fr",
        "Principe / Jouabilité": "5 modules ; des cartes ; des flèches",
        Description:
            "Objectif : sensibiliser toutes les parties prenantes sur l’enjeu énergie-ressources-climat\nUne approche modulaire permettant de proposer une “Fresque de l'Energie socle en 2h30 pour tous”  : 5 modules \nEt à terme d'autres modules d’approfondissement en fonction du temps disponible et du public (sachant ou non : politiques, académiques, entreprises, …)",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "OK",
        "Autres langues et versions": "Next step : ENG",
    },
    {
        "Titre de la fresque": "Fresque du Tourisme / voyage",
        Logo: "à venir",
        "Date de création": "2020",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Corinne Dos Santos / PA / Victoria Morin",
        "nb d'animateurs ": "7",
        "Association porteuse": "La Fresque du Tourisme",
        "Site internet": "",
        Contact: "lafresquedutourisme@gmail.com",
        "Principe / Jouabilité": "Similaire FdC / FdN / FO / FdECirc",
        Description:
            "Inspirée originellement de la \"Fresque du Climat\" mais davantage de la FO et FdN, cet atelier collaboratif sensibilise aux enjeux du tourisme tel qu'il existe aujourd'hui en majorité, en approfondissant les limites et risques de cette industrie qui impacte tous les milieux et domaines, on comprend la nécessité d'une nouvelle vision du voyage, plus vertueuse. Alors... quelles solutions existent ou sont à développer/imaginer ?\nCette fresque s'adresse a toutes les actrices et acteurs de l'industrie du tourisme et du voyage, à toutes les curieuses et curieux qui s'interrogent sur comment s'évader avec plaisir et consonnance cognitive liée à l'écologie, la santé et l'éthique.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "OK",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la monnaie",
        Logo: "En création",
        "Date de création": "2021",
        Avancement: "En création",
        "Créateur.rice.s":
            "Tiphaine Langlois, Stéphan Sain Léger, Charles Lesage (et l'équipe du Mouvement Sol)",
        "nb d'animateurs ": "6",
        "Association porteuse": "Mouvement SOL - Monnaies Locales Citoyennes",
        "Site internet": "fresquedelamonnaie.org",
        Contact: "fresquedelamonnaie@sol-reseau.org",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "Cette Fresque de la Monnaie permet aux participants de comprendre la monnaie, son histoire, la notion de création monétaire et les alternatives aux fragilités de l’économie. Ces thématiques seront abordées par les participants durant 3 heures riches en découvertes et en échanges !",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "non",
    },
    {
        "Titre de la fresque": "L'atelier des sols vivants ",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s":
            "Sparknews (Alicia Beranger, Christian de Boisredon, Elvire Laurans, Lucas Von Thümen) Corentin Bisot, Morgane van Dam",
        "nb d'animateurs ": "6",
        "Association porteuse": "Ludi Soli | Atelier des sols vivants ",
        "Site internet": "https://www.ateliersolsvivants.org/fr/accueil",
        Contact: "ateliersolsvivants@gmail.com aberanger@sparknews.com",
        "Principe / Jouabilité":
            "Similar to FDC, 3 phases and a debate. The first phase dives into the soil system, the second pahase on human activity and the third on degradation.",
        Description:
            "L’atelier des sols vivants est un outil ludique et collaboratif qui vise à diffuser un langage commun sur le fonctionnement des sols et sur les enjeux liés à leur préservation.\n\nL’atelier des sols vivants, au travers de 30 cartes et en 2h, permet d’acquérir les connaissances fondamentales sur les sols - la vie qu’ils renferment & les cycles dont ils sont un éléments clé -  de comprendre les impacts des pratiques agricoles et d’ouvrir une discussion fertile sur les actions à mener pour engager la société vers une meilleure gestion de cette ressource finie.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "yes",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "ENGLISH",
    },
    {
        "Titre de la fresque": "Fresque des besoins",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Mathilde Rousselon",
        "nb d'animateurs ": "5",
        "Association porteuse": "Conscience et Impact Ecologique",
        "Site internet": "https://association-cie.fr",
        Contact: "mathilde.rousselon@association-cie.fr",
        "Principe / Jouabilité":
            "En plein dans l'écologie politique, cet atelier propose aux participant·es de classer des cartes dans une catégorie parmi : les besoins authentiques, les besoins qualitatifs et les besoins artificiels. Le but est de comprendre comment la société de consommation a créé des besoins uniquement pour des logiques de profits.",
        Description:
            "A l’heure où notre société balance entre le développement du numérique et la sauvegarde d’espèces menacées par l’activité humaine, la question de la définition de nos \"besoins\" pour vivre en accord avec les ressources naturelles n'a jamais été aussi urgente. A travers cet atelier de réflexion collaboratif, vous découvrirez les différentes catégories de besoins et tenterez de les classer. Alors, est ce qu'avoir un smartphone est un besoin authentique ? Est ce qu'aller au cinéma est un besoin artificiel ? C'est à vous d'en décider et d'en débattre ! \n\n",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "/",
    },
    {
        "Titre de la fresque": "Fresque des Possibles",
        Logo: "A venir",
        "Date de création": "novembre 2020",
        Avancement: "En usage (kit d'animation et de formation à venir)",
        "Créateur.rice.s": "Association Le Lieu-Dit ",
        "nb d'animateurs ": "5",
        "Association porteuse":
            "Le Lieu-Dit (Collectif de personnes et structures qui agissent pour les transitions sur le Pays de Brest)",
        "Site internet": "https://www.lelieudit.fr/la-fresque-des-possibles/",
        Contact: "contact@lelieudit.fr",
        "Principe / Jouabilité":
            "Une animation collaborative pour identifier et partager des solutions concrètes et locales, pour se nourrir, se déplacer, s’équiper, se loger etc, de façon plus durable, solidaire et moins chère. Inspiré du principe des cartes comme support d'échange par les autres Fresques, notamment FDC.",
        Description:
            "La Fresque des Possibles est une animation collaborative pour identifier et partager des solutions concrètes et locales, pour se nourrir, se déplacer, s’équiper, se loger etc, de façon plus durable et solidaire, mais aussi moins chère. La Fresque des Possibles permet plusieurs choses : découvrir les acteurs et initiatives de son territoire (une cartographie en ligne des initiatives locales est réalisée grâce aux apports des participants ici : https://ferme.yeswiki.net/lelieudit/?PagePrincipale) ; échanger autour de ses habitudes et difficultés pour faire évoluer ses pratiques au quotidien (et potentiellement trouver des solutions alternatives qui soient plus adaptées à chacun) ; témoigner autour de son expérience personnelle et partager ses bons plans et astuces pour s'entraider entre participants et valoriser ce qui est déjà réalisé ; donner envie de s'impliquer et d'aller plus loin en identifiant des solutions adaptées aux besoins, envies et situations personnelles de chacun des participants (lieu de vie, moyens financiers, situation familiale....). Un projet de recherche-action sur l'évolution des comportements est en cours, en partenariat avec le LABERS (Laboratoire de sociologie de l'UBO à Brest). La Fresque des Possibles se décline sous forme d'ateliers thématiques (Se nourrir / Se déplacer / S'équiper + d'autres sont en cours de développement comme Habiter) qui peuvent durer jusqu'à 3h selon les objectifs (généralement il s'agit d'ateliers de 2h ou 2h30 - il est possible d'y ajouter un débriefing lorsqu'il s'agit d'une Fresque réalisée au sein d'une équipe de salariés par exemple, pour identifier des actions à mener). Pour favoriser les échanges entre pairs et permettre à chacun de s'exprimer suffisamment, nous limitons le nombre de participants à 10/15 personnes par atelier. La Fresque des Possibles peut s'adapter à chaque territoire, et un projet de création de kit d'animation et de formation est en cours pour pouvoir la diffuser à partir de 2024.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "OK",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "Non",
    },
    {
        "Titre de la fresque": "Fresque du transport aérien",
        Logo: "N/A",
        "Date de création": "fév 2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "ENAC, SUPAERO, Nicolas Gourdain, Nicolas Boillot",
        "nb d'animateurs ": "5",
        "Association porteuse": "N/A",
        "Site internet": "N/A",
        Contact: "nicolasboillot@yahoo.com",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "Cet atelier, basé sur de solides bases scientifiques et sur l'intelligence collective, questionne les interactions entre le transport aérien et le changement climatique, sa place dans la société et les éléments de réponse aux enjeux à venir",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque des Risques Systémiques Globaux",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s": "",
        "nb d'animateurs ": "4",
        "Association porteuse": "STEEP",
        "Site internet": "",
        Contact: "antonin.berthe@inria.fr",
        "Principe / Jouabilité":
            "Décrire les RSG, et se projeter dans des scénarios",
        Description:
            "- Constituer une toile d’interactions d’éléments significatifs de la structure des sociétés industrialisées vis à vis des risques systémiques globaux \n- Scénariser des [effondrements/perturbations significative de l’activité concernée] de certains éléments en réflechissant aux impacts sur d’autres éléments",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "ok",
        "Apparaît sur la fresque RE": "pas encore",
        "Autres langues et versions": "anglais",
    },
    {
        "Titre de la fresque": "Le Jeu du Système",
        Logo: "",
        "Date de création": "mars 2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Florent Nobelen",
        "nb d'animateurs ": "4",
        "Association porteuse": "Le Jeu du Système",
        "Site internet": "www.lejeudusysteme.org",
        Contact: "lejeudusysteme@gmail.com",
        "Principe / Jouabilité":
            "Atelier collaboratif aux règles propres où les joueurs construisent un système durable et résilient sur les plans énergétique, économique, financier et politique.",
        Description:
            "Faire le jeu du Système... ou en bâtir un nouveau, permettant de prévenir et d'être résilient aux différentes crises économiques, financières, sanitaires et bien sûr climatique. Pour cela, tous les aspects du système seront adressés : énergie, finance, économie, politique, etc. et guidés par une cinquantaine de cartes, les joueurs bâtissent ce nouveau système durable et résilient",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la collaboration",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Care RH - Vincent Couillerot",
        "nb d'animateurs ": "3",
        "Association porteuse": "Care RH",
        "Site internet": "www.carerh.fr",
        Contact: "vincent@carerh.fr",
        "Principe / Jouabilité":
            "En mobilisant l'intelligence collective du groupe, La Fresque de la Collaboration permet à toutes les organisations de s'approprier le sujet d'une collaboration positive et durable. En retraçant les liens de cause à effets, les participants peuvent prendre conscience et comprendre les enjeux de la collaboration dans leur globalité",
        Description:
            "Amener un collectif à prendre conscience de ses difficultés de fonctionnement pour améliorer sa collaboration\nRSE sociale, performance sociale de l'entreprise pour générer de la performance économique, leviers d'attractivité, fidélisation des salariés, marque employeur \nFinalité  : stoper les comportements toxiques, les facteurs de dégradation de la santé mentale et facteurs de non performance sociale et éco. Développer les actions verteuses pour promouvoir l'ecologie des relations humaines au travail",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "non",
    },
    {
        "Titre de la fresque": "Fresque de la Rénovation ",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage (kit d'animation et de formation à venir)",
        "Créateur.rice.s": "Xavier Gaucher",
        "nb d'animateurs ": "3",
        "Association porteuse": "Fresque de la Rénovation",
        "Site internet": "www.fresquedelarenovation.org",
        Contact: "contact@fresquedelarenovation.org",
        "Principe / Jouabilité":
            "Les enjeux, les étapes et les bénéfices de la rénovation énergétique des bâtiments",
        Description:
            "6 lots de 43 Cartes + 1 lot de 4 cartes pour les copropriétés - Déroulé de l'atelier sur 2 heures",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la QVT",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Emmanuelle Bessez",
        "nb d'animateurs ": "3",
        "Association porteuse": "WUNJO",
        "Site internet": "www.fresquedelaqvt.com",
        Contact: "emmanuelle@wunjo.life",
        "Principe / Jouabilité":
            "Une conférence interactive et deux ateliers coopératifs (état des lieux partagé et plan d’actions concerté) facilités par la technique du forum ouvert et une application de gestion de l’interactivité. Les contributions sont retranscrites sur une fresque dans le sens artistique du terme (scribbing / facilitation graphique). Durée : 1 journée",
        Description:
            " La Fresque de la QVT est une solution pour, en un temps court, sensibiliser aux enjeux de la QVT et impulser une démarche d’amélioration responsabilisante. Un objectif : mieux prendre soin du bien-être des Travailleurs.ses. La Fresque de la QVT est à la fois outil d’éducation sur ce sujet sensible à la croisée des performances sociale & économique, un levier de culture des valeurs bienveillance et responsabilité, un espace de di",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "FR + EN",
    },
    {
        "Titre de la fresque": "Fresque du film",
        Logo: "A venir",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s":
            "Juliette Vigoureux (Pilote), Charles Gachet-Dieuzaide, Fanny Valembois",
        "nb d'animateurs ": "3",
        "Association porteuse":
            "Oxalis (coopérative d'entrepreneurs, champ de l'ESS)",
        "Site internet": "à venir",
        Contact: "juliettevigoureux@gmail.com",
        "Principe / Jouabilité": "",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "pas à ce jour !",
    },
    {
        "Titre de la fresque": "Fresque du Plastique",
        Logo: "",
        "Date de création": "2021",
        Avancement: "En usage ",
        "Créateur.rice.s": " Philippe Reutenauer, Eva Moreau, Manon Lisiecki",
        "nb d'animateurs ": "3",
        "Association porteuse": "La Fresque du Plastique",
        "Site internet": "https://fresqueduplastique.fr/",
        Contact: "contact@fresqueduplastique.com",
        "Principe / Jouabilité": "Similaire à la FdC",
        Description:
            "La Fresque du Plastique vise à donner une vue d'ensemble des problèmes liés à l'utilisation du plastique et de mettre les participants sur la voie des solutions à ces problèes. La fresque s'attachera particulièrement à souligner l'ampleur (et l'urgence) des problèmes, à identifier les sources de ces problèmes (dans les pays où les systèmes de gestion des dechets sont déficients vs le reste du monde), et à rendre plus transparentes certaines terminologies telles que le bioplastique, le social plastic ou encore l'ocean-bound plastic",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui ",
        "Apparaît sur la fresque RE": "Oui",
        "Autres langues et versions": "Oui",
    },
    {
        "Titre de la fresque": "Atelier OGRE",
        Logo: "",
        "Date de création": "Décembre 2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Grégory Kotnarovsky",
        "nb d'animateurs ": "2",
        "Association porteuse": "N/A",
        "Site internet":
            "-https://laconsciencedesetudiants.fr/atelier-ogre/\n-https://www.linkedin.com/company/71186669",
        Contact: "grandeur.energies@gmail.com",
        "Principe / Jouabilité":
            "Un atelier ludique, joué en équipe, pour découvrir les ordres de grandeur des énergies.",
        Description:
            "L'atelier OGRE est un serious game pour comprendre les ordres de grandeur des énergies.\nEn 3 heures et en équipe, les participant-e-s tentent d'équilibrer leur consommation avec des moyens de production d'énergie \"durable\", tout en maîtrisant leur budget.\nPour ajouter une dimension \"gaming\" à l'atelier, chaque solution choisie apporte des points pour faire gagner son équipe.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "oui",
        "Autres langues et versions":
            "Non mais Flo est dessus. Un grand merci pour ton engagement sans faille et totalement bénévole. Il attaque le suédois dans deux semaines. Et merci aussi pour la collecte et transfert des données dans l'outil.",
    },
    {
        "Titre de la fresque":
            "Fresque de l'Agroforesterie / Agriculture Regénérative",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s":
            "Création : Andréa Imbert (design) et Emma Joseph-Oudin (conception) avec la participation de Jules Castro et Pierre Candelon.",
        "nb d'animateurs ": "2",
        "Association porteuse": "PUR Projet (B Corp)",
        "Site internet": "",
        Contact: "",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "La Fresque de l’Agroforesterie est un jeu pédagogique créé et déposé par PUR Projet, permettant d’explorer le concept d’agroforesterie, comprendre son intégration dans le paysage et ses bénéfices. Le jeu est librement inspiré de la Fresque du Climat créée par Cédric Ringenbach. \nPrévu pour 10 joueurs, l’atelier de la Fresque du l’Agroforesterie repose sur l’intelligence collective pour permettre aux joueurs de positionner les cartes du jeu de façon collaborative. La fresque est constituée d’une cinquantaine de cartes, réparties en cinq lots qui sont distribués aux joueurs au fur et à mesure de la partie. Une partie se déroule en deux temps. Dans un premier temps, le jeu reconstitue un paysage conventionnel qui permet de placer les premiers lots et comprendre les enjeux économiques, sociaux et environnementaux posés par le modèle agricole actuel. Ensuite, les lots suivants introduisent l’agroforesterie dans le paysage et permettent d’en comprendre les bénéfices. \nAprès la distribution de chaque lot, les joueurs lisent et positionnent ensemble les cartes sur la table de jeu. L’animateur intervient pour proposer des corrections, réexpliquer les liens de cause à effet entre les cartes et distribue le lot suivant.\n",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "oui",
        "Autres langues et versions": "En cours",
    },
    {
        "Titre de la fresque": "Fresque de l'Électricité",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Youenn Rougetet\nMartin Weber",
        "nb d'animateurs ": "2",
        "Association porteuse": "UFE",
        "Site internet": "",
        Contact: "youenn.rougetet@ufe-electricite.fr",
        "Principe / Jouabilité":
            "Présenter le fonctionnement du système électrique français et le rôle de l'électricité dans l'atteinte de la neutralité carbone",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la biodiversité cultivée ",
        Logo: "A venir ",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s": "Estelle Serpolay et Emma Flipon ",
        "nb d'animateurs ": "2",
        "Association porteuse":
            "Oxalis (coopérative d'entrepreneurs, champ de l'ESS), D'une graine aux autres ",
        "Site internet": "A venir ",
        Contact: "emmaflipon@protonmail.com",
        "Principe / Jouabilité": "",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Permaculture",
        Logo: "N/A",
        "Date de création": "2020",
        Avancement: "En création",
        "Créateur.rice.s": "w",
        "nb d'animateurs ": "2",
        "Association porteuse": "UPP",
        "Site internet": "N/A",
        Contact: "nadine@gobelinette.com",
        "Principe / Jouabilité":
            "Mix FdC /Fresque de la Renaissance écologique (phasages",
        Description:
            "En developpement, cet atelier d'intelligence collective vise à créer des outils souples pour transmettre des notions de permaculture en réponse à différents enjeux de problématiques systémiques.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Taxonomie",
        Logo: "",
        "Date de création": "mai 2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Benjamin VINCENT",
        "nb d'animateurs ": "2",
        "Association porteuse": "La Fresque de la Taxonomie",
        "Site internet": "A venir",
        Contact: "fresquedelataxonomie@gmail.com",
        "Principe / Jouabilité":
            "Similaire à la Fresque du Climat. Version 3h à partir d'une feuille blanche ; ou version 1h sur fresque puzzle prétracée",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "Non",
        "Autres langues et versions": "Pas pour le moment",
    },
    {
        "Titre de la fresque": "Fresque de la ville",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": " Frédérique Triballeau Sylvain Grisot,",
        "nb d'animateurs ": "2",
        "Association porteuse": "Société dixit.net",
        "Site internet": "https://dixit.net/fresque/",
        Contact: "sylvain.grisot@dixit.net",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "Basé sur le concept de La Fresque du Climat , la fresque de la ville 🧩 est un outil pédagogique de plus pour aider les élus et les personnes en charge de penser la ville de reprendre la pédagogie du problème",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "x",
    },
    {
        "Titre de la fresque": "Fresque du Cosmos",
        Logo: "N/A",
        "Date de création": "2020",
        Avancement: "En création",
        "Créateur.rice.s": "Anastasia Dereppe & Benoit Marienval",
        "nb d'animateurs ": "2",
        "Association porteuse": "Essaim d'avenir",
        "Site internet": "",
        Contact: "contact@essaim-avenir.fr ",
        "Principe / Jouabilité": "",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque":
            "Fresque du désastre/ fresque des réseaux énergétiques",
        Logo: "",
        "Date de création": "2021",
        Avancement: "En création",
        "Créateur.rice.s": "La chose",
        "nb d'animateurs ": "2",
        "Association porteuse": "La chose",
        "Site internet": "lachose.noblogs.org",
        Contact: "lachose@riseup.net",
        "Principe / Jouabilité":
            "sur le mode de jeu de la FDC avec quelques ajouts",
        Description:
            "Représentation du désastre énergétique en cours à travers les réseaux d'élec, de gaz de pétrole, leurs interconnections. Les liens au colonialisme, les luttes présentes à toutes les échelles des réseaux et les impacts environnementaux de ces infrastructures. Visibilisation de la centralité des entreprises responsables du désastre",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)":
            " discuter avec nous !",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque du Handicap",
        Logo: "à venir",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s":
            "Clément Blanchy, Capucine Blanchard, Rashel Reguigne, Alexandre Gomes ...",
        "nb d'animateurs ": "2",
        "Association porteuse":
            "Handiroad et Novasanco (agence de communication et entreprise adaptée)",
        "Site internet": "à venir : https://fresque-du-handicap.fr/ ",
        Contact:
            "contact@novasanco.fr \nclement.blanchy@priordeveloppement.com",
        "Principe / Jouabilité": "Inspiré de la FDC (+ d'infos à venir)",
        Description:
            "Sensibiliser, collaborer, débattre pour faire un panorama du handicap\nC’est un atelier collaboratif, convivial et ludique pour démystifier et comprendre le sujet du handicap (préjugés, conséquences, solutions…) en 3h. \n",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "à venir",
    },
    {
        "Titre de la fresque": "Fresque du passage à l'action",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s": "Florence et Didier Robert",
        "nb d'animateurs ": "2",
        "Association porteuse": "",
        "Site internet": "www.termater.fr",
        Contact: "florence@termater.fr",
        "Principe / Jouabilité":
            "(Re)mettre du sens dans sa vie et passer à  l'action. Inspiré de la FDC",
        Description:
            "Participer à cette fresque permet de se projeter dans l'avenir de façon personnalisée, réaliste et concrète. Il s'adresse à tous, et particulièrement à celles et ceux qui sont inquiets face aux enjeux actuels. Ensemble, nous allons clarifier ce qui est possible en restant au plus près de sa propre énergie et de ses convictions.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque Humanité 3.0",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s":
            "Christine Marsan/Robert de Quelen / Isabelle Desrosiers/Jérôme Lazard",
        "nb d'animateurs ": "2",
        "Association porteuse": "Alter'Coop",
        "Site internet": " https://www.humanite3-0.com",
        Contact: "christinemarsan13@gmail.com",
        "Principe / Jouabilité":
            "Faire prendre conscience des freins au changement et comment les dépasser pour agir et agir face aux enjeux climatiques, économiques et sociaux",
        Description:
            "Lancement le 30 juin 2022 (plus de détails prochainement)",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque Jeunesse - Handicap",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Isabelle MAURON\nMarion RAUDE",
        "nb d'animateurs ": "2",
        "Association porteuse": "Association SolAir Laboratoire de Créativité",
        "Site internet":
            "https://www.solairlab.org/la-fresque-jeunesse-handicap/",
        Contact: "solairlab@gmail.com",
        "Principe / Jouabilité":
            "inspiré de la fresque de la biodivertsité et la fresque de la foret",
        Description:
            " sensibiliser pour  susciter des prises de conscience et questionnements sur les enjeux liés à l’enfance (6-17 ans) et aux handicaps. Tout le monde peut participer (association famille et d'usager, soignants, éducateurs, acteur du milieu social, citoyens, etc.). Atelier de 3 heures pour les adultes et adolescents. Ateliers ludique adapté pour les 7-11 ans avec utilisation du dessin sous toute ces formes",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "oui",
        "Autres langues et versions": "dans un deuxieme temps + braille + LSF",
    },
    {
        "Titre de la fresque": "La Fresque de l'Innovation Frugale",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Patrick Noel, Fakrou Akbaraly",
        "nb d'animateurs ": "2",
        "Association porteuse": "WeBoostYourProject.com",
        "Site internet": "lafresquedelinnovationfrugale.com    ",
        Contact:
            "Contact@LaFresquedelInnovationFrugale.com Patrick.Noel@WeBoostYourProject.com, Fakroudine.Akbaraly@WeBoostYourProject.com",
        "Principe / Jouabilité":
            "Format QUIZ  90 min + Jeu complet 180min  avec Plan d'Actions à la fin",
        Description:
            "Comment Faire Mieux avec Moins ?   La Fresque de l'Innovation Frugale intègre l'ensemble des contraintes actuelles planétaires et du climat pour construire/innover au quotidien dans tous les domaines un monde durable, bas carbone, inclusif, réaliste et désirable. Soutien ONG Fort",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Ok",
        "Apparaît sur la fresque RE": "ok",
        "Autres langues et versions": "Version UK en cours",
    },
    {
        "Titre de la fresque": "Quiz de l'Anthropocène",
        Logo: "",
        "Date de création": "nov. 2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Matthieu Massart, Raphaël Odini",
        "nb d'animateurs ": "2",
        "Association porteuse": "Quiz de l'Anthropocène",
        "Site internet": "quizanthropocene.fr",
        Contact: "contact@quizanthropocene.fr",
        "Principe / Jouabilité": "https://www.facebook.com/quizanthropocene",
        Description:
            "Un site de jeu de questions / réponses, organisées par quiz thématiques, pour rassembler des connaissances sourcées, non militantes, et les partager au plus grand nombre sous une forme abordable, concise et plutôt ludique. Et indirectement, d'inviter à s'interroger sur la soutenabilité de nos modes de vie et à se lancer dans des changements concrets dans sa vie. ",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de l'Economie Dette",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Maxime Mazouth-Laurol",
        "nb d'animateurs ": "1",
        "Association porteuse": "La Fresque de l'Economie Dette",
        "Site internet": "https://fresquedeleconomiedette.org",
        Contact: "maxime.mazouth-laurol@fdn.fr",
        "Principe / Jouabilité": "Similaire Fdc",
        Description:
            "Cette Fresque a pour but d'expliciter les mécanismes de notre économie basée sur la dette, les facteurs (il)légitimes d'endettement d'un Etat, la notion de patrimoine comme richesse et l'impact de notre système économique sur l'environnement",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la sobriété énergétique",
        Logo: "",
        "Date de création": "août 2021",
        Avancement: "En usage ",
        "Créateur.rice.s": "Aymeric Barrault",
        "nb d'animateurs ": "1",
        "Association porteuse": "en nom propre",
        "Site internet": "en cours",
        Contact: "aymeric.barrault@gmail.com",
        "Principe / Jouabilité": "Similaire à la FdC",
        Description:
            "La Fresque de la sobriété énergétique interroge nos usages et consommations d'énergie au quotidien dans le secteur des bâtiments. 1 secteur très carboné qui pèse lourd (40% de l'énergie finale consommée en France). Cette Fresque s'adresse à chacun, concerné chez soi ou au bureau. Basée sur des données de référence (Ademe, SNBC, Négawatt...) elle vise à donner des clés pour tendre vers la sobriété énergétique en soulignant l'ampleur du gaspillage dans les bâtiments (chauffage, éclairage, clim), l'importance des occupants et le recours à des énergies à faible intensité carbone et renouvelables. ",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui ",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Vigne et du Vin",
        Logo: "",
        "Date de création": "01/04/2021",
        Avancement: "En création",
        "Créateur.rice.s": "Julien Briton",
        "nb d'animateurs ": "1",
        "Association porteuse": "N/A",
        "Site internet": "",
        Contact: "julien_briton@yahoo.fr",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de Notre Equilibre",
        Logo: "",
        "Date de création": "11/2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Julie Hélin",
        "nb d'animateurs ": "1",
        "Association porteuse": "La Fresque de Notre Equilibre (à venir)",
        "Site internet": "http://fresquedenotreequilibre.org/",
        Contact: "helin.julie@gmail.com",
        "Principe / Jouabilité":
            "Déroulé type FdC + format Quizz (focus liens écologie-nutrition-santé)",
        Description:
            "\"Il est urgent de ralentir\"... On ne croyait pas si bien dire au moment du confinement lié au coronavirus !\nGrâce à \"La Fresque de Notre Équilibre\", vous comprendrez enfin de façon ludique et collaborative les liens entre l'écologie, le bien-être et la santé.\nCet atelier c'est aussi le début d'une introspection profonde sur notre rapport à soi, au temps et au vivant. Il est donc important d'y être préparé mentalement.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "Oui",
        "Autres langues et versions": "à venir",
    },
    {
        "Titre de la fresque": "Fresque des violences sexistes et sexuelles",
        Logo: "",
        "Date de création": "2023",
        Avancement: "En usage ",
        "Créateur.rice.s": "Sébastien Brochot",
        "nb d'animateurs ": "1",
        "Association porteuse": "Bonheur.fr + Association Une Vie",
        "Site internet": "bonheur.fr/fresquevss",
        Contact: "contact@bonheur.fr",
        "Principe / Jouabilité":
            "Similaire à la FDC avec facteurs de risque (à la place des causes) et des liens entre leviers de prévention et facteurs de risque",
        Description:
            "L’objectif de la fresque des violences sexistes et sexuelles est de comprendre les facteurs de risque et les conséquences des violences sexistes et sexuelles, et de découvrir les leviers de prévention permettant de les éviter. \nL'enjeu et de prévenir les violences sexistes et sexuelles, autrement dit, d'intervenir avant qu'il y ait des auteurs et des victimes.\nLa fresque se compose d’un support et de quatre séries de cartes : facteurs de risque (24 cartes), infractions (16 cartes), conséquences (14 cartes) et leviers de prévention (12 cartes), et de quelques cartes optionnelles, pour un total de 72 cartes. Elle s’appuie sur des travaux scientifiques nationaux et internationaux reconnus par les professionnels spécialisés dans le domaine des infractions sexuelles.\nProposée au format présentiel ou visio, 2 à 3 heures, ouverte aux particuliers, aux structures publiques, privées et associatives.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Futurs Désirables",
        Logo: "",
        "Date de création": "août 2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Ripa MANUKYAN",
        "nb d'animateurs ": "1",
        "Association porteuse": "N/A",
        "Site internet": "",
        Contact: "ripa.manuk@gmail.com",
        "Principe / Jouabilité":
            "Un atelier ludique et créatif. Il prend en compte les émotions et les envies des participants.",
        Description:
            "Cet atelier propose aux participants de libérer leur imagination et créativité à travers d’exercices de théâtre, de peinture et de dessin en mixant plusieurs techniques.\nLes fresques uniques de futurs désirables issues de cet imaginaire commun sont construites collectivement.\nLes savoirs-faire, la sensibilité, les émotions de chacun se rencontrent avec ceux des autres membres du groupe et rentrent en fusion pour former un imaginaire commun. Le groupe est l’artiste, les œuvres sont le fruit unique de cet investissement commun.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "La Fresque du Système Terre",
        Logo: "",
        "Date de création": "10/2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "William Pinaud",
        "nb d'animateurs ": "1",
        "Association porteuse": "",
        "Site internet": "https://www.lafresquedusystemeterre.org/",
        Contact: "william.pinaud@gmail.com",
        "Principe / Jouabilité":
            "La fresque du système terrestre est un atelier en 5 étapes, décrites ci-dessous. Tout ce dont vous avez besoin c'est : \n        - 5 à 9 participants par groupe.\n        - 1 animateur·ice/facilitateur·ice (pour 3 groupes maximum). \n        - Une grande table de 3 mètres pour les ateliers physiques, ou un outil en ligne comme Mural pour les ateliers en ligne (moins recommandé). \n        - Les 68 cartes, correctement imprimées recto verso, pour les ateliers physiques. \n        - Une nappe en papier blanc vierge avec des crayons/gommes, des marqueurs, des surligneurs, au moins avec 4-5 couleurs différentes. \n    Son développement diffère un peu de son grand frère, La Fresque Du Climat. \n    La durée totale devrait être d'environ 3 heures et demie. Il ne peut (et ne devrait pas) être plus court que cela. \n\nL'atelier propose d'étendre son principe à des domaines, secteurs, objets, régions identifié·e·s par le biais d'extension de cartes, pour compléter en faisant un focus sur un point spéficique des activités humaines (entre 30 et 60 minutes de plus).",
        Description:
            "La Fresque du Système Terre est née en 2022, d'une idée : mêler le génie de l'approche collaborative de l'atelier La Fresque du Climat et les connaissances sur la dynamique des systèmes complexes, l'écologie et la durabilité.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "EN",
    },
    {
        "Titre de la fresque":
            "Adapatation de la toile du vivant, nom à définir",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En création",
        "Créateur.rice.s":
            "Arnaud Viala, Pierre-Baptiste Goutagny, Natalia Krokowska ",
        "nb d'animateurs ": "0",
        "Association porteuse": "Association pour une agriculture du vivant",
        "Site internet": "",
        Contact:
            "arnaud.viala@agricultureduvivant.org\n\npbgoutagny@gmail.com\n\nnatalia.krokowska@gmail.com ",
        "Principe / Jouabilité": "TBD",
        Description: "TBD",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque":
            "Ateliers de l’adaptation au changement climatique",
        Logo: "N/A",
        "Date de création": "mars 2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Juliette Nouel",
        "nb d'animateurs ": "0",
        "Association porteuse": "N/A",
        "Site internet": "N/A",
        Contact: "nouel.juliette@orange.fr",
        "Principe / Jouabilité": "Atelier collaboratif aux règles propres",
        Description:
            "La fresque de l’adaptation est organisée selon 7 familles, correspondant à nos 7 besoins fondamentaux (vitaux pour certains). Il y a 3 phases : 1/ en quoi ces besoins sont-ils impactés par le changement climatique. 2/ quelles sont les adaptations possibles. 3/ parmi ces adaptations, lesquelles faut-il privilégier, car il y en a qui aggravent le CC, type la climatisation.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "oui",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Méditerranée",
        Logo: "N/A",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s": "Marie Laudat, Frank Flamini",
        "nb d'animateurs ": "0",
        "Association porteuse": "GRAINE Provence Alpes Côte d'Azur",
        "Site internet": "",
        Contact: "gpaca@grainepaca.org",
        "Principe / Jouabilité": "A définir (similaire FdC)",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la migration",
        Logo: "N/A",
        "Date de création": "mai 2020",
        Avancement: "En création",
        "Créateur.rice.s": "Equipe de Kabubu",
        "nb d'animateurs ": "0",
        "Association porteuse": "Kabubu",
        "Site internet": "www.kabubu.fr",
        Contact: "noemie@kabubu.fr",
        "Principe / Jouabilité": "Atelier collaboratif aux règles propres",
        Description:
            "L'association Kabubu a pour but de favoriser l'inclusion des personnes exilées grâce au sport. L'objectif de la création de la fresque de la migration est de déconstruire les préjugés sur la migration, ses raisons, ses enjeux et ses conséquences.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque des animaux",
        Logo: "En création",
        "Date de création": "janv. 2021",
        Avancement: "En création",
        "Créateur.rice.s": "Anne-Laure Meynckens, Marie-Laure Laprade",
        "nb d'animateurs ": "0",
        "Association porteuse": "Education Ethique Animale",
        "Site internet": "",
        Contact: "fresquedesanimaux@gmail.com",
        "Principe / Jouabilité": "A définir",
        Description:
            "En création, la fresque animale est un atelier collaboratif (version adultes et version enfants) qui sensibilise aux enjeux liés aux animaux et aux rapports humains/animaux, de façon multidisciplinaire (éthique, éthologie, droit, histoire...). Elle explore également les solutions à développer pour une meilleure harmonie entre les êtres vivants.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque des inégalités",
        Logo: "",
        "Date de création": "2021",
        Avancement: "En création",
        "Créateur.rice.s": "Frédéric Séguret, Mélodie Caraty et d'autres",
        "nb d'animateurs ": "0",
        "Association porteuse": "Oxfam France",
        "Site internet": "",
        Contact: "frederic@sgrt.eu",
        "Principe / Jouabilité": "Similaire à la FdC",
        Description:
            "L'objectif de cette fresque est est que les participant·es ébauchent un panorama des structures économiques et sociales inégalitaires qui créent la pauvreté. Dans un 2e temps, iels seront invité·es à réfléchir à des solutions transformatrices en croisant échelle globale et locale, ainsi que dimensions sociale et écologique.\n\nL'atelier propose aux participant·es de mettre en lien des données factuelles issues des statistiques fournies par les ONG, les agences de l'ONU, les institutions multilatérales, les universités et d'autres pour comprendre les mécanismes qui produisent de manière structurelle des inégalités et de la pauvreté dans le monde. Il permet aussi de prendre conscience de l'ampleur et de l'importance du problème et son lien avec d'autres problématiques comme celle du climat. Dans une deuxième partie, les participant·es seront invité·es à identifier eux-mêmes des solutions, à les analyser et à les améliorer à l'aide de la théorie du Donut, une approche économique originale qui permet d'explorer les impacts environnementaux et sociaux de nos activités à l'échelle locale et globale.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Carbometre ",
        Logo: "",
        "Date de création": "",
        Avancement: "En création",
        "Créateur.rice.s": "Julien Briton",
        "nb d'animateurs ": "",
        "Association porteuse": "",
        "Site internet": "",
        Contact: "",
        "Principe / Jouabilité": "",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque":
            "Extension fresque océane sur mini fresque pêche",
        Logo: "",
        "Date de création": "janv. 2021",
        Avancement: "En création",
        "Créateur.rice.s": "Alice Vitoux",
        "nb d'animateurs ": "",
        "Association porteuse": "",
        "Site internet": "",
        Contact: "",
        "Principe / Jouabilité": "Extention Fresque Océane",
        Description:
            "Je ne fais pas une fresque du plastique en tant que telle, mais une extention de la fresque océane pour intégrer un focus pêche",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque":
            "Extension fresque océane sur mini fresque plastique",
        Logo: "",
        "Date de création": "janv. 2021",
        Avancement: "En création",
        "Créateur.rice.s": "Alice Vitoux",
        "nb d'animateurs ": "",
        "Association porteuse": "",
        "Site internet": "",
        Contact: "",
        "Principe / Jouabilité": "Extention Fresque Océane",
        Description:
            "Je ne fais pas une fresque du plastique en tant que telle, mais une extention de la fresque océane pour intégrer un focus plastique",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de l'écoconception",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s": "EVEA (Evaluation et accompagnement)",
        "nb d'animateurs ": "",
        "Association porteuse": "",
        "Site internet": "",
        Contact: "p.le-hoangan@evea-conseil.com\nn.drouin@evea-conseil.com",
        "Principe / Jouabilité":
            "Présente les motivations, les objectifs, les intérêts et les étapes d'une démarche d'écoconception (sans oublier les clés de succès !).",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de l'ESG",
        Logo: "",
        "Date de création": "04/2022",
        Avancement: "En usage ",
        "Créateur.rice.s": "Rémi Demersseman (Fondation Oïkos)",
        "nb d'animateurs ": "",
        "Association porteuse": "M4Impact www.m4impact.org",
        "Site internet": "www.fresque-esg.org",
        Contact: "contact@www.fresque-esg.org",
        "Principe / Jouabilité":
            "Relier des cartes descriptive des organisations, des enjeux ESG et des solutions, puis utiliser des jetons parties prenantes pour se projeter en tant qu'acteur économique et batir un premier plan d'action ESG. ",
        Description: "47 cartes, 15 jetons. www.fresque-esg.org",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "comment faire ?",
        "Autres langues et versions": "en cours",
    },
    {
        "Titre de la fresque": "Fresque de l’Entreprise Responsable ",
        Logo: "",
        "Date de création": "",
        Avancement: "En rodage ",
        "Créateur.rice.s": "",
        "nb d'animateurs ": "",
        "Association porteuse": "",
        "Site internet": "https://openlande.co/fresque/",
        Contact: "contact@lelieudit.fr ",
        "Principe / Jouabilité": "",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Banque et de la Finance",
        Logo: "En test",
        "Date de création": "2020",
        Avancement: "En création",
        "Créateur.rice.s": "Laurent Ortega, Gérald Oger, Emma Dominguez ",
        "nb d'animateurs ": "",
        "Association porteuse": "N/A",
        "Site internet": "N/A",
        Contact: "",
        "Principe / Jouabilité": "Similaire FdC",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Forêt",
        Logo: "",
        "Date de création": "2019",
        Avancement: "En usage ",
        "Créateur.rice.s": "Jonathan Guyot",
        "nb d'animateurs ": "",
        "Association porteuse": "All4trees",
        "Site internet": "https://all4trees.org/agir/fresque-foret/",
        Contact: "info@all4trees.org",
        "Principe / Jouabilité": "Similaire à la FDC",
        Description:
            "Atelier ludique - pédagogique - collaboratif pour comprendre les enjeux de la déforestation, à l'aide d'un jeu de 57 cartes. En équipe, vous allez pouvoir maîtriser un enjeu complexe et très éloigné de notre quotidien, afin de devenir des acteurs et actrices engagés pour la préservation des forêts",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Santé Mentale",
        Logo: "En cours",
        "Date de création": "2023",
        Avancement: "En création",
        "Créateur.rice.s":
            "Estelle Becuwe (Vitalité au Travail) - Laure Gomez Montoya (Medbyme)",
        "nb d'animateurs ": "",
        "Association porteuse": "",
        "Site internet": "",
        Contact: "estelle.becuwe@vitaliteautravail.fr\nlaure@medbyme.fr",
        "Principe / Jouabilité": "",
        Description:
            "Objectifs : \n- Sensibiliser et informer par une approche positive : trouver le juste équilibre entre légèreté et dramatisation\n- Diffuser / partager les informations scientifiques et pratiques au sujet de la santé mentale\n- Développer l’inclusion : déculpabiliser les personnes concernées ou vulnérables et changer les regards sur la santé mentale, déstigmatiser et lever les tabous\n- Créer des espaces d’échange dans les entreprises sur ces sujets\n- Donner des outils pour prévenir les risques et pour s’orienter vers une aide en cas de besoin\n- Donner des outils pour soutenir et orienter une personne en situation de fragilité\nModalités proches de la Fresque du Climat :\n- 3h par tables de 6 à 8p\n- 5 tours de 8 à 10 cartes, des réflexions en intelligence collective, des exercices, des engagements personnels/collectifs en fin de session",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque de la Supply Chain",
        Logo: "à venir",
        "Date de création": "2023",
        Avancement: "En création",
        "Créateur.rice.s":
            "Romain Dagallier\nJulie ANTONANGELO \nRobin BOUF\nMartine VARIERAS\nEmma DADIER\nRomain KERMORVAN\nJeanne CHABERT\nCécile LAROUMANIE",
        "nb d'animateurs ": "",
        "Association porteuse": "A venir",
        "Site internet": "A venir",
        Contact: "jeanne.chabert@tnpconsultants.com",
        "Principe / Jouabilité":
            "Sur le principe de la FdC, comprendre les principaux aspects de la Supply Chain, leur impact environnemental ainsi que les solutions éventuelles pour améliorer cet impact",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque des Achats Responsables",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s": "Camille BOUQUET",
        "nb d'animateurs ": "",
        "Association porteuse": "En cours",
        "Site internet": "",
        Contact: "",
        "Principe / Jouabilité": "Similaire à la FDC, FDN et FDB",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions":
            "Développement en Français, traduction en anglais prévue dans un premier temps",
    },
    {
        "Titre de la fresque":
            "Fresque des Impacts et adaptation aux Changements climatiques en Occitanie (FICO) ",
        Logo: "",
        "Date de création": "2022",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Julie FABRE ",
        "nb d'animateurs ": "",
        "Association porteuse": "RECO",
        "Site internet": "/",
        Contact: "jml.fabre@gmail.com ",
        "Principe / Jouabilité":
            "Similaire à FDC. \nBasée sur le CROCC 2021 (Cahier Régional Occitanie sur les Changements Climatiques). ",
        Description:
            'Axée sur les impacts locaux et les besoins/mesures d\'adaptation.\nLots: Climat, eau, biodiversité puis lots "activités": urbanités ("vivre en Occitanie"), Tourisme, Production agroalimentaires.\nDebrief sur les actions d\'adaptation et la transversalité des impacts.  ',
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque":
            "Fresque des matériaux (de la transition énergétique)",
        Logo: "A venir",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s":
            "Margaux Raveleau\nPaul Thomas\nThomas Le Franc\nChloé Lutz\nZoé Morel\nBenoit Decorse",
        "nb d'animateurs ": "",
        "Association porteuse": "IFPEN",
        "Site internet": "",
        Contact: "benoitdecorse@gmail.com",
        "Principe / Jouabilité":
            "Présenter les limites liées à l'exploitation des ressources nécessaires à la transition énergétique",
        Description: "",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque du Bonheur Durable et Partagé",
        Logo: "à venir",
        "Date de création": "juillet 2022",
        Avancement: "En création",
        "Créateur.rice.s":
            "Fabrice Neyrolles, Amélie Motte, Saphia Larabi, Alexandre Jost, Nada Kawach",
        "nb d'animateurs ": "",
        "Association porteuse":
            "La Fabrique Spinoza\nhttps://www.fabriquespinoza.org/  \n& l'Association Eudia\nhttps://asso-eudia.org/ ",
        "Site internet": "à venir",
        Contact: "fabrice.neyrolles@asso-eudia.org",
        "Principe / Jouabilité": "Inspiré par la FDC et d'autres fresques",
        Description:
            "Fresque du bonheur qui fait découvrir les bases nécessaires à un épanouissement humain et qui intègre les dimensions écologique et sociale indispensables à un bonheur durable et partagé.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "oui",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "dans un deuxième temps",
    },
    {
        "Titre de la fresque": "Fresque du Football",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En rodage ",
        "Créateur.rice.s": "Antoine Miche",
        "nb d'animateurs ": "",
        "Association porteuse": "Football Ecologie France",
        "Site internet":
            "https://www.football-ecology.org/fresque-ecologique-du-football",
        Contact: "antoine.miche@football-ecologie.fr ",
        "Principe / Jouabilité": "Similaire à la FdC",
        Description:
            "Cet atelier a pour objectif de sensibiliser aux enjeux écologiques à travers l’univers du football pour provoquer une prise de conscience et un passage à l’action des participants.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Fresque du Livre durable",
        Logo: "à venir",
        "Date de création": "2023",
        Avancement: "En création",
        "Créateur.rice.s": "La Fontaine Ô Livres\nCharles Hédouin",
        "nb d'animateurs ": "",
        "Association porteuse": "La Fontaine Ô Livres",
        "Site internet": "En cours de création",
        Contact: "formations@fontaineolivres.com\ncharles@livreco-comptoir.fr",
        "Principe / Jouabilité":
            "Héritiaire de la Fresque du Climat, par le rédacteur de la Fresque de la Publicité",
        Description: "En cours de rédaction",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)":
            "Pas encore décidé",
        "Apparaît sur la fresque RE": "Pas encore décidé",
        "Autres langues et versions": "En cours de rédaction",
    },
    {
        "Titre de la fresque": "Fresque Systémique",
        Logo: "à venir",
        "Date de création": "2022",
        Avancement: "En création",
        "Créateur.rice.s":
            "Raphaël Deux, Marta Riegovila, Hélène Exbrayat, Loïc Marcé, Mandy Schreuder, Valérie Brunel",
        "nb d'animateurs ": "",
        "Association porteuse": "à venir",
        "Site internet": "à venir",
        Contact: "raphael@fresquesystemique.org",
        "Principe / Jouabilité": "inspiré par la FDC (+ d'infos à venir)",
        Description:
            "Ses objectifs sont les suivants :\n\nAppréhender la manière dont notre activité humaine a, depuis la révolution industrielle, perturbé les cycles de la biosphère jusque-là en équilibre, et dépassé 6 des 9 limites planétaires, sans pour autant répondre aux besoins du plus grand nombre.\nComprendre que les différentes crises en cours sont les symptômes d’un même problème lié à la nature de notre modèle de développement\nAppréhender les principes relatifs à ce modèle de développement (par exemple l’extraction d’énergie et de ressources, la croissance matérielle...) qui ont amené à ces dépassements, et qu’il convient d’inverser",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "à venir",
        "Apparaît sur la fresque RE": "",
        "Autres langues et versions": "à venir",
    },
    {
        "Titre de la fresque": "La Toile du Vivant",
        Logo: "",
        "Date de création": "2018",
        Avancement: "En usage ",
        "Créateur.rice.s": "Arnaud Meillarec",
        "nb d'animateurs ": "",
        "Association porteuse": "Territoires vivants",
        "Site internet":
            "http://www.territoires-vivants.fr/la-toile-du-vivant/",
        Contact:
            "arnaud.meillarec@enpermaculture.fr\nlinkedin.com/in/arnaud-meillarec-14784a187",
        "Principe / Jouabilité":
            "Le principe est un peu différent car il en appelle d'avantage à la créativité, l'ordre des cartes disposé sur la toile dépendant plus de l'histoire que souhaite raconter le groupe que d'une enchaînement de causes et de conséquences.\n",
        Description:
            "La toile du vivant est un outil pédagogique de sensibilisation aux enjeux de l’agroécologie développé par Arnaud Meillarec. Il permet d’appréhender et de s’approprier efficacement les notions complexes liées aux mécanismes du vivant en jeu en agriculture. Toute l’équipe est impliquée dans la résolution d’une problématique commune, où chaque individu peut apporter ses propres connaissances et les confronter à ses coéquipiers.",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "",
        "Apparaît sur la fresque RE": "x",
        "Autres langues et versions": "",
    },
    {
        "Titre de la fresque": "Les petites pâtes",
        Logo: "",
        "Date de création": "2020",
        Avancement: "En usage ",
        "Créateur.rice.s": "Iris Wu",
        "nb d'animateurs ": "",
        "Association porteuse": "Les petites pâtes",
        "Site internet": "Linkedin",
        Contact: "restosco.formation@gmail.com",
        "Principe / Jouabilité":
            "Entrez dans les coulisses de la restauration scolaire",
        Description:
            "Les Petites Pâtes, ce sont des ateliers de type \"serious game\" sur la restauration scolaire durable à destination des parents d'élèves et des collectivités territoriales.\nNos objectifs ? Permettre aux collectivités de co-construire, valoriser les actions qui sont mises en place, accompagner le changement en 1h30 à 2h.\nNos thématiques ? Les repas végétariens (un format chasse aux trésors), gaspillage alimentaire (une immersion fictive dans un restaurant scolaire), introduction de produits bio et locaux (en se mettant dans la peau d'un acheteur public).\n\nAteliers grand public organisés sur demande, ateliers pour les collectivités et parents d'élèves sur devis",
        "Accord diffusion sur fresque RE (Renaissance Ecologique)": "Oui",
        "Apparaît sur la fresque RE": "Oui",
        "Autres langues et versions": "",
    },
];

// async function getData() {
//     const res = await fetch("https://acti.anzieu.fr/assets/e92eff76-ee8a-4952-8936-e0b7d142b1af");
//     // The return value is *not* serialized
//     // You can return Date, Map, Set, etc.

//     // Recommendation: handle errors
//     if (!res.ok) {
//         // This will activate the closest `error.js` Error Boundary
//         throw new Error("Failed to fetch data");
//     }

//     return res.json();
// }

const extractColor = (avancement: string) => {
    const mapping: Record<string, string> = {
        "En création": "red",
        "En rodage": "orange",
        "En usage": "green",
    };

    return mapping[avancement] || "gray";
};

const buildDefaultCard = () => (
    <Box>
        <Link href="https://wiki.climatefresk.org/?title=Les_fresques_amies">
            <Button size={"lg"} leftIcon={<AddIcon />}>
                Ajouter une fresque
            </Button>
        </Link>
    </Box>
);

export default function Home() {
    // const remoteData = await getData();
    const [data, setData] = useState<any>(remoteData);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item: any) => {
        console.log(item);
        setSelectedItem(item);
        onOpen();
    };

    const search = (e: any) => {
        const value = e.target.value;
        const filteredData = remoteData.filter((item: any) => {
            return item["Titre de la fresque"]
                .toLowerCase()
                .includes(value.toLowerCase());
        });
        setData(filteredData);
    };
    return (
        <Container maxW="container.xl" p={5}>
            <Box py={3}>
                {" "}
                <Input
                    onChange={search}
                    size={"lg"}
                    variant="flushed"
                    placeholder="Rechercher une fresque"
                />
            </Box>
            <Box py={5}>
                <Link href=" https://fresques-amies.canny.io/" target="_blank">
                    <Button
                        leftIcon={<QuestionOutlineIcon />}
                        colorScheme="pink"
                        variant="outline"
                    >
                        Suggestion de fonctionnalités
                    </Button>
                </Link>
            </Box>

            <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
                {data.map((item: any, id: number) => (
                    <Card
                        cursor={"pointer"}
                        boxShadow={"lg"}
                        key={id}
                        border={"2px"}
                        borderColor={extractColor(item.Avancement.trim())}
                        onClick={() => openModal(item)}
                    >
                        <CardHeader>
                            <Heading size="md" noOfLines={2}>
                                {item["Titre de la fresque"]}{" "}
                            </Heading>
                            <Box noOfLines={2}>
                                {" "}
                                par {item["Association porteuse"]}
                                <br />
                            </Box>
                            <Box>
                                <Badge
                                    variant="solid"
                                    colorScheme={extractColor(
                                        item.Avancement.trim()
                                    )}
                                >
                                    {item.Avancement.trim()}
                                </Badge>
                            </Box>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<StackDivider />} spacing="4">
                                <Box>
                                    <br /> <br />
                                    <CalendarIcon boxSize={6} />{" "}
                                    {item["Date de création"]}
                                    <br />
                                    <br />
                                    {item["Site internet"]
                                        .split(/,| |\n/)
                                        .filter((w: string) =>
                                            w.includes("http")
                                        )
                                        .map((website: string, id: number) => (
                                            <Box key={id}>
                                                <Link href={website} isExternal>
                                                    {website}{" "}
                                                    <ExternalLinkIcon mx="2px" />
                                                </Link>
                                            </Box>
                                        ))}
                                </Box>
                                <Box>
                                    <Heading
                                        size="xs"
                                        textTransform="uppercase"
                                    >
                                        Description
                                    </Heading>
                                    <Text pt="2" fontSize="sm" noOfLines={5}>
                                        {item["Description"]}
                                    </Text>
                                </Box>
                                <Box>
                                    {item["Contact"]
                                        .split(/,| |\n/)
                                        .filter((email: any) =>
                                            email.includes("@")
                                        )
                                        .map((email: any, id: number) => (
                                            <Box key={id}>
                                                <a href={`mailto: ${email}`}>
                                                    {email}
                                                </a>
                                            </Box>
                                        ))}
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                ))}
                {buildDefaultCard()}
            </SimpleGrid>

            <Modal onClose={onClose} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {selectedItem?.["Titre de la fresque"]}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>{selectedItem?.["Description"]}</ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Retourner à la liste</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    );
}

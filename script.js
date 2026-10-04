


// ------------------------------------------------------------
// 1. TOUTES LES PAGES : apparition des titres au défilement
// ------------------------------------------------------------
const titres = document.querySelectorAll("h1, h2, h3");

const observateur = new IntersectionObserver(function (entrees) {
  entrees.forEach(function (entree) {
    if (entree.isIntersecting) {
      entree.target.classList.add("visible");
      observateur.unobserve(entree.target); // une seule fois
    }
  });
});

titres.forEach(function (titre) {
  titre.classList.add("reveal");
  observateur.observe(titre);
});


// ------------------------------------------------------------
// 2. ACCUEIL : message de bienvenue selon l'heure
//    (variables, conditions)
// ------------------------------------------------------------
const welcome = document.getElementById("welcome");

if (welcome) {
  const heure = new Date().getHours();

  if (heure < 12) {
    welcome.textContent = "Bonjour et bienvenue !";
  } else if (heure < 18) {
    welcome.textContent = "Bon après-midi et bienvenue !";
  } else {
    welcome.textContent = "Bonsoir et bienvenue !";
  }
}


// ------------------------------------------------------------
// 3. ACCUEIL : carrousel automatique
//    (liste d'éléments, fonction, setInterval)
// ------------------------------------------------------------
const slides = document.querySelectorAll(".slide");

if (slides.length > 0) {
  let index = 0;

  function afficherSlide(i) {
    slides.forEach(function (slide) {
      slide.classList.remove("active");
    });
    slides[i].classList.add("active");
  }

  afficherSlide(index);

  setInterval(function () {
    index = (index + 1) % slides.length; // revient à 0 après la dernière
    afficherSlide(index);
  }, 3000);
}


// ------------------------------------------------------------
// 4. FORMULAIRES (contact + newsletter) : validation
//    (événement submit, fonctions, conditions, expression régulière)
// ------------------------------------------------------------
function emailValide(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function afficherMessage(zone, texte, type) {
  zone.textContent = texte;
  zone.className = "form-message " + type; // "ok" ou "erreur"
}

const formContact = document.getElementById("contact-form");

if (formContact) {
  const message = document.getElementById("form-message");

  formContact.addEventListener("submit", function (event) {
    event.preventDefault(); // empêche le rechargement de la page

    const nom = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const texte = document.getElementById("message").value.trim();

    if (nom === "" || email === "" || texte === "") {
      afficherMessage(message, "Merci de remplir tous les champs.", "erreur");
    } else if (!emailValide(email)) {
      afficherMessage(message, "L'adresse e-mail n'est pas valide.", "erreur");
    } else {
      afficherMessage(message, "Merci " + nom + ", ton message est bien envoyé !", "ok");
      formContact.reset();
    }
  });
}

const formNewsletter = document.getElementById("newsletter-form");

if (formNewsletter) {
  const message = document.getElementById("newsletter-message");

  formNewsletter.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("newsletter-email").value.trim();

    if (!emailValide(email)) {
      afficherMessage(message, "Entre une adresse e-mail valide.", "erreur");
    } else {
      afficherMessage(message, "Inscription confirmée, à bientôt !", "ok");
      formNewsletter.reset();
    }
  });
}


// ------------------------------------------------------------
// 5. À VOIR : recherche par titre
//    (événement input, boucle, conditions)
// ------------------------------------------------------------
const champRecherche = document.getElementById("recherche");

if (champRecherche) {
  const dramas = document.querySelectorAll(".drama-item");
  const sections = document.querySelectorAll(".drama-section");
  const aucunResultat = document.getElementById("aucun-resultat");

  champRecherche.addEventListener("input", function () {
    const recherche = champRecherche.value.toLowerCase().trim();
    let totalVisibles = 0;

    // On affiche ou on cache chaque drama selon son titre
    dramas.forEach(function (drama) {
      const titre = drama.querySelector("p").textContent.toLowerCase();

      if (titre.includes(recherche)) {
        drama.style.display = "";
        totalVisibles++;
      } else {
        drama.style.display = "none";
      }
    });

    // On cache les sections (Romance, Action...) qui n'ont plus aucun résultat
    sections.forEach(function (section) {
      const visibles = Array.from(section.querySelectorAll(".drama-item")).filter(function (d) {
        return d.style.display !== "none";
      });
      section.style.display = visibles.length > 0 ? "" : "none";
    });

    aucunResultat.style.display = totalVisibles === 0 ? "block" : "none";
  });
}


// ------------------------------------------------------------
// 6. PROCHAINES SORTIES : compte à rebours
//    (dates, boucle, conditions, attributs data-)
// ------------------------------------------------------------
const etiquettes = document.querySelectorAll(".tag[data-date]");

etiquettes.forEach(function (etiquette) {
  const dateSortie = new Date(etiquette.dataset.date + "T00:00:00");
  const aujourdhui = new Date();
  aujourdhui.setHours(0, 0, 0, 0);

  const msParJour = 1000 * 60 * 60 * 24;
  const jours = Math.round((dateSortie - aujourdhui) / msParJour);

  const dateLisible = dateSortie.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  if (jours < 0) {
    etiquette.textContent = "Déjà disponible depuis le " + dateLisible;
    etiquette.classList.add("tag-dispo");
  } else if (jours === 0) {
    etiquette.textContent = "Sortie aujourd'hui !";
    etiquette.classList.add("tag-dispo");
  } else if (jours <= 30) {
    etiquette.textContent = "Dans " + jours + " jour" + (jours > 1 ? "s" : "") + " : " + dateLisible;
    etiquette.classList.add("tag-proche");
  } else if (jours <= 90) {
    etiquette.textContent = "Dans " + jours + " jours : " + dateLisible;
    etiquette.classList.add("tag-bientot");
  } else {
    etiquette.textContent = "Dans " + jours + " jours : " + dateLisible;
    etiquette.classList.add("tag-loin");
  }
});

// ------------------------------------------------------------
// 7. RECHERCHE TMDb : connexion à l'API pour afficher les films
// ------------------------------------------------------------
const apiKey = "7d154a8efb58f85fb3bee505ada3809b"; // 🔑 Mets ici ta clé API TMDb
const searchInput = document.getElementById("recherche");
const aucunResultat = document.getElementById("aucun-resultat");

// Crée une zone pour afficher les résultats
const resultsContainer = document.createElement("div");
resultsContainer.className = "drama-list";
aucunResultat.insertAdjacentElement("beforebegin", resultsContainer);

searchInput.addEventListener("input", async () => {
  const query = searchInput.value.trim();
  if (!query) {
    resultsContainer.innerHTML = "";
    aucunResultat.style.display = "none";
    return;
  }

  try {
   const response = await fetch(
  `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=fr-FR`
);

    const data = await response.json();

    resultsContainer.innerHTML = "";
    if (data.results.length === 0) {
      aucunResultat.style.display = "block";
    } else {
      aucunResultat.style.display = "none";
      data.results.forEach(movie => {
        if (!movie.poster_path) return; // ignore les films sans affiche
        const card = document.createElement("div");
        card.className = "drama-item";
        card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
          <p>${movie.title} ⭐ ${movie.vote_average}</p>
        `;
        resultsContainer.appendChild(card);
      });
    }
  } catch (error) {
    console.error("Erreur API TMDb :", error);
    aucunResultat.style.display = "block";
    aucunResultat.textContent = "Erreur lors de la recherche.";
  }
});

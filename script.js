// Fonction pour récupérer les avis depuis le backend PHP
async function fetchGoogleReviews() {
  try {
    const response = await fetch("https://nailsiana.com/get_reviews.php"); // Mets l'URL correcte
    const data = await response.json();
    return data.reviews || [];
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    return [];
  }
}

// Fonction pour afficher les étoiles en fonction de la note
function getStarRating(rating) {
  return "⭐".repeat(Math.round(rating)); // Arrondi et répète les étoiles
}

// Fonction pour convertir un timestamp en date
function formatTimestamp(timestamp) {
  if (!timestamp) return "Date inconnue"; // Sécurité si la valeur est vide
  const date = new Date(timestamp * 1000); // Conversion en millisecondes
  return date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

// Affiche les avis sur la page
function displayReviews(reviews) {
  const container = document.getElementById("avis-container");
  if (!container || !reviews.length) return;

  let html = "";
  reviews.forEach((review) => {
    console.log(review); // Vérifie si `review.time` est bien présent

    const stars = getStarRating(review.rating);
    const timestamps = formatTimestamp(review.time || 0); // Sécurisation

    html += `
          <div class="review">
              <div class="review-title">
                  <img src="${review.profile_photo_url}" alt="Photo de ${review.author_name}">
                  <h3>${review.author_name}</h3>
              </div>
              <p>${review.text}</p>
              <div class="review-bottom">
                  <div class="rating">${stars}</div>
                  <span class="review-date">le ${timestamps}</span>
              </div>
          </div>
      `;
  });

  container.innerHTML = html;
}

// Exécution au chargement de la page
document.addEventListener("DOMContentLoaded", async () => {
  const reviews = await fetchGoogleReviews();
  displayReviews(reviews);
});

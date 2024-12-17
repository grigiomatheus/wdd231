const firstTimeMessage = "Welcome! Let us know if you have any questions.";
const lessThanDayMessage = "Back so soon! Awesome!";
const moreThanDayMessage = "You last visited {days} ago.";

const lastVisitKey = "lastVisit";

const welcomeTitle = document.querySelector("#welcome-title");

const lastVisit = localStorage.getItem(lastVisitKey);

if (!lastVisit) {
  welcomeTitle.innerHTML = firstTimeMessage;
  localStorage.setItem(lastVisitKey, new Date().toDateString());
} else {
  const diffDate = new Date() - new Date(lastVisit);
  const daysAgo = Math.floor(diffDate / (1000 * 60 * 60 * 24));

  daysAgo < 1
    ? (welcomeTitle.innerHTML = lessThanDayMessage)
    : (welcomeTitle.innerHTML = moreThanDayMessage.replace("{days}", daysAgo));
}

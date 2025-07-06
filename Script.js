// Responsive Navbar
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// Geolocation
document.getElementById('get-location').addEventListener('click', () => {
  const locDiv = document.getElementById('location-data');
  if (!navigator.geolocation) {
    locDiv.textContent = "Geolocation is not supported by your browser.";
    locDiv.classList.remove('hidden');
    return;
  }
  locDiv.textContent = "Locating...";
  locDiv.classList.remove('hidden');
  navigator.geolocation.getCurrentPosition(
    pos => {
      locDiv.innerHTML = `<span class="font-semibold">Latitude:</span> ${pos.coords.latitude.toFixed(6)}<br>
                          <span class="font-semibold">Longitude:</span> ${pos.coords.longitude.toFixed(6)}<br>
                          <a href="https://www.openstreetmap.org/#map=18/${pos.coords.latitude}/${pos.coords.longitude}" target="_blank" class="text-teal-600 underline mt-2 inline-block">View on Map</a>`;
    },
    err => {
      locDiv.textContent = "Unable to retrieve your location.";
    }
  );
});

// Feedback Form with localStorage
const feedbackForm = document.getElementById('feedback-form');
const feedbackList = document.getElementById('feedback-list');
function loadFeedbacks() {
  const feedbacks = JSON.parse(localStorage.getItem('wellness_feedbacks') || '[]');
  feedbackList.innerHTML = feedbacks.map(fb => `
    <div class="bg-white p-4 rounded-lg shadow">
      <div class="font-semibold text-teal-600">${fb.name}</div>
      <div class="mt-2">${fb.comment}</div>
      <div class="text-xs text-gray-500">${fb.date}</div>
    </div>
  `).join('');
}
feedbackForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();
  if (!name || !comment) return;
  const feedbacks = JSON.parse(localStorage.getItem('wellness_feedbacks') || '[]');
  feedbacks.unshift({ name, comment, date: new Date().toLocaleString() });
  localStorage.setItem('wellness_feedbacks', JSON.stringify(feedbacks.slice(0, 5)));
  feedbackForm.reset();
  loadFeedbacks();
});
loadFeedbacks();

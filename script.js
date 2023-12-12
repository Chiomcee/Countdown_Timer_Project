function setCountdown() {
  const eventName = document.getElementById('eventNameInput').value;
  const selectedDate = new Date(document.getElementById('dateInput').value).getTime();

  localStorage.setItem('eventName', eventName);
  localStorage.setItem('selectedDate', selectedDate);

  updateCountdown();
}

function updateCountdown() {
  const eventName = localStorage.getItem('eventName');
  const selectedDate = localStorage.getItem('selectedDate');

  if (eventName && selectedDate) {
    const countdownTimer = document.getElementById('countdown-timer');
    const completionMessage = document.getElementById('completionMessage');

    const countdownInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = selectedDate - now;

      if (distance <= 0) {
        clearInterval(countdownInterval);
        countdownTimer.style.display = 'none';
        completionMessage.style.display = 'block';
        // Add code to share countdown on social media
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownTimer.innerHTML = `<p>${days}d ${hours}h ${minutes}m ${seconds}s</p>`;
      }
    }, 1000);
  }
}

// Function to share social links
function shareSocialMedia(link) {
  window.open(link, '_blank', 'noopener noreferrer');
}

// Event listeners for social buttons
document.querySelectorAll('#social-buttons a').forEach(button => {
  button.addEventListener('click', function(event) {
    event.preventDefault();
    const socialLink = this.getAttribute('href');
    shareSocialMedia(socialLink);
  });
});

document.addEventListener('DOMContentLoaded', updateCountdown);

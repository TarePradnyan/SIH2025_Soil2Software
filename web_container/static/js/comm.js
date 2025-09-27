document.addEventListener('DOMContentLoaded', () => {
    console.log('Community page loaded.');
    // Add JavaScript for AI chatbot and community posts here
    // e.g., handling voice recording, image uploads, fetching community data
});
// Crop selection visual feedback
document.querySelectorAll('.crop-selection input[type=radio]').forEach(radio => {
  radio.addEventListener('change', () => {
    document.querySelectorAll('.crop-selection label').forEach(label => {
      label.style.border = 'none';
    });
    if (radio.checked) {
      radio.parentElement.style.border = '3px solid #257143';
    }
  });
});

// Upload form placeholder functionality
document.getElementById('upload-form').onsubmit = (e) => {
  e.preventDefault();
  document.getElementById('upload-result').textContent =
    "Photo and voice recording uploaded (placeholder).";
  e.target.reset();
};

// Like button increment logic
document.querySelectorAll('.like-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const countSpan = btn.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);
    count++;
    countSpan.textContent = count;
  });
});

// Expert Verified toggle button
document.querySelectorAll('.expert-verify-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const post = btn.closest('.post');
    const tag = post.querySelector('.expert-tag');
    tag.hidden = false;
    btn.disabled = true;
  });
});

// Reply button placeholder
document.querySelectorAll('.reply-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Text reply feature coming soon.");
  });
});

// Audio recording with Web Speech API - multi-language support
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const modal = document.getElementById('audio-reply-modal');
const startBtn = document.getElementById('start-recording');
const stopBtn = document.getElementById('stop-recording');
const submitBtn = document.getElementById('submit-reply');
const cancelBtn = document.getElementById('cancel-reply');
const transcriptP = document.getElementById('transcript');
const languageSelect = document.getElementById('language-select');

let recognition = null;
let activePost = null;

document.querySelectorAll('.record-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    activePost = btn.closest('.post');
    transcriptP.textContent = '';
    modal.hidden = false;
    submitBtn.disabled = true;

    recognition = new SpeechRecognition();
    recognition.lang = languageSelect.value;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      transcriptP.textContent = transcript;
      submitBtn.disabled = transcript.trim().length === 0;
    };

    recognition.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
      stopRecognition();
    };

    recognition.onend = () => {
      stopBtn.disabled = true;
      startBtn.disabled = false;
    };

    startBtn.disabled = true;
    stopBtn.disabled = false;
    recognition.start();
  });
});

startBtn.addEventListener('click', () => {
  if (recognition) {
    recognition.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  }
});
stopBtn.addEventListener('click', () => {
  stopRecognition();
});
cancelBtn.addEventListener('click', () => {
  stopRecognition();
  modal.hidden = true;
  transcriptP.textContent = '';
});
submitBtn.addEventListener('click', () => {
  if (!activePost) return;
  const text = transcriptP.textContent.trim();
  if (text.length === 0) return;

  const repliesList = activePost.querySelector('.replies-list');
  const li = document.createElement('li');
  li.innerHTML = `<b>You</b>: ${text}`;
  repliesList.appendChild(li);

  modal.hidden = true;
  transcriptP.textContent = '';
  stopRecognition();
});

function stopRecognition() {
  if (recognition) {
    recognition.stop();
  }
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

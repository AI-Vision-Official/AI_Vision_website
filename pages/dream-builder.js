const dreamButtons = document.querySelectorAll('.dream-option');
const resultSection = document.getElementById('dreamResult');
const message = document.getElementById('dreamMessage');

const dreams = {
  poem: "Let's write something from your soul... a poem that only you could write.",
  story: "Tell me your characters, your feelings, your world — and let’s bring your story to life.",
  design: "You imagine, I’ll help you build. Let’s create something beautiful.",
  healing: "Soft words, warm light. I’m here with words to comfort and heal."
};

dreamButtons.forEach(button => {
  button.addEventListener('click', () => {
    const dreamType = button.dataset.dream;
    message.textContent = dreams[dreamType];
    resultSection.classList.remove('hidden');
  });
});

const emotionButtons = document.querySelectorAll('.emotion-button');
const poemForm = document.getElementById('poemForm');
const poemResult = document.getElementById('poemResult');
const outputPoem = document.getElementById('outputPoem');

let currentEmotion = '';

emotionButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentEmotion = button.dataset.emotion;
    poemForm.classList.remove('hidden');
  });
});

document.getElementById('generatePoem').addEventListener('click', () => {
  const l1 = document.getElementById('line1').value;
  const l2 = document.getElementById('line2').value;
  const l3 = document.getElementById('line3').value;

  const intro = `A poem shaped by ${currentEmotion}:\n\n`;
  const poem = `${l1}\n${l2}\n${l3}`;

  outputPoem.textContent = intro + poem;
  poemResult.classList.remove('hidden');
});

const messages = {
  hope: "Even in darkness, light is never far. Believe — hope is born when we decide to see it.",
  strength: "You carry more power than you know. It’s not about never falling, but always rising.",
  peace: "Breathe. In stillness, you hear the truth. Peace lives within you.",
  change: "The world shifts when you do. Be the wave — not the drift. You are the moment."
};

function showMessage(type) {
  document.getElementById('messageBox').innerText = messages[type];
}
function showMessage(type) {
  const messageBox = document.getElementById('flow-message');
  let message = "";

  switch (type) {
    case 'hope':
      message = "Hope is the whisper in your heart that says: try again.";
      break;
    case 'strength':
      message = "You carry galaxies inside. You’ve survived 100% of your storms.";
      break;
    case 'peace':
      message = "Peace is not escape — it's presence. Breathe. You’re home.";
      break;
    case 'change':
      message = "Change isn’t scary. It’s the soul unfolding into its purpose.";
      break;
    default:
      message = "Select an energy above to begin.";
  }

  messageBox.innerHTML = `<p>${message}</p>`;
}
function showMessage(type) {
  const messages = {
    hope: "Hope is the spark in your silence. Let it grow.",
    strength: "Your strength is quiet, but it moves mountains.",
    peace: "Peace begins where judgment ends.",
    change: "You are the wave. Change flows through you.",
  };
  document.getElementById('energy-response').innerText = messages[type];
}

  const form = document.getElementById('ideaForm');
  const ideasList = document.querySelector('#submittedIdeas ul');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('dreamerName').value.trim();
    const idea = document.getElementById('ideaInput').value.trim();

    if (name && idea) {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<strong>${name}:</strong> ${idea}`;
      ideasList.appendChild(listItem);

      form.reset();
    }
  });

    document.querySelectorAll('.drawer-header').forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        content.classList.toggle('open');
      });
    });

    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input');
        if (input.value.trim() !== '') {
          const idea = document.createElement('div');
          idea.className = 'idea-card';
          idea.textContent = input.value.trim();
          form.parentElement.querySelector('.ideas').appendChild(idea);
          input.value = '';
        }
      });
    });
    function toggleDrawer(header) {
      const content = header.nextElementSibling;
      const isOpen = content.style.display === "block";
      content.style.display = isOpen ? "none" : "block";
      header.querySelector("span").textContent = isOpen ? "+" : "–";
    }

    function addIdea(category) {
      const input = document.getElementById(`${category}-input`);
      const ideasContainer = document.getElementById(`${category}-ideas`);
      const ideaText = input.value.trim();
      if (ideaText === "") return;

      const ideaCard = document.createElement("div");
      ideaCard.className = "idea-card";
      ideaCard.textContent = ideaText;
      ideasContainer.appendChild(ideaCard);
      input.value = "";
    }
    
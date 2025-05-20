  <script>

    // Accessibility enhancements
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.position = 'absolute';
    skipLink.style.top = '-40px';
    skipLink.style.left = '0';
    skipLink.style.backgroundColor = '#00000';
    skipLink.style.color = '#fff';
    skipLink.style.padding = '8px';
    skipLink.style.zIndex = '100';
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '0';
    });
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    // Save checklist state to local storage
    const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        localStorage.setItem(checkbox.id, checkbox.checked);
      });
      const saved = localStorage.getItem(checkbox.id);
      if (saved !== null) {
        checkbox.checked = saved === 'true';
      }
    });
  </script>

    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css">
    <script>var map = L.map('interactive-map', {
  zoomControl: false
}).setView([20.0, 0.0], 2);
L.control.zoom({
  position: 'topright'
}).addTo(map);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);
const disasterRegions = [{
  lat: 36.2048,
  lng: 138.2529,
  type: 'earthquake',
  label: 'Pacific Ring of Fire'
}, {
  lat: 1.3521,
  lng: 103.8198,
  type: 'flood',
  label: 'Southeast Asia Monsoon'
}, {
  lat: -25.2744,
  lng: 133.7751,
  type: 'fire',
  label: 'Australian Bushfires'
}, {
  lat: 27.5142,
  lng: 90.4336,
  type: 'landslide',
  label: 'Himalayan Region'
}, {
  lat: -20.2833,
  lng: 57.5000,
  type: 'cyclone',
  label: 'Indian Ocean Cyclones'
}];
disasterRegions.forEach(region => {
  L.marker([region.lat, region.lng], {
    icon: L.divIcon({
      className: 'custom-div-icon',
      html: `<div style='background-color:${getDisasterColor(region.type)}; 
                     width:20px; height:20px; border-radius:50%; border:2px solid white;'></div>`,
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })
  }).addTo(map).bindPopup(region.label);
});
function getDisasterColor(type) {
  switch (type) {
    case 'earthquake':
      return '#FFB900';
    case 'flood':
      return '#4A90E2';
    case 'fire':
      return '#FF5252';
    case 'landslide':
      return '#8B9467';
    case 'cyclone':
      return '#03A9F4';
    default:
      return '#ad2507';
  }
}
const legend = L.control({
  position: 'bottomright'
});
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.style.background = 'white';
  div.style.padding = '1rem';
  div.style.borderRadius = '6px';
  div.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
  div.innerHTML += '<h4 style="color: #ad2507; margin-top: 0;">Current Alerts</h4>';
  div.innerHTML += '<i style="background: #4A90E2; display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 5px; border: 2px solid white;"></i> Flooding<br>';
  div.innerHTML += '<i style="background: #FF5252; display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 5px; border: 2px solid white;"></i> Wildfires<br>';
  div.innerHTML += '<i style="background: #FFB900; display: inline-block; width: 12px; height: 12px; border-radius: 50%; margin-right: 5px; border: 2px solid white;"></i> Earthquakes<br>';
  return div;
};
legend.addTo(map);
map.keyboard.enable();
map.scrollWheelZoom.enable();
async function getLocalDisasterRisks() {
  try {
    const position = await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Location timeout')), 10000);
      navigator.geolocation.getCurrentPosition(pos => {
        clearTimeout(timeout);
        resolve(pos);
      }, err => {
        clearTimeout(timeout);
        reject(err);
      }, {
        enableHighAccuracy: true
      });
    });
    const response = await fetch('/api/ai_completion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: `Analyze disaster risks for location considering:
                  - Historical data
                  - Climate patterns
                  - Infrastructure
                  - Population density`,
        data: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        }
      })
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const risks = await response.json();
    updateLocalRiskDisplay(risks);
  } catch (error) {
    console.error('Error getting local risks:', error);
    updateLocalRiskDisplay({
      error: true,
      message: 'Unable to get local risk data'
    });
  }
}
function updateLocalRiskDisplay(risks) {}
document.addEventListener('DOMContentLoaded', () => {
  getLocalDisasterRisks();
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(registration => {
    registration.addEventListener('statechange', () => {
      if (registration.installing) {
        registration.installing.addEventListener('statechange', () => {
          if (registration.active) {
            checkConnectivity();
          }
        });
      }
    });
  });
}

function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    var marker = new google.maps.Marker({
        position: { lat: -34.397, lng: 150.644 },
        map: map
    });
}

window.onload = function() {
    initMap(); // Zorgt ervoor dat de kaart wordt geladen zodra de pagina klaar is
};

function checkConnectivity() {
  const notice = document.getElementById('offline-notice');
  if (!navigator.onLine) {
    notice.hidden = false;
  }
  window.addEventListener('online', () => notice.hidden = true);
  window.addEventListener('offline', () => notice.hidden = false);
}
function adjustFontSize(delta) {
  const html = document.documentElement;
  const currentSize = parseFloat(window.getComputedStyle(html).fontSize);
  html.style.fontSize = currentSize + delta + 'px';
}
document.getElementById('contrast-toggle').addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
});
function readPage() {
  if (responsiveVoice.isPlaying()) {
    responsiveVoice.cancel();
    document.querySelector('.controls button').setAttribute('aria-pressed', 'false');
  } else {
    const mainContent = document.querySelector('main').textContent;
    responsiveVoice.speak(mainContent, 'UK English Male', {
      pitch: 1,
      rate: 0.9,
      onstart: () => document.querySelector('.controls button').setAttribute('aria-pressed', 'true'),
      onend: () => document.querySelector('.controls button').setAttribute('aria-pressed', 'false')
    });
  }
}
window.addEventListener('resize', function () {
  map.invalidateSize();
});
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    layout: google.translate.TranslateElement.InlineLayout.SIMPLE
  }, 'google_translate_element');
}
const rtlLanguages = ['ar', 'fa', 'he', 'ur'];
const userLanguage = navigator.language.split('-')[0];
if (rtlLanguages.includes(userLanguage)) {
  document.documentElement.setAttribute('dir', 'rtl');
}</script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".menu-items");

    menuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open'); 
    });
  });
let fontSize = 16;
function increaseFontSize() {
  fontSize += 2;
  document.body.style.fontSize = `${fontSize}px`;
}

function decreaseFontSize() {
  fontSize -= 2;
  document.body.style.fontSize = `${fontSize}px`;
}

function toggleDyslexicFont() {
  document.body.classList.toggle('dyslexic');
}

  <div id="speech-status" role="status" aria-live="polite"></div>
function toggleHighContrast() {
  // Toggle logica voor high contrast modus
  const accessibility-btn = document.querySelector('[aria-label="Toggle high contrast"]');
  const isPressed = accessibility-btn.getAttribute('aria-pressed') === 'true';
  accessibility-btn.setAttribute('aria-pressed', !isPressed);
}
</script>
  <script>
    function toggleHighContrast() {
      document.body.dataset.theme = document.body.dataset.theme === 'high-contrast' ? '' : 'high-contrast';
    }
function toggleHighContrast() {
  // Toggle logica voor high contrast modus
  const accessibility-btn = document.querySelector('[aria-label="Toggle high contrast"]');
  const isPressed = accessibility-btn.getAttribute('aria-pressed') === 'true';
  accessibility-btn.setAttribute('aria-pressed', !isPressed);
}

    function toggleDarkMode() {
      document.body.dataset.theme = document.body.dataset.theme === 'dark' ? '' : 'dark';
    }

    function increaseFontSize() {
      document.body.style.fontSize = `${(parseFloat(getComputedStyle(document.body).fontSize) * 1.1)}px`;
    }

    function decreaseFontSize() {
      document.body.style.fontSize = `${(parseFloat(getComputedStyle(document.body).fontSize) * 0.9)}px`;
    }

    function toggleDyslexicFont() {
      document.body.classList.toggle('dyslexic');
    }

    async function changeLanguage(lang) {
      console.log(`Changing language to ${lang}`);
    }

    let speaking = false;
    let speechSynthesis = window.speechSynthesis;
    let currentUtterance = null;

    function toggleSpeech() {
      if (speaking) {
        stopSpeech();
      } else {
        startSpeech();
      }
    }

    function startSpeech() {
      speaking = true;
      const textToRead = document.body.innerText;
      currentUtterance = new SpeechSynthesisUtterance(textToRead);
      
      currentUtterance.onstart = () => {
        document.querySelector('#speech-status').style.display = 'block';
        document.querySelector('#speech-status').textContent = 'Reading content...';
      };
      
      currentUtterance.onend = () => {
        speaking = false;
        document.querySelector('#speech-status').style.display = 'none';
      };
      
      speechSynthesis.speak(currentUtterance);
    }

    function stopSpeech() {
      speaking = false;
      speechSynthesis.cancel();
      document.querySelector('#speech-status').style.display = 'none';
    }

    function toggleDyslexicFont() {
      document.body.dataset.theme = document.body.dataset.theme === 'dyslexic' ? '' : 'dyslexic';
    }

    function toggleMenu() {
      const menuItems = document.querySelector('.menu-items');
      menuItems.classList.toggle('active');
    }

    document.querySelectorAll('.social-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        let shareUrl;
        
        if (btn.getAttribute('aria-label').includes('Facebook')) {
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        } else if (btn.getAttribute('aria-label').includes('Twitter')) {
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        } else if (btn.getAttribute('aria-label').includes('LinkedIn')) {
          shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        } else if (btn.getAttribute('aria-label').includes('WhatsApp')) {
          shareUrl = `https://wa.me/?text=${title}%20${url}`;
        }
        
        window.open(shareUrl, '_blank', 'width=600,height=400');
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.classList.contains('section')) {
        e.target.click();
      }
    });

    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.position = 'absolute';
    announcer.style.left = '-9999px';
    document.body.appendChild(announcer);

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      const menu = document.querySelector('.menu-items');
      const menuBtn = document.querySelector('.mobile-menu-btn');
      if (!menu.contains(e.target) && !menuBtn.contains(e.target) && menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        document.querySelector('.menu-items').classList.remove('active');
      }
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  </script>
<script>
  document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuItems = document.querySelector(".menu-items");

    menuToggle.addEventListener("click", function () {
      menuItems.classList.toggle("show");
    });
  });
</script>
  <script>
    function printChecklist() {
      window.print();
    }
  </script>
  <a href="#" onclick="scrollToTop()" class="back-to-top" aria-label="Back to Top">
    <i class="fas fa-arrow-up"></i>
  </a>
<script>
   document.addEventListener("DOMContentLoaded", function () {
     const menuToggle = document.querySelector(".menu-toggle");
</html>
<script>
  function copyLink() {
    const link = window.location.href;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    }, () => {
      alert("Failed to copy the link.");
    });
  }
</script>
<script>
// Toggle for High Contrast Mode
function toggleHighContrast() {
  const accessibility-btn = document.getElementById('high-contrast-toggle');
  const isActive = accessibility-btn.getAttribute('aria-pressed') === 'true';
  accessibility-btn.setAttribute('aria-pressed', !isActive);
  // Voeg hier de daadwerkelijke functie toe om de modus te schakelen
}

// Toggle for Dark Mode
function toggleDarkMode() {
  const accessibility-btn = document.getElementById('dark-mode-toggle');
  const isActive = accessibility-btn.getAttribute('aria-pressed') === 'true';
  accessibility-btn.setAttribute('aria-pressed', !isActive);
  // Voeg hier de daadwerkelijke functie toe om de modus te schakelen
}

// Toggle for Dyslexic Font
function toggleDyslexicFont() {
  const accessibility-btn = document.getElementById('dyslexic-font-toggle');
  const isActive = accessibility-btn.getAttribute('aria-pressed') === 'true';
  accessibility-btn.setAttribute('aria-pressed', !isActive);
  // Voeg hier de daadwerkelijke functie toe om het lettertype te schakelen
}

// Toggle for Speech (Text to Speech)
function toggleSpeech() {
  const accessibility-btn = document.getElementById('speech-toggle');
  const isActive = accessibility-btn.getAttribute('aria-pressed') === 'true';
  accessibility-btn.setAttribute('aria-pressed', !isActive);
  // Voeg hier de daadwerkelijke functie toe voor tekst-naar-spraak
}

// Increase Font Size
function increaseFontSize() {
  document.body.style.fontSize = 'larger';
}

// Decrease Font Size
function decreaseFontSize() {
  document.body.style.fontSize = 'smaller';
}

// Change Language
function changeLanguage(language) {
  // Voeg hier logica toe om de taal te veranderen op basis van de geselecteerde waarde
}
// Focus op de knop nadat een actie is uitgevoerd
function focusOnButton(buttonId) {
  document.getElementById(buttonId).focus();
}

// Voorbeeld met de Dark Mode
function toggleDarkMode() {
  const button = document.getElementById('dark-mode-toggle');
  const isActive = button.getAttribute('aria-pressed') === 'true';
  button.setAttribute('aria-pressed', !isActive);
  focusOnButton('dark-mode-toggle');
  // Voeg hier de daadwerkelijke functie toe om de modus te schakelen
}
function changeLanguage(language) {
  const languageMessage = document.getElementById('language-message');
  // Geef de taalwijziging weer
  languageMessage.textContent = `Language changed to ${language}`;
  // Voeg hier de daadwerkelijke logica toe voor de taalverandering
}
</script>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-WDKM196D4S"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-WDKM196D4S');
</script>
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MPMSW2N');</script>
<!-- End Google Tag Manager -->

</body>
</html>
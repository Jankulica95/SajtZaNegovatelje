// Navbar shadow on scroll
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// FAQ accordion
function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const body = item.querySelector('.faq-body');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i => {
    i.classList.remove('open');
    i.querySelector('.faq-body').classList.remove('open');
  });
  if (!isOpen) {
    item.classList.add('open');
    body.classList.add('open');
  }
}

// Mobile menu
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Service dialog data
const serviceDialogData = {
  druzenje: {
    icon: '💬',
    title: 'Druženje i razgovor',
    paragraphs: [
      'Dolazimo da provedemo kvalitetno vreme – uz razgovor, kafu i pažnju koja znači.',
      'Slušamo, pričamo, delimo svakodnevne teme i stvaramo osećaj bliskosti.',
      'Za mnoge starije osobe upravo je razgovor ono što im najviše nedostaje.',
      'Naš cilj je da se neko raduje dolasku i da se ne oseća usamljeno.'
    ]
  },
  setnje: {
    icon: '🚶',
    title: 'Šetnja i izlasci',
    paragraphs: [
      'Zajedno izlazimo u šetnju, na kolače, u pozorište, park ili na druga prijatna mesta za odmor i razonodu.',
      'Prilagođavamo tempo i aktivnosti mogućnostima i željama korisnika.',
      'Važno nam je da boravak napolju bude prijatan, siguran i opušten.',
      'Mali izlasci često prave veliku razliku u raspoloženju.'
    ]
  },
  nabavka: {
    icon: '🛒',
    title: 'Nabavka i obaveze',
    paragraphs: [
      'Preuzimamo svakodnevne obaveze koje mogu da budu naporne ili komplikovane.',
      'Odlazimo u nabavku, po lekove, u apoteku, po dokumenta ili druge potrebne stvari.',
      'Po potrebi, sve radimo samostalno ili u dogovoru sa korisnikom.',
      'Cilj je da svakodnevica bude jednostavnija i bez stresa.'
    ]
  },
  pomoc: {
    icon: '🏡',
    title: 'Lakša pomoć u kući',
    paragraphs: [
      'Pomažemo oko jednostavnih kućnih poslova koji olakšavaju dan.',
      'To uključuje spremanje osnovnih obroka, pranje sudova, veša ili lagano sređivanje prostora.',
      'Ne radimo generalna čišćenja, već ono što doprinosi svakodnevnom komforu.',
      'Važno nam je da prostor ostane uredan i prijatan za boravak.'
    ]
  },
  lekar: {
    icon: '🚗',
    title: 'Pratnja kod lekara',
    paragraphs: [
      'Pratimo korisnika na preglede, kontrole ili terapije.',
      'Pomažemo oko organizacije odlaska i pružamo podršku tokom celog procesa.',
      'Tu smo da olakšamo komunikaciju i da neko bude uz njih kada je najpotrebnije.',
      'Ova usluga donosi sigurnost i korisniku i porodici.'
    ]
  },
  podrska: {
    icon: '🤲',
    title: 'Podrška u svakodnevici',
    paragraphs: [
      'Tu smo za sve male stvari koje čine dan lepšim i lakšim.',
      'Pomažemo da se održi rutina, sigurnost i osećaj da je neko tu.',
      'Prilagođavamo se svakom korisniku i njegovim navikama.',
      'Naš zadatak nije samo pomoć, već prisustvo koje znači.'
    ]
  }
};

function openServiceDialog(key) {
  const data = serviceDialogData[key];
  if (!data) return;
  document.getElementById('serviceDialogIcon').textContent = data.icon;
  document.getElementById('serviceDialogTitle').textContent = data.title;
  document.getElementById('serviceDialogBody').innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join('');
  document.getElementById('serviceDialogOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeServiceDialog() {
  document.getElementById('serviceDialogOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeServiceDialog();
});

// Kontaktirajte nas: tel na mobilnom, #kontakt na desktopu
function handleContactBtn(e) {
  e.preventDefault();
  const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    || (navigator.maxTouchPoints > 1 && window.innerWidth < 1024);
  if (isMobile) {
    window.location.href = 'tel:0601234567';
  } else {
    document.getElementById('kontakt').scrollIntoView({ behavior: 'smooth' });
  }
}

// Form submit with Formspree
async function handleSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const data = new FormData(form);
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      form.style.display = 'none';
      document.getElementById('successMsg').style.display = 'block';
    } else {
      alert('Došlo je do greške. Molimo kontaktirajte nas direktno na 060 123 45 67.');
    }
  } catch {
    alert('Nema internet konekcije. Pozovite nas direktno na 060 123 45 67.');
  }
}

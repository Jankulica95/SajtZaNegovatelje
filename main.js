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

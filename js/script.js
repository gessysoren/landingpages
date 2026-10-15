const menuButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav');

if (menuButton && nav) {
  const mobileNavigation = window.matchMedia('(max-width: 1190px)');
  const navLinks = [...nav.querySelectorAll('a[href]')];

  const setMenuOpen = (open, returnFocus = false) => {
    const isOpen = open && mobileNavigation.matches;
    nav.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    if (returnFocus) menuButton.focus({ preventScroll: true });
  };

  const openMenu = (lastLink = false) => {
    setMenuOpen(true);
    if (mobileNavigation.matches) {
      const link = lastLink ? navLinks[navLinks.length - 1] : navLinks[0];
      link?.focus({ preventScroll: true });
    }
  };

  menuButton.addEventListener('click', () => {
    if (nav.classList.contains('open')) setMenuOpen(false);
    else openMenu();
  });

  menuButton.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
    event.preventDefault();
    openMenu(event.key === 'ArrowUp');
  });

  navLinks.forEach(link => link.addEventListener('click', () => setMenuOpen(false)));

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      event.preventDefault();
      setMenuOpen(false, true);
    }
  });

  document.addEventListener('pointerdown', event => {
    if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  const closeAfterFocusLeaves = event => {
    if (!nav.contains(event.relatedTarget) && !menuButton.contains(event.relatedTarget)) {
      setMenuOpen(false);
    }
  };
  nav.addEventListener('focusout', closeAfterFocusLeaves);
  menuButton.addEventListener('focusout', closeAfterFocusLeaves);

  const syncNavigation = () => {
    const focusWillBeHidden = mobileNavigation.matches && nav.contains(document.activeElement);
    setMenuOpen(false, focusWillBeHidden);
  };
  mobileNavigation.addEventListener('change', syncNavigation);
  syncNavigation();
}

// Links de seção usam a navegação nativa, sem deslocamento de um cabeçalho fixo.
const testimonialSlides = [
  { label: 'DEPOIMENTO 01 / EM VALIDAÇÃO', text: 'Aqui será inserido o relato real de uma paciente, com autorização para uso e preservação de suas palavras.' },
  { label: 'DEPOIMENTO 02 / EM VALIDAÇÃO', text: 'Espaço reservado para uma experiência real sobre o atendimento, o acolhimento e o planejamento individualizado.' },
  { label: 'DEPOIMENTO 03 / EM VALIDAÇÃO', text: 'Uma terceira história poderá ser incluída após a seleção e aprovação do depoimento pela profissional e pela paciente.' }
];
const testimonialTag = document.querySelector('#testi-tag');
const testimonialText = document.querySelector('#testi-text');
const testimonialCount = document.querySelector('#testi-count');
let slide = 0;

function showSlide(index) {
  if (!testimonialTag || !testimonialText || !testimonialCount) return;
  slide = (index + testimonialSlides.length) % testimonialSlides.length;
  testimonialTag.textContent = testimonialSlides[slide].label;
  testimonialText.textContent = testimonialSlides[slide].text;
  testimonialCount.textContent = `${String(slide + 1).padStart(2, '0')} / ${String(testimonialSlides.length).padStart(2, '0')}`;
}

document.querySelector('#prev-test')?.addEventListener('click', () => showSlide(slide - 1));
document.querySelector('#next-test')?.addEventListener('click', () => showSlide(slide + 1));

const modal = document.querySelector('#demo-dialog');
document.querySelectorAll('.js-demo').forEach(link => link.addEventListener('click', event => {
  if (!modal) return;
  event.preventDefault();
  if (!modal.open) modal.showModal();
}));
document.querySelector('.dialog-close')?.addEventListener('click', () => modal?.close());
document.querySelector('.dialog-close-bottom')?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', event => {
  if (event.target !== modal) return;
  const bounds = modal.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom) {
    modal.close();
  }
});

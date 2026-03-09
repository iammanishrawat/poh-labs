$('.carouselArea').owlCarousel({
    loop: false,
    margin: 20,
    nav: true,
    navRewind:false,
    dots: false,
    autoplay: false,

    responsive: {
    0: {
        items: 1
    },
    400: {
        items: 2
    },
    800: {
        items: 3
    },
    1000: {
        items: 3
    },
    1200: {
        items: 4
    }
  }
});


$('.healthConcernCarouselArea').owlCarousel({
    loop: false,
    margin: 20,
    nav: true,
    navRewind:false,
    dots: false,
    autoplay: false,

    responsive: {
    0: {
        items: 2
    },
    600: {
        items: 3
    },
    1000: {
        items: 4
    },
    1200: {
        items: 6
    }
  }
});


const headers = document.querySelectorAll(".accordion-header");

headers.forEach(header => {
  header.addEventListener("click", () => {
    const item = header.parentElement;

    // close others (optional)
    document.querySelectorAll(".accordion-item").forEach(i => {
      if (i !== item) i.classList.remove("active");
    });

    item.classList.toggle("active");
  });
});


// ---------- Modal Helper ----------
const openModal = (btnId, modalId, onOpen) => {
  const btn = document.getElementById(btnId);
  const el = document.getElementById(modalId);

  if (!btn || !el) return null;

  const modal = new bootstrap.Modal(el);

  btn.addEventListener('click', () => {
    modal.show();
    onOpen && onOpen();
  });

  return modal;
};

// ---------- Modals ----------
const addressModal = openModal('openModal', 'addressModal');
const loginModal = openModal('openLogin', 'loginModal');
const otpModal = openModal('openOtp', 'otpModal', () => loginModal?.hide());
const dateModal = openModal('openDateTime', 'dateTimeModal', renderCalendar);

// ---------- OTP Inputs ----------
document.querySelectorAll('.otpInputs input').forEach((input, i, arr) => {

  input.addEventListener('input', () => arr[i + 1]?.focus());

  input.addEventListener('keydown', e => {
    if (e.key === 'Backspace' && !input.value) arr[i - 1]?.focus();
  });

});

// ---------- Calendar ----------
let currentDate = new Date();

const monthYear = document.getElementById('monthYear');
const datesGrid = document.getElementById('datesGrid');

function renderCalendar() {

  datesGrid.innerHTML = '';

  const y = currentDate.getFullYear();
  const m = currentDate.getMonth();

  monthYear.textContent =
    currentDate.toLocaleString('default', { month: 'long' }) + ' ' + y;

  const firstDay = new Date(y, m, 1).getDay() || 7;
  const totalDays = new Date(y, m + 1, 0).getDate();

  for (let i = 1; i < firstDay; i++) datesGrid.append(document.createElement('span'));

  for (let d = 1; d <= totalDays; d++) {
    const s = document.createElement('span');
    s.textContent = d;

    s.onclick = () => {
      datesGrid.querySelectorAll('span').forEach(x => x.classList.remove('active'));
      s.classList.add('active');
    };

    datesGrid.appendChild(s);
  }
}

document.getElementById('prevMonth').onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

document.getElementById('nextMonth').onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

// ---------- Time Slots ----------
document.querySelectorAll('.slot').forEach(slot => {
  slot.onclick = () => {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active'));
    slot.classList.add('active');
  };
});

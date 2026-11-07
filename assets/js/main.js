/**
 * Shiloh & Smith Solutions - Interactive Features & Quote Builder
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initLanguageMatrix();
  initQuoteCalculator();
  initFaqAccordion();
  initSmoothScroll();
});

/* Mobile Navigation */
function initMobileNav() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* Interactive Language Matrix */
const languageData = {
  french: {
    name: 'French (Français)',
    code: 'FR',
    flag: '🇫🇷',
    scope: 'United Nations, African Union (AU), Francophonie & Great Lakes Region',
    pairings: 'FR ⇄ EN, FR ⇄ SW, FR ⇄ AR, FR ⇄ ES, FR ⇄ PT',
    specialties: 'Diplomatic Summits, Human Rights Charters, Peacekeeping Treaties, Cross-Border Trade & NGO Forums',
    boothCount: 'Dual-interpreter soundproof booth with DIS / Bosch consoles'
  },
  english: {
    name: 'English (UK / US)',
    code: 'EN',
    flag: '🇬🇧',
    scope: 'Global Multilateral Summits, Commonwealth, UN Plenaries, Tech & Finance',
    pairings: 'EN ⇄ FR, EN ⇄ SW, EN ⇄ ES, EN ⇄ AR, EN ⇄ PT',
    specialties: 'Bilateral Negotiations, Corporate AGMs, Scientific Symposia & Hybrid RSI Webinars',
    boothCount: 'Master relay feed to all breakout channels with multi-channel IR distribution'
  },
  swahili: {
    name: 'Kiswahili (East African Official)',
    code: 'SW',
    flag: '🇰🇪 🇹🇿',
    scope: 'East African Community (EAC), ICGLR, Regional Parliaments, Grassroots & Development',
    pairings: 'SW ⇄ EN, SW ⇄ FR',
    specialties: 'Regional Trade Summits, East African Legislative Assembly, Agricultural & Humanitarian Assemblies',
    boothCount: 'High-clarity vocal routing for regional terminology & technical vocabulary'
  },
  spanish: {
    name: 'Spanish (Español)',
    code: 'ES',
    flag: '🇪🇸',
    scope: 'United Nations, Ibero-American Summits, Red Cross (ICRC/IFRC) & Global Humanitarian',
    pairings: 'ES ⇄ EN, ES ⇄ FR',
    specialties: 'International Humanitarian Law, Global Climate Summits, Diplomatic Missions',
    boothCount: 'Certified UN/AIIC level conference interpreters with ISO 4043 isolation'
  },
  portuguese: {
    name: 'Portuguese (Português)',
    code: 'PT',
    flag: '🇵🇹 🇦🇴',
    scope: 'CPLP, Lusophone Africa (Angola, Mozambique), SADC, Regional Maritime Forums',
    pairings: 'PT ⇄ EN, PT ⇄ FR',
    specialties: 'Energy & Mining Conferences, Multilateral Bilaterals, Trade Protocols',
    boothCount: 'Seamless relay interpretation with low-latency digital synchronization'
  },
  arabic: {
    name: 'Arabic (العربية)',
    code: 'AR',
    flag: '🇦🇪 🇸🇦',
    scope: 'United Nations, League of Arab States, IGAD, Horn of Africa & Middle East Affairs',
    pairings: 'AR ⇄ EN, AR ⇄ FR',
    specialties: 'High-Level Diplomatic Plenaries, Humanitarian Aid Convoys, Cross-Continental Alliances',
    boothCount: 'Specialized phonetic isolation and acoustic filtering for tonal precision'
  }
};

function initLanguageMatrix() {
  const buttons = document.querySelectorAll('[data-lang-btn]');
  const titleEl = document.getElementById('lang-title');
  const scopeEl = document.getElementById('lang-scope');
  const pairingsEl = document.getElementById('lang-pairings');
  const specialtiesEl = document.getElementById('lang-specialties');
  const techEl = document.getElementById('lang-tech');
  const badgeEl = document.getElementById('lang-flag-badge');

  if (!buttons.length || !titleEl) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => {
        b.classList.remove('bg-sky-600', 'text-white', 'border-sky-600', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
      });

      btn.classList.add('bg-sky-600', 'text-white', 'border-sky-600', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');

      const langKey = btn.getAttribute('data-lang-btn');
      const data = languageData[langKey];

      if (data) {
        titleEl.textContent = data.name;
        if (badgeEl) badgeEl.textContent = data.flag + ' ' + data.code;
        if (scopeEl) scopeEl.textContent = data.scope;
        if (pairingsEl) pairingsEl.textContent = data.pairings;
        if (specialtiesEl) specialtiesEl.textContent = data.specialties;
        if (techEl) techEl.textContent = data.boothCount;
      }
    });
  });
}

/* Interactive Quote Estimator */
function initQuoteCalculator() {
  const form = document.getElementById('quote-calculator-form');
  if (!form) return;

  const eventTypeSelect = document.getElementById('calc-event-type');
  const delegatesInput = document.getElementById('calc-delegates');
  const daysInput = document.getElementById('calc-days');
  const languagesCheckboxes = document.querySelectorAll('input[name="calc-lang"]:checked');
  const equipmentCheckboxes = document.querySelectorAll('input[name="calc-equip"]:checked');

  // Summary targets
  const summaryService = document.getElementById('summary-service');
  const summaryDelegates = document.getElementById('summary-delegates');
  const summaryDays = document.getElementById('summary-days');
  const summaryLanguages = document.getElementById('summary-languages');
  const summaryEquipment = document.getElementById('summary-equipment');
  const whatsappBtn = document.getElementById('calc-whatsapp-btn');
  const emailBtn = document.getElementById('calc-email-btn');

  function updateSummary() {
    const eventType = eventTypeSelect ? eventTypeSelect.value : 'On-Site Conference';
    const delegates = delegatesInput ? delegatesInput.value || 50 : 50;
    const days = daysInput ? daysInput.value || 1 : 1;

    const selectedLangs = [];
    document.querySelectorAll('input[name="calc-lang"]:checked').forEach(cb => {
      selectedLangs.push(cb.value);
    });

    const selectedEquip = [];
    document.querySelectorAll('input[name="calc-equip"]:checked').forEach(cb => {
      selectedEquip.push(cb.value);
    });

    if (summaryService) summaryService.textContent = eventType;
    if (summaryDelegates) summaryDelegates.textContent = `${delegates} Delegates`;
    if (summaryDays) summaryDays.textContent = `${days} Day(s)`;
    if (summaryLanguages) summaryLanguages.textContent = selectedLangs.length ? selectedLangs.join(', ') : 'English, French';
    if (summaryEquipment) summaryEquipment.textContent = selectedEquip.length ? selectedEquip.join(', ') : 'Standard Booth & Headsets';

    // Format WhatsApp Message
    const clientNameInput = document.getElementById('calc-client-name');
    const clientOrgInput = document.getElementById('calc-client-org');
    const clientDateInput = document.getElementById('calc-client-date');
    
    const clientName = clientNameInput && clientNameInput.value ? clientNameInput.value : 'Inquirer';
    const clientOrg = clientOrgInput && clientOrgInput.value ? clientOrgInput.value : 'Organization';
    const clientDate = clientDateInput && clientDateInput.value ? clientDateInput.value : 'Upcoming';

    const waText = encodeURIComponent(
      `*NEW QUOTATION INQUIRY - Shiloh & Smith Solutions*\n` +
      `--------------------------------------\n` +
      `👤 *Name / Contact:* ${clientName}\n` +
      `🏢 *Organization:* ${clientOrg}\n` +
      `📅 *Target Date:* ${clientDate}\n` +
      `🎯 *Event Format:* ${eventType}\n` +
      `👥 *Delegates:* ${delegates}\n` +
      `⏳ *Duration:* ${days} Day(s)\n` +
      `🌐 *Languages:* ${selectedLangs.join(', ') || 'English, French'}\n` +
      `🎙️ *Equipment Required:* ${selectedEquip.join(', ') || 'Standard package'}\n\n` +
      `Please provide an official availability check and quotation proposal. Thank you!`
    );

    if (whatsappBtn) {
      whatsappBtn.href = `https://wa.me/254700567098?text=${waText}`;
    }

    if (emailBtn) {
      const emailSubject = encodeURIComponent(`Quotation Request: ${eventType} - ${clientOrg}`);
      const emailBody = encodeURIComponent(
        `Dear Shiloh & Smith Solutions Team,\n\n` +
        `I would like to request an official quotation with the following parameters:\n\n` +
        `- Client / Contact: ${clientName}\n` +
        `- Organization: ${clientOrg}\n` +
        `- Event Format: ${eventType}\n` +
        `- Target Date: ${clientDate}\n` +
        `- Delegates: ${delegates}\n` +
        `- Duration: ${days} Day(s)\n` +
        `- Languages Needed: ${selectedLangs.join(', ') || 'English, French'}\n` +
        `- Equipment Package: ${selectedEquip.join(', ') || 'Standard package'}\n\n` +
        `Looking forward to receiving your prompt quotation.\n\n` +
        `Best regards,\n${clientName}`
      );
      emailBtn.href = `mailto:bigwi.mike@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    }
  }

  // Bind inputs
  form.querySelectorAll('input, select').forEach(element => {
    element.addEventListener('input', updateSummary);
    element.addEventListener('change', updateSummary);
  });

  updateSummary();
}

/* FAQ Accordion */
function initFaqAccordion() {
  const faqButtons = document.querySelectorAll('.faq-trigger');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      
      const isOpen = !content.classList.contains('hidden');

      // Close all
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
}

/* Smooth Scrolling */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

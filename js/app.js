document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  // 2. Interactive Pattern & Color Customizer (Real Photographic Preview + Pigment Swatch)
  const patternData = {
    corfu_slab: {
      name: 'Κερκυραϊκή Πλάκα (Ashlar)',
      photo: 'assets/user-ashlar-corfu-slab.jpg',
      use: 'Ιδανικό για παραδοσιακές αυλές, καντούνια, βεράντες και κλασικές βίλες στην Κέρκυρα.',
      grip: 'Υψηλή Αντιολισθητικότητα (R11)',
      relief: 'Μεσαίο Ανάγλυφο (4mm)',
      style: 'Παραδοσιακό Επτανησιακό'
    },
    cobblestone: {
      name: 'Κυβόλιθος & Πλακόστρωτο',
      photo: 'assets/project-cobble-corfu-town.jpg',
      use: 'Εξαιρετική αντοχή για ράμπες αυτοκινήτων, χώρους στάθμευσης και παραδοσιακά καντούνια.',
      grip: 'Πολύ Υψηλή Πρόσφυση (R12)',
      relief: 'Βαθύ Ανάγλυφο (6mm)',
      style: 'Διαχρονικό Αρχιτεκτονικό'
    },
    european_fan: {
      name: 'Βοτσαλωτός / Χτενιστός Διάδρομος με Μπορντούρα',
      photo: 'assets/user-stone-villas-walkway.jpg',
      use: 'Αρχοντική επιλογή για πετρόχτιστα συγκροτήματα, ξενοδοχειακές μονάδες και εξωτερικούς διαδρόμους.',
      grip: 'Υψηλή Πρόσφυση (R11-R12)',
      relief: 'Αντιολισθηρή Υφή (4mm)',
      style: 'Πετρόχτιστο / Παραδοσιακό'
    },
    random_stone: {
      name: 'Σταμπωτή Πλάκα Πισίνας & Αίθριου',
      photo: 'assets/user-luxury-villa-pool-pergola.jpg',
      use: 'Φυσική εναρμόνιση με περιβάλλοντες χώρους πισίνας, πέργκολες, κήπους και πολυτελείς βίλες.',
      grip: 'Φυσική Αντιολισθηρή Υφή (R11)',
      relief: 'Οργανικό Ανάγλυφο (5mm)',
      style: 'Μεσογειακό Luxury Resort'
    },
    wood_plank: {
      name: 'Ξύλινη Σανίδα (Deck Πισίνας)',
      photo: 'assets/project-wood-sidari.jpg',
      use: 'Η ζεστασιά του ξύλου γύρω από την πισίνα χωρίς σαπίσματα, ακίδες ή ετήσια συντήρηση.',
      grip: 'Αντιολισθηρά Νερά Ξύλου (R11)',
      relief: 'Λεπτομερή Νερά (3.5mm)',
      style: 'Resort & Poolside'
    },
    slate_rock: {
      name: 'Αντιολισθηρή Χτενιστή Ράμπα Σκυροδέματος',
      photo: 'assets/user-brushed-ramp-seaview.jpg',
      use: 'Μέγιστη πρόσφυση για επικλινείς ράμπες οχημάτων, εισόδους γκαράζ και παραθαλάσσιες ιδιοκτησίες.',
      grip: 'Μέγιστη Αντιολισθηρή Επιφάνεια (R12)',
      relief: 'Βαθιές Αυλακώσεις Πρόσφυσης',
      style: 'Τεχνικό Υψηλής Αντοχής'
    }
  };

  const colorData = {
    terracotta: {
      name: 'Τερακότα Κέρκυρας',
      hex: '#BC664A',
      tint: 'rgba(188, 102, 74, 0.22)',
      filter: 'saturate(1.12) contrast(1.04)'
    },
    stone_grey: {
      name: 'Γκρι Πέτρας',
      hex: '#98958F',
      tint: 'rgba(140, 138, 132, 0.24)',
      filter: 'saturate(0.68) contrast(1.06)'
    },
    ionian_sand: {
      name: 'Άμμος Ιονίου',
      hex: '#D4C1A3',
      tint: 'rgba(212, 193, 163, 0.16)',
      filter: 'saturate(1.02) brightness(1.03)'
    },
    anthracite: {
      name: 'Ανθρακί Γραφίτης',
      hex: '#56595E',
      tint: 'rgba(62, 66, 72, 0.34)',
      filter: 'saturate(0.55) contrast(1.14) brightness(0.90)'
    },
    earth_brown: {
      name: 'Καφέ της Γης',
      hex: '#8E684C',
      tint: 'rgba(142, 104, 76, 0.25)',
      filter: 'sepia(0.22) saturate(1.10) contrast(1.05)'
    }
  };

  let currentPattern = 'corfu_slab';
  let currentColor = 'ionian_sand';
  let currentGloss = 'satin';

  const previewImg = document.getElementById('customizerPreviewImg');
  const previewTintOverlay = document.getElementById('customizerTintOverlay');
  const previewGlossOverlay = document.getElementById('customizerGlossOverlay');
  const swatchChip = document.getElementById('customizerSwatchChip');
  const badgeOverlay = document.getElementById('canvasBadgeOverlay');
  const specTitle = document.getElementById('previewSpecsTitle');
  const specDesc = document.getElementById('previewSpecsDesc');
  const specGrip = document.getElementById('specGrip');
  const specRelief = document.getElementById('specRelief');
  const specStyle = document.getElementById('specStyle');

  function updateCustomizerPreview() {
    const col = colorData[currentColor];
    const pat = patternData[currentPattern];

    if (previewImg) {
      previewImg.src = pat.photo;
      previewImg.style.filter = col.filter;
    }
    if (previewTintOverlay) {
      previewTintOverlay.style.background = col.tint;
    }
    if (previewGlossOverlay) {
      if (currentGloss === 'wet') {
        previewGlossOverlay.style.background =
          'linear-gradient(135deg, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.02) 48%, rgba(0,0,0,0.18) 100%)';
      } else if (currentGloss === 'satin') {
        previewGlossOverlay.style.background =
          'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.08) 100%)';
      } else {
        previewGlossOverlay.style.background = 'rgba(255,255,255,0.02)';
      }
    }
    if (swatchChip) {
      swatchChip.style.backgroundColor = col.hex;
    }

    if (badgeOverlay) {
      badgeOverlay.textContent = `${pat.name} • ${col.name}`;
    }
    if (specTitle) {
      specTitle.textContent = `${pat.name} σε απόχρωση «${col.name}»`;
    }
    if (specDesc) {
      specDesc.textContent = pat.use;
    }
    if (specGrip) specGrip.textContent = pat.grip;
    if (specRelief) specRelief.textContent = pat.relief;
    if (specStyle) specStyle.textContent = pat.style;

    updateEstimatorSummary();
  }

  document.querySelectorAll('.pattern-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPattern = btn.getAttribute('data-pattern');
      updateCustomizerPreview();
    });
  });

  document.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentColor = btn.getAttribute('data-color');
      updateCustomizerPreview();
    });
  });

  document.querySelectorAll('.gloss-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gloss-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGloss = btn.getAttribute('data-gloss');
      updateCustomizerPreview();
    });
  });

  // 3. Project Estimator & Quote Calculator
  const areaRange = document.getElementById('areaRange');
  const areaValueBadge = document.getElementById('areaValueBadge');
  const floorTypeSelect = document.getElementById('floorTypeSelect');
  const regionSelect = document.getElementById('regionSelect');
  const substrateSelect = document.getElementById('substrateSelect');

  const sumArea = document.getElementById('sumArea');
  const sumType = document.getElementById('sumType');
  const sumRegion = document.getElementById('sumRegion');
  const sumCustom = document.getElementById('sumCustom');
  const sumDuration = document.getElementById('sumDuration');
  const sumSpecs = document.getElementById('sumSpecs');

  function updateEstimatorSummary() {
    if (!areaRange) return;
    const sqm = parseInt(areaRange.value, 10) || 120;
    if (areaValueBadge) areaValueBadge.textContent = `${sqm} m²`;
    if (sumArea) sumArea.textContent = `${sqm} m²`;
    if (sumType && floorTypeSelect) {
      sumType.textContent = floorTypeSelect.options[floorTypeSelect.selectedIndex].text;
    }
    if (sumRegion && regionSelect) {
      sumRegion.textContent = regionSelect.options[regionSelect.selectedIndex].text;
    }
    if (sumCustom) {
      sumCustom.textContent = `${patternData[currentPattern].name} (${colorData[currentColor].name})`;
    }
    if (sumDuration) {
      const days = Math.max(2, Math.ceil(sqm / 45));
      sumDuration.textContent = `~${days} - ${days + 2} εργάσιμες ημέρες`;
    }
    if (sumSpecs) {
      const bags = Math.ceil(sqm * 0.35);
      sumSpecs.textContent = `Οπλισμένο σκυρόδεμα C20/25 + ίνες προπυλενίου + ${bags} δοχεία ακρυλικού βερνικιού UV`;
    }
  }

  [areaRange, floorTypeSelect, regionSelect, substrateSelect].forEach(el => {
    if (el) el.addEventListener('input', updateEstimatorSummary);
    if (el) el.addEventListener('change', updateEstimatorSummary);
  });

  const quoteForm = document.getElementById('quoteEstimatorForm');
  const quoteFeedback = document.getElementById('quoteFeedback');
  if (quoteForm) {
    quoteForm.addEventListener('submit', e => {
      e.preventDefault();
      const clientName = document.getElementById('clientName').value.trim() || 'Ενδιαφερόμενος';
      const clientPhone = document.getElementById('clientPhone').value.trim();
      const sqm = areaRange ? areaRange.value : '120';
      const fType = floorTypeSelect ? floorTypeSelect.options[floorTypeSelect.selectedIndex].text : 'Σταμπωτό Δάπεδο';
      const reg = regionSelect ? regionSelect.options[regionSelect.selectedIndex].text : 'Κέρκυρα';

      if (quoteFeedback) {
        quoteFeedback.style.display = 'block';
        quoteFeedback.innerHTML = `
          <strong>✓ Το αίτημα εκτίμησης ετοιμάστηκε, ${clientName}!</strong><br>
          Έργο: <b>${sqm} m² (${fType})</b> στην περιοχή <b>${reg}</b> με σχέδιο <b>${patternData[currentPattern].name}</b>.<br>
          Καλέστε μας απευθείας στο <a href="tel:+306944540855" style="text-decoration:underline;font-weight:700;color:#FFF;">6944 540 855</a> ή στείλτε το αίτημα με 1 κλικ στο <a href="mailto:info@nikoslampropoulos.com?subject=${encodeURIComponent('Αίτημα Προσφοράς Δαπέδου - ' + sqm + 'm2 (' + reg + ')')}&body=${encodeURIComponent('Ονοματεπώνυμο: ' + clientName + '\nΤηλέφωνο: ' + clientPhone + '\nΕπιφάνεια: ' + sqm + ' m²\nΤύπος: ' + fType + '\nΠεριοχή: ' + reg + '\nΕπιλεγμένο Σχέδιο: ' + patternData[currentPattern].name + ' - ' + colorData[currentColor].name)}" style="text-decoration:underline;font-weight:700;color:#FFF;">info@nikoslampropoulos.com</a>.
        `;
      }
    });
  }

  // 4. Gallery Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Initial render
  updateCustomizerPreview();
});

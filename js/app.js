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

  // 2. Hero Background Architectural Texture Canvas
  const heroCanvas = document.getElementById('heroBgCanvas');
  if (heroCanvas) {
    const hCtx = heroCanvas.getContext('2d');
    const renderHeroPattern = () => {
      const w = (heroCanvas.width = heroCanvas.offsetWidth || 1280);
      const h = (heroCanvas.height = heroCanvas.offsetHeight || 680);
      hCtx.fillStyle = '#24211E';
      hCtx.fillRect(0, 0, w, h);

      hCtx.strokeStyle = 'rgba(200, 157, 102, 0.24)';
      hCtx.lineWidth = 2;
      const tileH = 74;
      const tileW = 128;
      for (let row = 0; row < h / tileH + 1; row++) {
        const y = row * tileH;
        hCtx.beginPath();
        hCtx.moveTo(0, y);
        hCtx.lineTo(w, y);
        hCtx.stroke();

        const offset = (row % 2) * (tileW / 2);
        for (let col = -1; col < w / tileW + 2; col++) {
          const x = col * tileW + offset;
          hCtx.beginPath();
          hCtx.moveTo(x, y);
          hCtx.lineTo(x, y + tileH);
          hCtx.stroke();
        }
      }
    };
    renderHeroPattern();
    window.addEventListener('resize', renderHeroPattern);
  }

  // 3. Interactive Pattern & Color Customizer
  const patternData = {
    corfu_slab: {
      name: 'Κερκυραϊκή Πλάκα (Ashlar)',
      use: 'Ιδανικό για παραδοσιακές αυλές, καντούνια, βεράντες και κλασικές βίλες στην Κέρκυρα.',
      grip: 'Υψηλή Αντιολισθητικότητα (R11)',
      relief: 'Μεσαίο Ανάγλυφο (4mm)',
      style: 'Παραδοσιακό Επτανησιακό'
    },
    cobblestone: {
      name: 'Κυβόλιθος Κλασικός',
      use: 'Εξαιρετική αντοχή για ράμπες αυτοκινήτων, χώρους στάθμευσης και εισόδους κατοικιών.',
      grip: 'Πολύ Υψηλή Πρόσφυση (R12)',
      relief: 'Βαθύ Ανάγλυφο (6mm)',
      style: 'Διαχρονικό Αρχιτεκτονικό'
    },
    european_fan: {
      name: 'Ευρωπαϊκή Βεντάλια',
      use: 'Αρχοντική επιλογή για ξενοδοχειακές μονάδες, πλατείες και μεγάλους εξωτερικούς διαδρόμους.',
      grip: 'Υψηλή Πρόσφυση (R11-R12)',
      relief: 'Έντονο Ανάγλυφο (5mm)',
      style: 'Αρχοντικό / Ιστορικό'
    },
    random_stone: {
      name: 'Ακανόνιστη Πέτρα',
      use: 'Φυσική εναρμόνιση με ελαιώνες, κήπους, περιβάλλοντες χώρους πισίνας και εξοχικές κατοικίες.',
      grip: 'Φυσική Αντιολισθηρή Υφή (R11)',
      relief: 'Οργανικό Ανάγλυφο (5mm)',
      style: 'Μεσογειακό Φυσικό'
    },
    wood_plank: {
      name: 'Ξύλινη Σανίδα (Deck)',
      use: 'Η ζεστασιά του ξύλου γύρω από την πισίνα χωρίς σαπίσματα, ακίδες ή ετήσια συντήρηση.',
      grip: 'Αντιολισθηρά Νερά Ξύλου (R11)',
      relief: 'Λεπτομερή Νερά (3.5mm)',
      style: 'Resort & Poolside'
    },
    slate_rock: {
      name: 'Σχιστόλιθος (Slate)',
      use: 'Μοντέρνα minimal αισθητική για σύγχρονες βίλες, αίθρια και τουριστικά καταλύματα.',
      grip: 'Ήπια Αντιολισθηρή Επιφάνεια (R10-R11)',
      relief: 'Λεπτό Στρωματογενές (3mm)',
      style: 'Μοντέρνο Minimal'
    }
  };

  const colorData = {
    terracotta: {
      name: 'Τερακότα Κέρκυρας',
      base: [188, 102, 74],
      grout: [72, 40, 30],
      highlight: [216, 134, 105]
    },
    stone_grey: {
      name: 'Γκρι Πέτρας',
      base: [152, 149, 143],
      grout: [64, 62, 58],
      highlight: [182, 179, 173]
    },
    ionian_sand: {
      name: 'Άμμος Ιονίου',
      base: [212, 193, 163],
      grout: [98, 86, 68],
      highlight: [232, 218, 194]
    },
    anthracite: {
      name: 'Ανθρακί Γραφίτης',
      base: [86, 89, 94],
      grout: [34, 36, 39],
      highlight: [116, 120, 126]
    },
    earth_brown: {
      name: 'Καφέ της Γης',
      base: [142, 104, 76],
      grout: [56, 38, 25],
      highlight: [172, 132, 102]
    }
  };

  let currentPattern = 'corfu_slab';
  let currentColor = 'terracotta';
  let currentGloss = 'satin';

  const previewCanvas = document.getElementById('stampPreviewCanvas');
  const badgeOverlay = document.getElementById('canvasBadgeOverlay');
  const specTitle = document.getElementById('previewSpecsTitle');
  const specDesc = document.getElementById('previewSpecsDesc');
  const specGrip = document.getElementById('specGrip');
  const specRelief = document.getElementById('specRelief');
  const specStyle = document.getElementById('specStyle');

  function drawCustomizerCanvas() {
    if (!previewCanvas) return;
    const ctx = previewCanvas.getContext('2d');
    const w = (previewCanvas.width = 640);
    const h = (previewCanvas.height = 480);

    const col = colorData[currentColor];
    const pat = patternData[currentPattern];

    // Base fill
    ctx.fillStyle = `rgb(${col.base[0]}, ${col.base[1]}, ${col.base[2]})`;
    ctx.fillRect(0, 0, w, h);

    // Subtle organic mineral mottling
    for (let i = 0; i < 420; i++) {
      const rx = (i * 97) % w;
      const ry = (i * 53) % h;
      const rad = 12 + (i % 34);
      const isLight = i % 2 === 0;
      const c = isLight ? col.highlight : col.grout;
      ctx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.08)`;
      ctx.beginPath();
      ctx.arc(rx, ry, rad, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = `rgb(${col.grout[0]}, ${col.grout[1]}, ${col.grout[2]})`;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (currentPattern === 'corfu_slab') {
      ctx.lineWidth = 5;
      const rows = [0, 95, 205, 290, 395, 480];
      for (let r = 0; r < rows.length - 1; r++) {
        const y1 = rows[r];
        const y2 = rows[r + 1];
        ctx.beginPath();
        ctx.moveTo(0, y1);
        ctx.lineTo(w, y1);
        ctx.stroke();

        // Highlight bevel
        ctx.strokeStyle = `rgba(${col.highlight[0]}, ${col.highlight[1]}, ${col.highlight[2]}, 0.55)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, y1 + 4);
        ctx.lineTo(w, y1 + 4);
        ctx.stroke();

        ctx.strokeStyle = `rgb(${col.grout[0]}, ${col.grout[1]}, ${col.grout[2]})`;
        ctx.lineWidth = 5;
        let x = (r % 2) * 75;
        const widths = [140, 190, 125, 165];
        let idx = r;
        while (x < w) {
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
          x += widths[idx % widths.length];
          idx++;
        }
      }
    } else if (currentPattern === 'cobblestone') {
      ctx.lineWidth = 6;
      const bw = 78;
      const bh = 62;
      for (let r = 0; r <= h / bh; r++) {
        const y = r * bh;
        const off = (r % 2) * (bw / 2);
        for (let c = -1; c <= w / bw + 1; c++) {
          const x = c * bw + off;
          ctx.strokeRect(x + 3, y + 3, bw - 6, bh - 6);
          ctx.strokeStyle = `rgba(${col.highlight[0]}, ${col.highlight[1]}, ${col.highlight[2]}, 0.45)`;
          ctx.strokeRect(x + 6, y + 6, bw - 12, bh - 12);
          ctx.strokeStyle = `rgb(${col.grout[0]}, ${col.grout[1]}, ${col.grout[2]})`;
        }
      }
    } else if (currentPattern === 'european_fan') {
      ctx.lineWidth = 4;
      const fanW = 160;
      const fanH = 110;
      for (let r = 0; r <= h / fanH + 1; r++) {
        const cy = r * fanH + 40;
        const off = (r % 2) * (fanW / 2);
        for (let c = -1; c <= w / fanW + 1; c++) {
          const cx = c * fanW + off;
          for (let rad = 28; rad <= 95; rad += 22) {
            ctx.beginPath();
            ctx.arc(cx, cy, rad, Math.PI * 1.15, Math.PI * 1.85);
            ctx.stroke();
          }
          for (let a = 1.15; a <= 1.86; a += 0.14) {
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a * Math.PI) * 28, cy + Math.sin(a * Math.PI) * 28);
            ctx.lineTo(cx + Math.cos(a * Math.PI) * 94, cy + Math.sin(a * Math.PI) * 94);
            ctx.stroke();
          }
        }
      }
    } else if (currentPattern === 'random_stone') {
      ctx.lineWidth = 6;
      const centers = [];
      for (let gy = 45; gy < h + 40; gy += 95) {
        for (let gx = 45; gx < w + 40; gx += 110) {
          centers.push([
            gx + Math.sin(gy * 0.13) * 24,
            gy + Math.cos(gx * 0.17) * 22
          ]);
        }
      }
      // Draw organic polygon stone web
      const cols = 6;
      for (let i = 0; i < centers.length; i++) {
        const [x1, y1] = centers[i];
        if (i + 1 < centers.length && (i + 1) % cols !== 0) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(centers[i + 1][0], centers[i + 1][1]);
          ctx.stroke();
        }
        if (i + cols < centers.length) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(centers[i + cols][0], centers[i + cols][1]);
          ctx.stroke();
        }
      }
    } else if (currentPattern === 'wood_plank') {
      const plankH = 80;
      for (let r = 0; r < h / plankH; r++) {
        const y = r * plankH;
        ctx.strokeStyle = `rgb(${col.grout[0]}, ${col.grout[1]}, ${col.grout[2]})`;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();

        // Plank vertical joint
        const jx = ((r * 190 + 120) % (w - 120)) + 60;
        ctx.beginPath();
        ctx.moveTo(jx, y);
        ctx.lineTo(jx, y + plankH);
        ctx.stroke();

        // Wood grain lines
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = `rgba(${col.grout[0]}, ${col.grout[1]}, ${col.grout[2]}, 0.35)`;
        for (let g = 12; g < plankH - 8; g += 11) {
          ctx.beginPath();
          ctx.moveTo(0, y + g);
          ctx.bezierCurveTo(w * 0.33, y + g + 5, w * 0.66, y + g - 5, w, y + g);
          ctx.stroke();
        }
      }
    } else if (currentPattern === 'slate_rock') {
      ctx.lineWidth = 4;
      const slateH = 120;
      const slateW = 210;
      for (let r = 0; r <= h / slateH; r++) {
        const y = r * slateH;
        const off = (r % 2) * 105;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
        for (let c = -1; c <= w / slateW + 1; c++) {
          const x = c * slateW + off;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x, y + slateH);
          ctx.stroke();
          // Slate diagonal strata clefts
          ctx.strokeStyle = `rgba(${col.highlight[0]}, ${col.highlight[1]}, ${col.highlight[2]}, 0.28)`;
          ctx.beginPath();
          ctx.moveTo(x + 25, y + 20);
          ctx.lineTo(x + slateW - 35, y + 45);
          ctx.stroke();
          ctx.strokeStyle = `rgb(${col.grout[0]}, ${col.grout[1]}, ${col.grout[2]})`;
        }
      }
    }

    // Sealer Finish Effect (Matte vs Satin vs Wet Look)
    if (currentGloss === 'wet') {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      grad.addColorStop(0.45, 'rgba(255, 255, 255, 0.02)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.18)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (currentGloss === 'satin') {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.10)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0.08)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // Update UI labels
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

    // Also sync with quote calculator hidden/visible summary if present
    updateEstimatorSummary();
  }

  document.querySelectorAll('.pattern-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentPattern = btn.getAttribute('data-pattern');
      drawCustomizerCanvas();
    });
  });

  document.querySelectorAll('.color-swatch-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentColor = btn.getAttribute('data-color');
      drawCustomizerCanvas();
    });
  });

  document.querySelectorAll('.gloss-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.gloss-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentGloss = btn.getAttribute('data-gloss');
      drawCustomizerCanvas();
    });
  });

  // 4. Project Estimator & Quote Calculator
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
    const sqm = parseInt(areaRange.value, 10) || 80;
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
      const sqm = areaRange ? areaRange.value : '80';
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

  // 5. Gallery Filter Tabs
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
  drawCustomizerCanvas();
});

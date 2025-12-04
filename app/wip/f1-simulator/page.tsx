'use client';

import { useEffect, useRef } from 'react';

export default function F1SimulatorPage() {
  const initializedRef = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React Strict Mode
    if (initializedRef.current) return;
    
    // Wait for DOM to be ready
    const initSimulator = () => {
      // ==========================
      // Data
      // ==========================
      const positionPoints: Record<number, number> = {1:25, 2:18, 3:15, 4:12, 5:10, 6:8, 7:6, 8:4, 9:2, 10:1};

      const drivers = [
        {name:'Lando Norris', team:'McLaren', points:408},
        {name:'Max Verstappen', team:'Red Bull', points:396},
        {name:'Oscar Piastri', team:'McLaren', points:392},
        {name:'George Russell', team:'Mercedes', points:309},
        {name:'Charles Leclerc', team:'Ferrari', points:230},
        {name:'Lewis Hamilton', team:'Ferrari', points:152},
        {name:'Kimi Antonelli', team:'Mercedes', points:150},
        {name:'Alexander Albon', team:'Williams', points:73},
        {name:'Carlos Sainz', team:'Williams', points:64},
        {name:'Isack Hadjar', team:'Racing Bulls', points:51},
        {name:'Nico Hülkenberg', team:'Sauber', points:49},
        {name:'Fernando Alonso', team:'Aston Martin', points:48},
        {name:'Oliver Bearman', team:'Haas', points:41},
        {name:'Liam Lawson', team:'Racing Bulls', points:38},
        {name:'Yuki Tsunoda', team:'Racing Bulls/Red Bull', points:33},
        {name:'Esteban Ocon', team:'Haas', points:32},
        {name:'Lance Stroll', team:'Aston Martin', points:32},
        {name:'Pierre Gasly', team:'Alpine', points:22},
        {name:'Gabriel Bortoleto', team:'Sauber', points:19},
        {name:'Franco Colapinto', team:'Alpine', points:0},
        {name:'Jack Doohan', team:'Alpine', points:0}
      ];

      const driverNames = drivers.map(d=>d.name);

      // Function to get driver profile image path
      function getDriverImagePath(name: string): string {
        const nameMap: Record<string, string> = {
          'Lando Norris': 'lando-norris-f1-driver-profile-picture.webp',
          'Max Verstappen': 'max-verstappen-f1-driver-profile-picture.webp',
          'Oscar Piastri': 'oscar-piastri-f1-driver-profile-picture.webp',
          'George Russell': 'george-russell-f1-driver-profile-picture.webp',
          'Charles Leclerc': 'charles-leclerc-f1-driver-profile-picture.webp',
          'Lewis Hamilton': 'lewis-hamilton-f1-driver-profile-picture.webp',
          'Kimi Antonelli': 'kimi-antonelli-f1-driver-profile-picture.webp',
          'Alexander Albon': 'alexander-albon-f1-driver-profile-picture.webp',
          'Carlos Sainz': 'carlos-sainz-f1-driver-profile-picture.webp',
          'Isack Hadjar': 'isack-hadjar-f1-driver-profile-picture.webp',
          'Nico Hülkenberg': 'nico-hulkenberg-f1-driver-profile-picture.webp',
          'Fernando Alonso': 'fernando-alonso-f1-driver-profile-picture.webp',
          'Oliver Bearman': 'oliver-bearman-f1-driver-profile-picture.webp',
          'Liam Lawson': 'liam-lawson-f1-driver-profile-picture.webp',
          'Yuki Tsunoda': 'yuki-tsunoda-f1-driver-profile-picture.webp',
          'Esteban Ocon': 'esteban-ocon-f1-driver-profile-picture.webp',
          'Lance Stroll': 'lance-stroll-f1-driver-profile-picture.webp',
          'Pierre Gasly': 'pierre-gasly-f1-driver-profile-picture.webp',
          'Gabriel Bortoleto': 'gabriel-bortoleto-f1-driver-profile-picture.webp',
          'Franco Colapinto': 'franco-colapinto-f1-driver-profile-picture.webp'
        };
        const filename = nameMap[name];
        return filename ? `/images/drivers-profiles/${filename}` : '';
      }

      // ==========================
      // DOM helpers
      // ==========================
      const pointsBody = document.querySelector('#pointsTable tbody');
      const leaderName = document.querySelector('#leaderName');
      const fastestLapSel = document.querySelector('#fastestLap') as HTMLSelectElement;
      const positionsWrap = document.querySelector('#positions');
      const dnfListWrap = document.querySelector('#dnfList');
      const resetBtn = document.querySelector('#resetBtn');
      const presetMaxBtn = document.querySelector('#presetMaxBtn');

      if (!pointsBody || !leaderName || !fastestLapSel || !positionsWrap || !dnfListWrap || !resetBtn || !presetMaxBtn) {
        console.warn('F1 Simulator: Some DOM elements not found, retrying...');
        return false;
      }

      initializedRef.current = true;

      // Build fastest lap options (None/Outside Top-10 + all drivers)
      function buildFastestLapOptions() {
      fastestLapSel.innerHTML = '';
      const opts = ['— None (outside Top‑10) —', ...driverNames];
      for (const name of opts) {
        const o = document.createElement('option');
        o.value = name;
        o.textContent = name;
        fastestLapSel.appendChild(o);
      }
        fastestLapSel.value = '— None (outside Top‑10) —';
      }

      // Build positions editor (P1..P20) with card-based selectors
      const positionSelects: Map<number, { container: HTMLElement; selectedDriver: string | null; cards: Map<string, HTMLElement> }> = new Map();
      function buildPositions() {
      positionsWrap.innerHTML = '';
      positionSelects.clear();
      for (let p=1; p<=20; p++) {
        const row = document.createElement('div');
        row.className = 'row';
        
        const posBox = document.createElement('div');
        posBox.className = 'position';
        const posNumber = document.createElement('span');
        posNumber.className = 'number-font';
        posNumber.textContent = `${p}`;
        posBox.innerHTML = 'P';
        posBox.appendChild(posNumber);
        
        const selectorContainer = document.createElement('div');
        selectorContainer.className = 'driver-selector-container';
        selectorContainer.dataset.position = p.toString();
        
        const selectedDisplay = document.createElement('div');
        selectedDisplay.className = 'selected-driver-display';
        selectedDisplay.innerHTML = '<span class="placeholder">— Select driver —</span>';
        
        const cardsContainer = document.createElement('div');
        cardsContainer.className = 'driver-cards-grid';
        cardsContainer.style.display = 'none';
        
        const cards = new Map<string, HTMLElement>();
        for (const name of driverNames) {
          const card = document.createElement('div');
          card.className = 'driver-card';
          card.dataset.driver = name;
          const imgPath = getDriverImagePath(name);
          if (imgPath) {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = name;
            img.className = 'driver-card-image';
            img.onerror = () => {
              // Hide image if it fails to load
              img.style.display = 'none';
            };
            card.appendChild(img);
          } else {
            // Placeholder for drivers without images
            const placeholder = document.createElement('div');
            placeholder.className = 'driver-card-image driver-card-placeholder';
            placeholder.textContent = name.split(' ').map(n => n[0]).join('');
            card.appendChild(placeholder);
          }
          const nameSpan = document.createElement('span');
          nameSpan.className = 'driver-card-name';
          nameSpan.textContent = name;
          card.appendChild(nameSpan);
          cards.set(name, card);
          cardsContainer.appendChild(card);
        }
        
        selectorContainer.appendChild(selectedDisplay);
        selectorContainer.appendChild(cardsContainer);
        
        const ptsBox = document.createElement('div');
        ptsBox.className = 'chip';
        const ptsNumber = document.createElement('span');
        ptsNumber.className = 'number-font';
        ptsNumber.textContent = p<=10 ? `+${positionPoints[p]}` : '+0';
        ptsBox.innerHTML = '';
        ptsBox.appendChild(ptsNumber);
        ptsBox.appendChild(document.createTextNode(' pts'));
        
        row.appendChild(posBox);
        row.appendChild(selectorContainer);
        row.appendChild(ptsBox);
        positionsWrap.appendChild(row);
        
        positionSelects.set(p, { container: selectorContainer, selectedDriver: null, cards });
      }
      }

      // Build DNF list (checkboxes)
      const dnfChecks = new Map<string, HTMLInputElement>();
      function buildDnfList() {
      dnfListWrap.innerHTML = '';
      dnfChecks.clear();
      const grid = document.createElement('div');
      grid.className = 'grid2';
      for (const name of driverNames) {
        const label = document.createElement('label');
        label.className = 'flex';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.dataset.driver = name;
        dnfChecks.set(name, cb);
        const chip = document.createElement('span');
        chip.className = 'chip danger';
        chip.textContent = 'DNF';
        label.appendChild(cb);
        label.appendChild(chip);
        const nm = document.createElement('span');
        nm.textContent = name;
        (nm as HTMLElement).style.flex = '1';
        label.appendChild(nm);
        grid.appendChild(label);
      }
      dnfListWrap.appendChild(grid);
      }

      // ==========================
      // State & logic
      // ==========================
      interface FinishOrder {
      pos: number;
      driver: string;
    }

    interface Assignments {
      finishOrder: FinishOrder[];
      dnfs: Set<string>;
      fastestLap: string;
    }

      function getAssignments(): Assignments {
        const finishOrder: FinishOrder[] = [];
        positionSelects.forEach((selector, pos) => {
          if (selector.selectedDriver) {
            finishOrder.push({pos, driver: selector.selectedDriver});
          }
        });
        const dnfs = new Set<string>();
        dnfChecks.forEach((cb, name)=>{ if (cb.checked) dnfs.add(name); });
        return {finishOrder, dnfs, fastestLap: fastestLapSel.value};
      }

      function validateAssignments(assignments: Assignments): string[] {
      const errors: string[] = [];
      const used = new Set<string>();
      for (const {driver} of assignments.finishOrder) {
        if (used.has(driver)) errors.push(`Duplicate assignment for ${driver}`);
        used.add(driver);
      }
      // DNF drivers cannot also have a finish position
      for (const {driver} of assignments.finishOrder) {
        if (assignments.dnfs.has(driver)) errors.push(`${driver} is marked DNF and also assigned a finish position`);
      }
        // At most 20 classified finishers
        if (assignments.finishOrder.length > 20) errors.push('More than 20 finishers assigned');
        return errors;
      }

      function computeTotals(assignments: Assignments) {
      const map = new Map(drivers.map(d=>[d.name, {base:d.points, delta:0, total:d.points, team:d.team}]));
      const classifiedTop10 = new Set<string>();
      // Apply race points
      for (const {pos, driver} of assignments.finishOrder) {
        if (!map.has(driver)) continue;
        if (assignments.dnfs.has(driver)) continue; // safety: DNFs should not be here
        const add = positionPoints[pos] || 0;
        const rec = map.get(driver);
        if (rec) {
          rec.delta += add;
          rec.total += add;
        }
        if (pos <= 10) classifiedTop10.add(driver);
      }
      // Apply Fastest Lap
      const flDriver = assignments.fastestLap;
      if (flDriver && flDriver !== '— None (outside Top‑10) —' && classifiedTop10.has(flDriver) && !assignments.dnfs.has(flDriver)) {
        const rec = map.get(flDriver);
        if (rec) {
          rec.delta += 1; rec.total += 1;
        }
      }
      // Build sorted array by total desc, then name
      const rows = Array.from(map.entries()).map(([name,rec])=>({name, team:rec.team, base:rec.base, delta:rec.delta, total:rec.total}));
        rows.sort((a,b)=> b.total - a.total || a.name.localeCompare(b.name));
        return rows;
      }

      function renderPoints(rows: Array<{name: string; team: string; base: number; delta: number; total: number}>) {
      pointsBody.innerHTML = '';
      for (const r of rows) {
        const tr = document.createElement('tr');
        const name = document.createElement('td'); name.textContent = r.name; tr.appendChild(name);
        const team = document.createElement('td'); team.textContent = r.team; tr.appendChild(team);
        const base = document.createElement('td'); base.textContent = r.base.toString(); tr.appendChild(base);
        const delta = document.createElement('td'); delta.textContent = (r.delta>0?'+':'') + r.delta; tr.appendChild(delta);
        const total = document.createElement('td'); total.textContent = r.total.toString(); tr.appendChild(total);
        pointsBody.appendChild(tr);
      }
      }

      function renderLeader(rows: Array<{name: string; team: string; base: number; delta: number; total: number}>) {
      // Detect ties among top
      const leaderBox = document.querySelector('#leaderBox');
      const leaderImageContainer = document.querySelector('#leaderImageContainer');
      
      if (rows.length === 0) { 
        if (leaderName) leaderName.textContent = '—'; 
        if (leaderImageContainer) leaderImageContainer.innerHTML = '';
        return; 
      }
      const topTotal = rows[0].total;
      const tied = rows.filter(r=>r.total===topTotal);
      const badge = leaderName?.parentElement?.querySelector('.badge');
      
      if (tied.length>1) {
        if (leaderName) leaderName.textContent = `TIE on ${topTotal} pts — countback required`;
        if (badge) badge.classList.remove('champ');
        if (leaderImageContainer) leaderImageContainer.innerHTML = '';
      } else {
        const leader = rows[0];
        if (leaderName) {
          const nameSpan = document.createElement('span');
          nameSpan.textContent = leader.name;
          const pointsSpan = document.createElement('span');
          pointsSpan.className = 'number-font';
          pointsSpan.textContent = ` (${leader.total} pts)`;
          leaderName.innerHTML = '';
          leaderName.appendChild(nameSpan);
          leaderName.appendChild(pointsSpan);
        }
        if (badge) badge.classList.add('champ');
        
        // Update leader image
        if (leaderImageContainer) {
          const imgPath = getDriverImagePath(leader.name);
          leaderImageContainer.innerHTML = '';
          const numberBg = document.createElement('div');
          numberBg.className = 'leader-number-bg number-font';
          numberBg.textContent = '1';
          if (imgPath) {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = leader.name;
            img.className = 'leader-image';
            img.onerror = () => {
              img.style.display = 'none';
            };
            leaderImageContainer.appendChild(numberBg);
            leaderImageContainer.appendChild(img);
          } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'leader-image leader-placeholder';
            placeholder.textContent = leader.name.split(' ').map(n => n[0]).join('');
            leaderImageContainer.appendChild(numberBg);
            leaderImageContainer.appendChild(placeholder);
          }
        }
      }
      }

      function updateAll() {
      const asg = getAssignments();
      const errs = validateAssignments(asg);
      if (errs.length) {
        if (leaderName) leaderName.textContent = 'Validation issue: ' + errs[0];
        const badge = leaderName?.parentElement?.querySelector('.badge');
        if (badge) badge.classList.remove('champ');
        return;
      }
      const rows = computeTotals(asg);
        renderPoints(rows);
        renderLeader(rows);
      }

      // Function to get selected driver for a position
      function getSelectedDriver(position: number): string | null {
        const selector = positionSelects.get(position);
        return selector?.selectedDriver || null;
      }

      // Function to set selected driver for a position
      function setSelectedDriver(position: number, driverName: string | null) {
        const selector = positionSelects.get(position);
        if (!selector) return;
        
        selector.selectedDriver = driverName;
        const selectedDisplay = selector.container.querySelector('.selected-driver-display');
        const cardsContainer = selector.container.querySelector('.driver-cards-grid') as HTMLElement;
        
        if (selectedDisplay) {
          if (driverName) {
            const imgPath = getDriverImagePath(driverName);
            selectedDisplay.innerHTML = '';
            if (imgPath) {
              const img = document.createElement('img');
              img.src = imgPath;
              img.alt = driverName;
              img.className = 'selected-driver-image';
              img.onerror = () => {
                img.style.display = 'none';
              };
              selectedDisplay.appendChild(img);
            } else {
              // Placeholder for drivers without images
              const placeholder = document.createElement('div');
              placeholder.className = 'selected-driver-image driver-card-placeholder';
              placeholder.textContent = driverName.split(' ').map(n => n[0]).join('');
              selectedDisplay.appendChild(placeholder);
            }
            const nameSpan = document.createElement('span');
            nameSpan.textContent = driverName;
            selectedDisplay.appendChild(nameSpan);
            selectedDisplay.classList.add('has-selection');
          } else {
            selectedDisplay.innerHTML = '<span class="placeholder">— Select driver —</span>';
            selectedDisplay.classList.remove('has-selection');
          }
        }
        
        if (cardsContainer) {
          cardsContainer.style.display = 'none';
        }
      }

      // Function to update card visibility - remove selected drivers from other selectors
      function updateDropdownOptions() {
        // Get all currently selected drivers (excluding empty selections)
        const selectedDrivers = new Set<string>();
        positionSelects.forEach((selector, pos) => {
          if (selector.selectedDriver) {
            selectedDrivers.add(selector.selectedDriver);
          }
        });

        // Get all DNF drivers
        const dnfDrivers = new Set<string>();
        dnfChecks.forEach((cb, name) => {
          if (cb.checked) {
            dnfDrivers.add(name);
          }
        });

        // Update each selector to show/hide cards based on selections and DNFs
        positionSelects.forEach((selector, pos) => {
          const currentDriver = selector.selectedDriver;
          selector.cards.forEach((card, driverName) => {
            // Hide this card if:
            // 1. It's selected in another position (but not in this one), OR
            // 2. It's marked as DNF
            if ((selectedDrivers.has(driverName) && currentDriver !== driverName) || dnfDrivers.has(driverName)) {
              card.style.display = 'none';
            } else {
              card.style.display = '';
            }
          });
        });
      }

      // Event wiring: change → recompute
      function wireEvents() {
      fastestLapSel.addEventListener('change', updateAll);
      
      // Wire up card-based selectors
      positionSelects.forEach((selector, pos) => {
        const selectedDisplay = selector.container.querySelector('.selected-driver-display');
        const cardsContainer = selector.container.querySelector('.driver-cards-grid') as HTMLElement;
        
        // Toggle cards visibility on click
        if (selectedDisplay) {
          selectedDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            if (cardsContainer) {
              const isVisible = cardsContainer.style.display !== 'none';
              // Close all other selectors
              positionSelects.forEach((otherSelector, otherPos) => {
                if (otherPos !== pos) {
                  const otherCards = otherSelector.container.querySelector('.driver-cards-grid') as HTMLElement;
                  if (otherCards) otherCards.style.display = 'none';
                }
              });
              // Toggle this selector
              cardsContainer.style.display = isVisible ? 'none' : 'grid';
            }
          });
        }
        
        // Handle card selection
        selector.cards.forEach((card, driverName) => {
          card.addEventListener('click', () => {
            const chosen = driverName;
            // Clear this driver from other positions
            positionSelects.forEach((otherSelector, otherPos) => {
              if (otherPos !== pos && otherSelector.selectedDriver === chosen) {
                setSelectedDriver(otherPos, null);
              }
            });
            // Set this position
            setSelectedDriver(pos, chosen);
            // Unmark DNF if this driver is selected
            const cb = dnfChecks.get(chosen);
            if (cb) cb.checked = false;
            // Update visibility and recompute
            updateDropdownOptions();
            updateAll();
          });
        });
      });
      
      // Close selectors when clicking outside
      document.addEventListener('click', (e) => {
        if (!(e.target as HTMLElement).closest('.driver-selector-container')) {
          positionSelects.forEach((selector) => {
            const cardsContainer = selector.container.querySelector('.driver-cards-grid') as HTMLElement;
            if (cardsContainer) cardsContainer.style.display = 'none';
          });
        }
      });
      dnfChecks.forEach((cb,name)=>{
        cb.addEventListener('change', () => {
          if (cb.checked) {
            // clear any finishing assignment for this driver
            for (const sel of positionSelects) if (sel.value===name) sel.value='';
            // if this driver currently selected for FL, keep it; FL point will not apply if not classified top‑10
          }
          // Update dropdown options when DNF status changes
          updateDropdownOptions();
          updateAll();
        });
      });
      resetBtn.addEventListener('click', () => {
        positionSelects.forEach((selector, pos) => {
          setSelectedDriver(pos, null);
        });
        dnfChecks.forEach(cb=>cb.checked=false);
        fastestLapSel.value = '— None (outside Top‑10) —';
        updateDropdownOptions();
        updateAll();
      });
      presetMaxBtn.addEventListener('click', () => {
        positionSelects.forEach((selector, pos) => {
          setSelectedDriver(pos, null);
        });
        dnfChecks.forEach(cb=>cb.checked=false);
        // Preset: VER P1, NOR P4, PIA P2
        setSelectedDriver(1,'Max Verstappen');
        setSelectedDriver(2,'Oscar Piastri');
        setSelectedDriver(4,'Lando Norris');
        fastestLapSel.value = 'Max Verstappen';
        updateDropdownOptions();
        updateAll();
      });
      }

      // Init
      buildFastestLapOptions();
      buildPositions();
      buildDnfList();
      wireEvents();
      // Initial dropdown update (no drivers selected yet, so all should be visible)
      updateDropdownOptions();
      // First render
      const initialRows = drivers.map(d=>({name:d.name, team:d.team, base:d.points, delta:0, total:d.points})).sort((a,b)=> b.total - a.total);
      renderPoints(initialRows);
      renderLeader(initialRows);
      return true;
    };

    // Try to initialize immediately, or wait for next tick
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initSimulator, 0);
      });
    } else {
      setTimeout(initSimulator, 0);
    }

    // Cleanup function
    return () => {
      initializedRef.current = false;
    };
  }, []);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Racing+Sans+One&family=Stack+Sans+Text:wght@200..700&display=swap" rel="stylesheet" />
      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --bg: #0b0f19;
          --panel: #12182b;
          --accent: #ff6a00;
          --text: #e6eefc;
          --muted: #97a6c1;
          --success: #21c07a;
          --warning: #ffbf00;
          --danger: #ff3b30;
          --border: #1f2742;
        }
        .f1-simulator {
          font-family: 'Stack Sans Text', Inter, system-ui, -apple-system, Segoe UI, Roboto, 'Helvetica Neue', Arial, 'Noto Sans', 'Liberation Sans';
          margin: 0;
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
        }
        .f1-simulator .number-font {
          font-family: 'Racing Sans One', sans-serif;
        }
        .f1-simulator * { box-sizing: border-box; }
        .f1-simulator header { 
          padding: 20px; 
          border-bottom: 1px solid var(--border); 
          background: linear-gradient(180deg, #11172a 0%, #0b0f19 100%);
        }
        .f1-simulator h1 { 
          margin: 0 0 6px; 
          font-size: 22px; 
          font-family: 'Racing Sans One', sans-serif;
          color: #ff3b30;
        }
        .f1-simulator .sub { color: var(--muted); font-size: 13px; }
        .f1-simulator main { 
          display: grid; 
          grid-template-columns: 400px 1fr; 
          gap: 18px; 
          padding: 18px; 
        }
        @media (max-width: 768px) {
          .f1-simulator main {
            grid-template-columns: 1fr;
          }
        }
        .f1-simulator .main-right {
          display: grid;
          grid-template-columns: 1fr 280px;
          gap: 18px;
        }
        @media (max-width: 1200px) {
          .f1-simulator .main-right {
            grid-template-columns: 1fr;
          }
        }
        .f1-simulator .card { 
          background: var(--panel); 
          border: 1px solid var(--border); 
          border-radius: 12px; 
        }
        .f1-simulator .card h2 { 
          font-size: 16px; 
          margin: 0; 
          padding: 12px 14px; 
          border-bottom: 1px solid var(--border); 
        }
        .f1-simulator .card .content { padding: 12px; }
        .f1-simulator table { width: 100%; border-collapse: collapse; }
        .f1-simulator th, .f1-simulator td { 
          padding: 8px 10px; 
          border-bottom: 1px solid var(--border); 
          font-size: 13px; 
        }
        .f1-simulator th { 
          text-align: left; 
          color: var(--muted); 
          font-weight: 600; 
        }
        .f1-simulator tr:last-child td { border-bottom: none; }
        .f1-simulator .grid2 { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 10px; 
        }
        .f1-simulator .controls { 
          display: flex; 
          gap: 10px; 
          flex-wrap: wrap; 
        }
        .f1-simulator select, .f1-simulator button, .f1-simulator .chip { font-size: 13px; }
        .f1-simulator select, .f1-simulator input[type="checkbox"] { accent-color: var(--accent); }
        .f1-simulator select { 
          width: 100%; 
          padding: 8px 10px; 
          border-radius: 8px; 
          border: 1px solid var(--border); 
          background: #0f1424; 
          color: var(--text); 
        }
        .f1-simulator button {
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #0f1424;
          color: var(--text);
          cursor: pointer;
          transition: background 0.2s;
        }
        .f1-simulator button:hover {
          background: #1a1f35;
        }
        .f1-simulator .row { 
          display: grid; 
          grid-template-columns: 80px 1fr 90px; 
          gap: 10px; 
          align-items: center; 
        }
        .f1-simulator .position { 
          background: #0f1424; 
          border: 1px solid var(--border); 
          border-radius: 8px; 
          padding: 6px 10px; 
          text-align: center;
          font-family: 'Racing Sans One', sans-serif;
        }
        .f1-simulator .leader-image-container {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto 16px;
        }
        .f1-simulator .leader-number-bg {
          position: absolute;
          font-size: 120px;
          line-height: 1;
          color: rgba(255, 255, 255, 0.05);
          z-index: 1;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
        }
        .f1-simulator .leader-image {
          position: relative;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          z-index: 2;
          border: 3px solid var(--accent);
        }
        .f1-simulator .leader-image.leader-placeholder {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: 600;
          color: var(--text);
          border: 3px solid var(--accent);
        }
        .f1-simulator .note { color: var(--muted); font-size: 12px; }
        .f1-simulator .leader { 
          display:flex; 
          align-items:center; 
          gap:10px; 
          font-size: 14px; 
        }
        .f1-simulator .leader .name { font-weight: 600; }
        .f1-simulator .leader .badge { 
          padding: 4px 8px; 
          border-radius: 999px; 
          background: #14203e; 
          color: var(--muted); 
          border: 1px solid var(--border); 
        }
        .f1-simulator .leader .badge.champ { 
          background: var(--success); 
          color: #07130d; 
          border: none; 
        }
        .f1-simulator .legend { 
          display:flex; 
          gap:8px; 
          flex-wrap: wrap; 
          margin-top:8px; 
        }
        .f1-simulator .chip { 
          padding: 4px 8px; 
          border-radius: 999px; 
          background: #14203e; 
          color: var(--muted); 
          border: 1px solid var(--border); 
        }
        .f1-simulator .chip .number-font {
          font-family: 'Racing Sans One', sans-serif;
        }
        .f1-simulator .chip.danger { 
          background: #2a1010; 
          color: #ffc7c7; 
          border-color: #512020; 
        }
        .f1-simulator .chip.warning { 
          background: #2a230f; 
          color: #ffe7a6; 
          border-color: #49401b; 
        }
        .f1-simulator .chip.success { 
          background: #102a1f; 
          color: #baf3d2; 
          border-color: #1e563d; 
        }
        .f1-simulator .footer { 
          padding: 12px; 
          border-top: 1px solid var(--border); 
          color: var(--muted); 
          font-size: 12px; 
        }
        .f1-simulator .flex { 
          display:flex; 
          gap:8px; 
          align-items:center; 
        }
        .f1-simulator label {
          display: block;
          margin-bottom: 4px;
          font-size: 13px;
          color: var(--muted);
        }
        .f1-simulator .driver-selector-container {
          position: relative;
          flex: 1;
        }
        .f1-simulator .selected-driver-display {
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #0f1424;
          color: var(--text);
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          min-height: 36px;
          transition: background 0.2s;
        }
        .f1-simulator .selected-driver-display:hover {
          background: #1a1f35;
        }
        .f1-simulator .selected-driver-display .placeholder {
          color: var(--muted);
        }
        .f1-simulator .selected-driver-display.has-selection {
          border-color: var(--accent);
        }
        .f1-simulator .selected-driver-image {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          object-fit: cover;
        }
        .f1-simulator .driver-cards-grid {
          position: absolute;
          top: 100%;
          left: 0;
          width: 320px;
          margin-top: 4px;
          background: var(--panel);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 12px;
          max-height: 400px;
          overflow-y: auto;
          z-index: 100;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
          gap: 8px;
        }
        .f1-simulator .driver-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #0f1424;
          cursor: pointer;
          transition: all 0.2s;
          gap: 4px;
        }
        .f1-simulator .driver-card:hover {
          background: #1a1f35;
          border-color: var(--accent);
          transform: translateY(-2px);
        }
        .f1-simulator .driver-card-image {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }
        .f1-simulator .driver-card-placeholder {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          font-weight: 600;
          color: var(--text);
        }
        .f1-simulator .selected-driver-image.driver-card-placeholder {
          width: 32px;
          height: 32px;
          font-size: 12px;
        }
        .f1-simulator .driver-card-name {
          font-size: 11px;
          text-align: center;
          color: var(--text);
          line-height: 1.2;
        }
        .f1-simulator .row {
          display: grid;
          grid-template-columns: 80px 1fr 90px;
          gap: 10px;
          align-items: center;
          margin-bottom: 8px;
        }
      `}} />
      <div className="f1-simulator">
      <header>
        <h1>F1 2025 Abu Dhabi — Scenario Simulator</h1>
        <div className="sub">Create hypothetical finishing orders (including DNFs & Fastest Lap) and see the updated points table and champion instantly.</div>
      </header>

      <main>
        {/* Left: Current Points & Leader */}
        <section className="card" aria-labelledby="pointsTitle">
          <h2 id="pointsTitle">Current points (pre‑race)</h2>
          <div className="content">
            <div id="leaderImageContainer" className="leader-image-container"></div>
            <table id="pointsTable" aria-label="Points table">
              <thead>
                <tr><th>Driver</th><th>Team</th><th>Points</th><th>∆ Race</th><th>Total</th></tr>
              </thead>
              <tbody></tbody>
            </table>
            <div className="legend">
              <span className="chip">Race points: <span className="number-font">25‑18‑15‑12‑10‑8‑6‑4‑2‑1</span></span>
              <span className="chip">FL: <span className="number-font">+1</span> (only if classified Top‑10)</span>
              <span className="chip warning">Ties shown as <strong>TIE</strong> — FIA countback applies</span>
            </div>
          </div>
          <div className="footer">
            Seeds taken from latest standings (ESPN/PlanetF1). Fastest Lap must be among classified top‑10 to earn +1.
          </div>
        </section>

        {/* Right: Positions + DNF */}
        <div className="main-right">
          {/* Positions Editor */}
          <section className="card" aria-labelledby="editorTitle">
            <h2 id="editorTitle">Finish order editor (P1–P20)</h2>
            <div className="content">
              <div className="controls">
                <div style={{flex:1}}>
                  <label htmlFor="fastestLap">Fastest Lap</label>
                  <select id="fastestLap"></select>
                </div>
                <button id="resetBtn" title="Reset finishers & DNFs to blank">Reset</button>
                <button id="presetMaxBtn" title="Quick preset: Max P1, Lando P4, Oscar P2">Preset: VER P1 / NOR P4 / PIA P2</button>
              </div>
              <div className="note" style={{marginTop:6}}>Assign each finishing position to a driver. Mark any DNFs on the right — DNFs cannot also occupy a finishing slot.</div>
              <div id="positions"></div>

              <div style={{marginTop:14}} className="leader" id="leaderBox">
                <span className="badge">Final Leader</span>
                <span className="name" id="leaderName">—</span>
              </div>
            </div>
          </section>

          {/* DNF Section */}
          <section className="card">
            <h2>DNF / Unclassified</h2>
            <div className="content" id="dnfList" aria-label="DNF list"></div>
          </section>
        </div>
      </main>
      </div>
    </>
  );
}


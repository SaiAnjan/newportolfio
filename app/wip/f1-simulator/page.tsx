'use client';

import { useEffect, useRef, useState } from 'react';

export default function F1SimulatorPage() {
  const initializedRef = useRef(false);
  const [showCircuitModal, setShowCircuitModal] = useState(false);
  const [mobileStep, setMobileStep] = useState(1); // 1: Finish order, 2: DNF, 3: Race Outcome

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
      // DOM helpers - Mobile elements
      // ==========================
      const pointsBody = document.querySelector('#pointsTable tbody') as HTMLTableSectionElement | null;
      const leaderName = document.querySelector('#leaderName') as HTMLElement | null;
      const fastestLapSel = document.querySelector('#fastestLap') as HTMLSelectElement | null;
      const positionsWrap = document.querySelector('#positions') as HTMLElement | null;
      const dnfListWrap = document.querySelector('#dnfList') as HTMLElement | null;
      const resetBtn = document.querySelector('#resetBtn') as HTMLButtonElement | null;
      const presetMaxBtn = document.querySelector('#presetMaxBtn') as HTMLButtonElement | null;
      const leaderImageContainer = document.querySelector('#leaderImageContainer') as HTMLElement | null;

      // Desktop elements (optional - may not exist on mobile)
      const pointsBodyDesktop = document.querySelector('#pointsTableDesktop tbody') as HTMLTableSectionElement | null;
      const leaderNameDesktop = document.querySelector('#leaderNameDesktop') as HTMLElement | null;
      const fastestLapSelDesktop = document.querySelector('#fastestLapDesktop') as HTMLSelectElement | null;
      const positionsWrapDesktop = document.querySelector('#positionsDesktop') as HTMLElement | null;
      const dnfListWrapDesktop = document.querySelector('#dnfListDesktop') as HTMLElement | null;
      const resetBtnDesktop = document.querySelector('#resetBtnDesktop') as HTMLButtonElement | null;
      const presetMaxBtnDesktop = document.querySelector('#presetMaxBtnDesktop') as HTMLButtonElement | null;
      const leaderImageContainerDesktop = document.querySelector('#leaderImageContainerDesktop') as HTMLElement | null;

      // Use mobile elements as primary, fallback to desktop if mobile not found
      const activePointsBody = pointsBody || pointsBodyDesktop;
      const activeLeaderName = leaderName || leaderNameDesktop;
      const activeFastestLapSel = fastestLapSel || fastestLapSelDesktop;
      const activePositionsWrap = positionsWrap || positionsWrapDesktop;
      const activeDnfListWrap = dnfListWrap || dnfListWrapDesktop;
      const activeResetBtn = resetBtn || resetBtnDesktop;
      const activePresetMaxBtn = presetMaxBtn || presetMaxBtnDesktop;
      const activeLeaderImageContainer = leaderImageContainer || leaderImageContainerDesktop;

      if (!activePointsBody || !activeLeaderName || !activeFastestLapSel || !activePositionsWrap || !activeDnfListWrap || !activeResetBtn || !activePresetMaxBtn) {
        console.warn('F1 Simulator: Some DOM elements not found, retrying...');
        return false;
      }

      initializedRef.current = true;

      // Build fastest lap options (None/Outside Top-10 + all drivers)
      function buildFastestLapOptions() {
      if (fastestLapSel) {
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
      if (fastestLapSelDesktop) {
        fastestLapSelDesktop.innerHTML = '';
        const opts = ['— None (outside Top‑10) —', ...driverNames];
        for (const name of opts) {
          const o = document.createElement('option');
          o.value = name;
          o.textContent = name;
          fastestLapSelDesktop.appendChild(o);
        }
        fastestLapSelDesktop.value = '— None (outside Top‑10) —';
      }
      }

      // Build positions editor (P1..P20) with card-based selectors
      // Use single shared state for both mobile and desktop
      const positionSelects: Map<number, { container: HTMLElement; selectedDriver: string | null; cards: Map<string, HTMLElement> }> = new Map();
      const positionSelectsDesktop: Map<number, { container: HTMLElement; selectedDriver: string | null; cards: Map<string, HTMLElement> }> = new Map();
      
      // Helper to get all position selects (mobile + desktop)
      function getAllPositionSelects(): Array<{ container: HTMLElement; selectedDriver: string | null; cards: Map<string, HTMLElement> }> {
        const all: Array<{ container: HTMLElement; selectedDriver: string | null; cards: Map<string, HTMLElement> }> = [];
        positionSelects.forEach(sel => all.push(sel));
        positionSelectsDesktop.forEach(sel => all.push(sel));
        return all;
      }
      
      function buildPositions() {
      if (!activePositionsWrap) return;
      
      // Build for mobile
      if (positionsWrap) {
        buildPositionsForContainer(positionsWrap, positionSelects);
      }
      
      // Build for desktop
      if (positionsWrapDesktop) {
        buildPositionsForContainer(positionsWrapDesktop, positionSelectsDesktop);
      }
      }
      
      function buildPositionsForContainer(container: HTMLElement, selectsMap: Map<number, { container: HTMLElement; selectedDriver: string | null; cards: Map<string, HTMLElement> }>) {
      container.innerHTML = '';
      selectsMap.clear();
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
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-driver-btn';
        removeBtn.innerHTML = '×';
        removeBtn.title = 'Remove driver';
        removeBtn.style.display = 'none';
        removeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedDriver(p, null);
          updateDropdownOptions();
          updateAll();
        });
        
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
        selectorContainer.appendChild(removeBtn);
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
        container.appendChild(row);
        
        selectsMap.set(p, { container: selectorContainer, selectedDriver: null, cards });
      }
      }

      // Build DNF list (checkboxes)
      const dnfChecks = new Map<string, HTMLInputElement>();
      const dnfChecksDesktop = new Map<string, HTMLInputElement>();
      
      function buildDnfList() {
      // Build for mobile
      if (dnfListWrap) {
        buildDnfListForContainer(dnfListWrap, dnfChecks);
      }
      // Build for desktop
      if (dnfListWrapDesktop) {
        buildDnfListForContainer(dnfListWrapDesktop, dnfChecksDesktop);
      }
      }
      
      function buildDnfListForContainer(container: HTMLElement, checksMap: Map<string, HTMLInputElement>) {
      if (!container) return;
      container.innerHTML = '';
      checksMap.clear();
      const list = document.createElement('div');
      list.className = 'dnf-list';
      for (const name of driverNames) {
        const label = document.createElement('label');
        label.className = 'dnf-item';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.dataset.driver = name;
        dnfChecks.set(name, cb);
        
        // Add driver profile image
        const imgPath = getDriverImagePath(name);
        if (imgPath) {
          const img = document.createElement('img');
          img.src = imgPath;
          img.alt = name;
          img.className = 'dnf-driver-image';
          img.onerror = () => {
            img.style.display = 'none';
          };
          label.appendChild(img);
        } else {
          const placeholder = document.createElement('div');
          placeholder.className = 'dnf-driver-image dnf-placeholder';
          placeholder.textContent = name.split(' ').map(n => n[0]).join('');
          label.appendChild(placeholder);
        }
        
        const nameSpan = document.createElement('span');
        nameSpan.className = 'dnf-driver-name';
        nameSpan.textContent = name;
        label.appendChild(nameSpan);
        
        const chip = document.createElement('span');
        chip.className = 'chip danger';
        chip.textContent = 'DNF';
        label.appendChild(cb);
        label.appendChild(chip);
        
        list.appendChild(label);
      }
      container.appendChild(list);
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
        // Check mobile first, then desktop (they should be in sync)
        positionSelects.forEach((selector, pos) => {
          if (selector.selectedDriver) {
            finishOrder.push({pos, driver: selector.selectedDriver});
          }
        });
        // Also check desktop (in case mobile doesn't have it)
        positionSelectsDesktop.forEach((selector, pos) => {
          if (selector.selectedDriver && !finishOrder.find(fo => fo.pos === pos)) {
            finishOrder.push({pos, driver: selector.selectedDriver});
          }
        });
        const dnfs = new Set<string>();
        dnfChecks.forEach((cb, name)=>{ if (cb.checked) dnfs.add(name); });
        dnfChecksDesktop.forEach((cb, name)=>{ if (cb.checked) dnfs.add(name); });
        const flValue = fastestLapSel?.value || fastestLapSelDesktop?.value || '— None (outside Top‑10) —';
        return {finishOrder, dnfs, fastestLap: flValue};
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
      // Render for mobile
      if (pointsBody) {
        renderPointsForTable(pointsBody, rows);
      }
      // Render for desktop
      if (pointsBodyDesktop) {
        renderPointsForTable(pointsBodyDesktop, rows);
      }
      }
      
      function renderPointsForTable(tbody: HTMLElement | null, rows: Array<{name: string; team: string; base: number; delta: number; total: number}>) {
      if (!tbody) return;
      tbody.innerHTML = '';
      for (const r of rows) {
        const tr = document.createElement('tr');
        const name = document.createElement('td'); name.textContent = r.name; tr.appendChild(name);
        const team = document.createElement('td'); team.textContent = r.team; tr.appendChild(team);
        const base = document.createElement('td'); 
        const baseSpan = document.createElement('span');
        baseSpan.className = 'number-font';
        baseSpan.textContent = r.base.toString();
        base.appendChild(baseSpan);
        tr.appendChild(base);
        const delta = document.createElement('td'); 
        const deltaSpan = document.createElement('span');
        deltaSpan.className = 'number-font';
        deltaSpan.textContent = (r.delta>0?'+':'') + r.delta;
        delta.appendChild(deltaSpan);
        tr.appendChild(delta);
        const total = document.createElement('td'); 
        const totalSpan = document.createElement('span');
        totalSpan.className = 'number-font';
        totalSpan.textContent = r.total.toString();
        total.appendChild(totalSpan);
        tr.appendChild(total);
        tbody.appendChild(tr);
      }
      }

      function renderLeader(rows: Array<{name: string; team: string; base: number; delta: number; total: number}>) {
      // Render for mobile
      renderLeaderForElements(leaderName, document.querySelector('#leaderBox') as HTMLElement | null, leaderImageContainer, rows);
      // Render for desktop
      renderLeaderForElements(leaderNameDesktop, document.querySelector('#leaderBoxDesktop') as HTMLElement | null, leaderImageContainerDesktop, rows);
      }
      
      function renderLeaderForElements(nameEl: HTMLElement | null, boxEl: HTMLElement | null, imageContainer: HTMLElement | null, rows: Array<{name: string; team: string; base: number; delta: number; total: number}>) {
      // Detect ties among top
      if (rows.length === 0) { 
        if (nameEl) nameEl.textContent = '—'; 
        if (imageContainer) (imageContainer as HTMLElement).innerHTML = '';
        return; 
      }
      const topTotal = rows[0].total;
      const tied = rows.filter(r=>r.total===topTotal);
      const badge = nameEl?.parentElement?.querySelector('.badge');
      
      if (tied.length>1) {
        if (nameEl) nameEl.textContent = `TIE on ${topTotal} pts — countback required`;
        if (badge) badge.classList.remove('champ');
        if (imageContainer) (imageContainer as HTMLElement).innerHTML = '';
      } else {
        const leader = rows[0];
        if (nameEl) {
          const nameSpan = document.createElement('span');
          nameSpan.textContent = leader.name;
          const pointsSpan = document.createElement('span');
          pointsSpan.className = 'number-font';
          pointsSpan.textContent = ` (${leader.total} pts)`;
          nameEl.innerHTML = '';
          nameEl.appendChild(nameSpan);
          nameEl.appendChild(pointsSpan);
        }
        if (badge) badge.classList.add('champ');
        
        // Update leader image
        if (imageContainer) {
          const imgPath = getDriverImagePath(leader.name);
          (imageContainer as HTMLElement).innerHTML = '';
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
            (imageContainer as HTMLElement).appendChild(numberBg);
            (imageContainer as HTMLElement).appendChild(img);
          } else {
            const placeholder = document.createElement('div');
            placeholder.className = 'leader-image leader-placeholder';
            placeholder.textContent = leader.name.split(' ').map(n => n[0]).join('');
            (imageContainer as HTMLElement).appendChild(numberBg);
            (imageContainer as HTMLElement).appendChild(placeholder);
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

      // Function to get selected driver for a position (checks both mobile and desktop)
      function getSelectedDriver(position: number): string | null {
        const selector = positionSelects.get(position) || positionSelectsDesktop.get(position);
        return selector?.selectedDriver || null;
      }

      // Function to set selected driver for a position (updates both mobile and desktop)
      function setSelectedDriver(position: number, driverName: string | null) {
        const selector = positionSelects.get(position);
        const selectorDesktop = positionSelectsDesktop.get(position);
        
        // Update mobile
        if (selector) {
          updateSelectorUI(selector, driverName);
        }
        
        // Update desktop
        if (selectorDesktop) {
          updateSelectorUI(selectorDesktop, driverName);
        }
      }
      
      function updateSelectorUI(selector: { container: HTMLElement; selectedDriver: string | null; cards: Map<string, HTMLElement> }, driverName: string | null) {
        selector.selectedDriver = driverName;
        const selectedDisplay = selector.container.querySelector('.selected-driver-display');
        const cardsContainer = selector.container.querySelector('.driver-cards-grid') as HTMLElement;
        const removeBtn = selector.container.querySelector('.remove-driver-btn') as HTMLElement;
        
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
            if (removeBtn) removeBtn.style.display = 'flex';
          } else {
            selectedDisplay.innerHTML = '<span class="placeholder">— Select driver —</span>';
            selectedDisplay.classList.remove('has-selection');
            if (removeBtn) removeBtn.style.display = 'none';
          }
        }
        
        if (cardsContainer) {
          cardsContainer.style.display = 'none';
        }
      }

      // Function to update card visibility - remove selected drivers from other selectors
      function updateDropdownOptions() {
        // Get all currently selected drivers (excluding empty selections) from both mobile and desktop
        const selectedDrivers = new Set<string>();
        positionSelects.forEach((selector, pos) => {
          if (selector.selectedDriver) {
            selectedDrivers.add(selector.selectedDriver);
          }
        });
        positionSelectsDesktop.forEach((selector, pos) => {
          if (selector.selectedDriver) {
            selectedDrivers.add(selector.selectedDriver);
          }
        });

        // Get all DNF drivers from both mobile and desktop
        const dnfDrivers = new Set<string>();
        dnfChecks.forEach((cb, name) => {
          if (cb.checked) {
            dnfDrivers.add(name);
          }
        });
        dnfChecksDesktop.forEach((cb, name) => {
          if (cb.checked) {
            dnfDrivers.add(name);
          }
        });

        // Update each selector to show/hide cards based on selections and DNFs (both mobile and desktop)
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
        positionSelectsDesktop.forEach((selector, pos) => {
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
      if (fastestLapSel) fastestLapSel.addEventListener('change', updateAll);
      if (fastestLapSelDesktop) fastestLapSelDesktop.addEventListener('change', updateAll);
      
      // Wire up card-based selectors (mobile)
      positionSelects.forEach((selector, pos) => {
        const selectedDisplay = selector.container.querySelector('.selected-driver-display');
        const cardsContainer = selector.container.querySelector('.driver-cards-grid') as HTMLElement;
        
        // Toggle cards visibility on click
        if (selectedDisplay) {
          selectedDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            if (cardsContainer) {
              const isVisible = cardsContainer.style.display !== 'none';
              // Close all other selectors (mobile and desktop)
              positionSelects.forEach((otherSelector, otherPos) => {
                if (otherPos !== pos) {
                  const otherCards = otherSelector.container.querySelector('.driver-cards-grid') as HTMLElement;
                  if (otherCards) otherCards.style.display = 'none';
                }
              });
              positionSelectsDesktop.forEach((otherSelector, otherPos) => {
                const otherCards = otherSelector.container.querySelector('.driver-cards-grid') as HTMLElement;
                if (otherCards) otherCards.style.display = 'none';
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
            // Clear this driver from other positions (mobile and desktop)
            positionSelects.forEach((otherSelector, otherPos) => {
              if (otherPos !== pos && otherSelector.selectedDriver === chosen) {
                setSelectedDriver(otherPos, null);
              }
            });
            positionSelectsDesktop.forEach((otherSelector, otherPos) => {
              if (otherPos !== pos && otherSelector.selectedDriver === chosen) {
                setSelectedDriver(otherPos, null);
              }
            });
            // Set this position
            setSelectedDriver(pos, chosen);
            // Unmark DNF if this driver is selected (mobile and desktop)
            const cb = dnfChecks.get(chosen);
            if (cb) cb.checked = false;
            const cbDesktop = dnfChecksDesktop.get(chosen);
            if (cbDesktop) cbDesktop.checked = false;
            // Update visibility and recompute
            updateDropdownOptions();
            updateAll();
          });
        });
      });
      
      // Wire up card-based selectors (desktop)
      positionSelectsDesktop.forEach((selector, pos) => {
        const selectedDisplay = selector.container.querySelector('.selected-driver-display');
        const cardsContainer = selector.container.querySelector('.driver-cards-grid') as HTMLElement;
        
        // Toggle cards visibility on click
        if (selectedDisplay) {
          selectedDisplay.addEventListener('click', (e) => {
            e.stopPropagation();
            if (cardsContainer) {
              const isVisible = cardsContainer.style.display !== 'none';
              // Close all other selectors (mobile and desktop)
              positionSelects.forEach((otherSelector, otherPos) => {
                const otherCards = otherSelector.container.querySelector('.driver-cards-grid') as HTMLElement;
                if (otherCards) otherCards.style.display = 'none';
              });
              positionSelectsDesktop.forEach((otherSelector, otherPos) => {
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
            // Clear this driver from other positions (mobile and desktop)
            positionSelects.forEach((otherSelector, otherPos) => {
              if (otherPos !== pos && otherSelector.selectedDriver === chosen) {
                setSelectedDriver(otherPos, null);
              }
            });
            positionSelectsDesktop.forEach((otherSelector, otherPos) => {
              if (otherPos !== pos && otherSelector.selectedDriver === chosen) {
                setSelectedDriver(otherPos, null);
              }
            });
            // Set this position
            setSelectedDriver(pos, chosen);
            // Unmark DNF if this driver is selected (mobile and desktop)
            const cb = dnfChecks.get(chosen);
            if (cb) cb.checked = false;
            const cbDesktop = dnfChecksDesktop.get(chosen);
            if (cbDesktop) cbDesktop.checked = false;
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
          positionSelectsDesktop.forEach((selector) => {
            const cardsContainer = selector.container.querySelector('.driver-cards-grid') as HTMLElement;
            if (cardsContainer) cardsContainer.style.display = 'none';
          });
        }
      });
      dnfChecks.forEach((cb,name)=>{
        cb.addEventListener('change', () => {
          // Sync desktop checkbox
          const cbDesktop = dnfChecksDesktop.get(name);
          if (cbDesktop) cbDesktop.checked = cb.checked;
          
          if (cb.checked) {
            // clear any finishing assignment for this driver (mobile and desktop)
            positionSelects.forEach((selector, pos) => {
              if (selector.selectedDriver === name) {
                setSelectedDriver(pos, null);
              }
            });
            positionSelectsDesktop.forEach((selector, pos) => {
              if (selector.selectedDriver === name) {
                setSelectedDriver(pos, null);
              }
            });
            // if this driver currently selected for FL, keep it; FL point will not apply if not classified top‑10
          }
          // Update dropdown options when DNF status changes
          updateDropdownOptions();
          updateAll();
        });
      });
      dnfChecksDesktop.forEach((cb,name)=>{
        cb.addEventListener('change', () => {
          // Sync mobile checkbox
          const cbMobile = dnfChecks.get(name);
          if (cbMobile) cbMobile.checked = cb.checked;
          
          if (cb.checked) {
            // clear any finishing assignment for this driver (mobile and desktop)
            positionSelects.forEach((selector, pos) => {
              if (selector.selectedDriver === name) {
                setSelectedDriver(pos, null);
              }
            });
            positionSelectsDesktop.forEach((selector, pos) => {
              if (selector.selectedDriver === name) {
                setSelectedDriver(pos, null);
              }
            });
            // if this driver currently selected for FL, keep it; FL point will not apply if not classified top‑10
          }
          // Update dropdown options when DNF status changes
          updateDropdownOptions();
          updateAll();
        });
      });
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          positionSelects.forEach((selector, pos) => {
            setSelectedDriver(pos, null);
          });
          dnfChecks.forEach(cb=>cb.checked=false);
          dnfChecksDesktop.forEach(cb=>cb.checked=false);
          if (fastestLapSel) fastestLapSel.value = '— None (outside Top‑10) —';
          if (fastestLapSelDesktop) fastestLapSelDesktop.value = '— None (outside Top‑10) —';
          updateDropdownOptions();
          updateAll();
        });
      }
      if (resetBtnDesktop) {
        resetBtnDesktop.addEventListener('click', () => {
          positionSelects.forEach((selector, pos) => {
            setSelectedDriver(pos, null);
          });
          dnfChecks.forEach(cb=>cb.checked=false);
          dnfChecksDesktop.forEach(cb=>cb.checked=false);
          if (fastestLapSel) fastestLapSel.value = '— None (outside Top‑10) —';
          if (fastestLapSelDesktop) fastestLapSelDesktop.value = '— None (outside Top‑10) —';
          updateDropdownOptions();
          updateAll();
        });
      }
      if (presetMaxBtn) {
        presetMaxBtn.addEventListener('click', () => {
          positionSelects.forEach((selector, pos) => {
            setSelectedDriver(pos, null);
          });
          dnfChecks.forEach(cb=>cb.checked=false);
          dnfChecksDesktop.forEach(cb=>cb.checked=false);
          // Preset: VER P1, NOR P4, PIA P2
          setSelectedDriver(1,'Max Verstappen');
          setSelectedDriver(2,'Oscar Piastri');
          setSelectedDriver(4,'Lando Norris');
          if (fastestLapSel) fastestLapSel.value = 'Max Verstappen';
          if (fastestLapSelDesktop) fastestLapSelDesktop.value = 'Max Verstappen';
          updateDropdownOptions();
          updateAll();
        });
      }
      if (presetMaxBtnDesktop) {
        presetMaxBtnDesktop.addEventListener('click', () => {
          positionSelects.forEach((selector, pos) => {
            setSelectedDriver(pos, null);
          });
          dnfChecks.forEach(cb=>cb.checked=false);
          dnfChecksDesktop.forEach(cb=>cb.checked=false);
          // Preset: VER P1, NOR P4, PIA P2
          setSelectedDriver(1,'Max Verstappen');
          setSelectedDriver(2,'Oscar Piastri');
          setSelectedDriver(4,'Lando Norris');
          if (fastestLapSel) fastestLapSel.value = 'Max Verstappen';
          if (fastestLapSelDesktop) fastestLapSelDesktop.value = 'Max Verstappen';
          updateDropdownOptions();
          updateAll();
        });
      }
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
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Stack+Sans+Text:wght@200..700&display=swap" rel="stylesheet" />
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
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          font-style: italic;
        }
        .f1-simulator * { box-sizing: border-box; }
        .f1-simulator header { 
          padding: 20px; 
          border-bottom: 1px solid var(--border); 
          background: linear-gradient(180deg, #11172a 0%, #0b0f19 100%);
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 20px;
        }
        .f1-simulator .header-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .f1-simulator .circuit-image-container {
          width: auto;
          max-width: 150px;
          height: 60px;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .f1-simulator .circuit-image-container:hover {
          transform: scale(1.02);
        }
        .f1-simulator .circuit-image {
          height: 100%;
          width: auto;
          object-fit: contain;
          display: block;
        }
        .f1-simulator .circuit-modal {
          display: flex;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.95);
          z-index: 1000;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .f1-simulator .circuit-modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .f1-simulator .circuit-modal-image {
          max-width: 100%;
          max-height: 90vh;
          object-fit: contain;
          border-radius: 8px;
        }
        .f1-simulator .circuit-modal-close {
          position: absolute;
          top: -40px;
          right: 0;
          background: var(--danger);
          color: white;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          transition: background 0.2s;
        }
        .f1-simulator .circuit-modal-close:hover {
          background: #ff5c52;
        }
        .f1-simulator h1 { 
          margin: 0 0 6px; 
          font-size: 22px; 
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-style: italic;
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
          /* Hide desktop layout on mobile */
          .f1-simulator .desktop-layout {
            display: none !important;
          }
          /* Show only active mobile step */
          .f1-simulator .mobile-step {
            display: none;
          }
          .f1-simulator .mobile-step.mobile-step-1[style*="block"],
          .f1-simulator .mobile-step.mobile-step-2[style*="block"],
          .f1-simulator .mobile-step.mobile-step-3[style*="block"] {
            display: block !important;
          }
          /* Mobile navigation */
          .f1-simulator .mobile-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
            background: var(--panel);
            border-top: 1px solid var(--border);
            position: sticky;
            bottom: 0;
            z-index: 100;
            gap: 12px;
          }
          .f1-simulator .mobile-nav button {
            flex: 1;
            padding: 12px 20px;
            background: var(--accent);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            font-family: 'Stack Sans Text', sans-serif;
          }
          .f1-simulator .mobile-nav button:hover:not(:disabled) {
            background: #1a4dff;
          }
          .f1-simulator .mobile-nav button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .f1-simulator .mobile-nav .step-indicator {
            display: flex;
            gap: 6px;
            align-items: center;
          }
          .f1-simulator .mobile-nav .step-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--border);
            transition: background 0.2s;
          }
          .f1-simulator .mobile-nav .step-dot.active {
            background: var(--accent);
          }
        }
        @media (min-width: 769px) {
          .f1-simulator .mobile-step {
            display: none !important;
          }
          .f1-simulator .mobile-nav {
            display: none !important;
          }
          .f1-simulator .desktop-layout {
            display: block;
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
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
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
        .f1-simulator .dnf-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .f1-simulator .dnf-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--border);
          background: #0f1424;
          cursor: pointer;
          transition: background 0.2s;
        }
        .f1-simulator .dnf-item:hover {
          background: #1a1f35;
        }
        .f1-simulator .dnf-driver-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
        }
        .f1-simulator .dnf-driver-image.dnf-placeholder {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: var(--text);
        }
        .f1-simulator .dnf-driver-name {
          flex: 1;
          font-size: 13px;
          color: var(--text);
        }
        .f1-simulator .dnf-item input[type="checkbox"] {
          margin-left: auto;
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
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          font-style: italic;
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
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          font-style: italic;
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
          font-family: 'Orbitron', sans-serif;
          font-weight: 600;
          font-style: italic;
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
        .f1-simulator .remove-driver-btn {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid var(--border);
          background: var(--danger);
          color: white;
          cursor: pointer;
          display: none;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          line-height: 1;
          padding: 0;
          transition: all 0.2s;
          z-index: 10;
        }
        .f1-simulator .remove-driver-btn:hover {
          background: #ff5c52;
          transform: translateY(-50%) scale(1.1);
        }
        .f1-simulator .driver-selector-container {
          position: relative;
          flex: 1;
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
        <div className="circuit-image-container">
          <img 
            src="/images/drivers-profiles/Abu_Dhabi_Circuit.avif" 
            alt="Abu Dhabi Circuit"
            className="circuit-image"
            onClick={() => setShowCircuitModal(true)}
          />
        </div>
        <div className="header-content">
          <h1>F1 2025 Abu Dhabi — Scenario Simulator</h1>
          <div className="sub">Create hypothetical finishing orders (including DNFs & Fastest Lap) and see the updated points table and champion instantly.</div>
        </div>
      </header>
      
      {/* Circuit Modal */}
      {showCircuitModal && (
        <div 
          className="circuit-modal" 
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCircuitModal(false);
            }
          }}
        >
          <div className="circuit-modal-content">
            <button 
              className="circuit-modal-close"
              onClick={() => setShowCircuitModal(false)}
            >
              ×
            </button>
            <img 
              src="/images/drivers-profiles/Abu_Dhabi_Circuit.avif" 
              alt="Abu Dhabi Circuit Map"
              className="circuit-modal-image"
            />
          </div>
        </div>
      )}

      <main>
        {/* Mobile Step 1: Finish order editor */}
        <section className="card mobile-step" data-step="1" style={{ display: mobileStep === 1 ? 'block' : 'none' }} aria-labelledby="editorTitle">
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

        {/* Mobile Step 2: DNF Section */}
        <section className="card mobile-step" data-step="2" style={{ display: mobileStep === 2 ? 'block' : 'none' }}>
          <h2>DNF / Unclassified</h2>
          <div className="content" id="dnfList" aria-label="DNF list"></div>
        </section>

        {/* Mobile Step 3: Race Outcome */}
        <section className="card mobile-step" data-step="3" style={{ display: mobileStep === 3 ? 'block' : 'none' }} aria-labelledby="pointsTitle">
          <h2 id="pointsTitle">Race Outcome</h2>
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

        {/* Desktop: Left: Current Points & Leader */}
        <section className="card desktop-layout" aria-labelledby="pointsTitleDesktop">
          <h2 id="pointsTitleDesktop">Current points (pre‑race)</h2>
          <div className="content">
            <div id="leaderImageContainerDesktop" className="leader-image-container"></div>
            <table id="pointsTableDesktop" aria-label="Points table">
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

        {/* Desktop: Right: Positions + DNF */}
        <div className="main-right desktop-layout">
          {/* Positions Editor */}
          <section className="card" aria-labelledby="editorTitleDesktop">
            <h2 id="editorTitleDesktop">Finish order editor (P1–P20)</h2>
            <div className="content">
              <div className="controls">
                <div style={{flex:1}}>
                  <label htmlFor="fastestLapDesktop">Fastest Lap</label>
                  <select id="fastestLapDesktop"></select>
                </div>
                <button id="resetBtnDesktop" title="Reset finishers & DNFs to blank">Reset</button>
                <button id="presetMaxBtnDesktop" title="Quick preset: Max P1, Lando P4, Oscar P2">Preset: VER P1 / NOR P4 / PIA P2</button>
              </div>
              <div className="note" style={{marginTop:6}}>Assign each finishing position to a driver. Mark any DNFs on the right — DNFs cannot also occupy a finishing slot.</div>
              <div id="positionsDesktop"></div>

              <div style={{marginTop:14}} className="leader" id="leaderBoxDesktop">
                <span className="badge">Final Leader</span>
                <span className="name" id="leaderNameDesktop">—</span>
              </div>
            </div>
          </section>

          {/* DNF Section */}
          <section className="card">
            <h2>DNF / Unclassified</h2>
            <div className="content" id="dnfListDesktop" aria-label="DNF list"></div>
          </section>
        </div>
      </main>

      {/* Mobile Navigation */}
      <div className="mobile-nav">
        <button 
          onClick={() => setMobileStep(Math.max(1, mobileStep - 1))}
          disabled={mobileStep === 1}
        >
          Previous
        </button>
        <div className="step-indicator">
          <div className={`step-dot ${mobileStep === 1 ? 'active' : ''}`}></div>
          <div className={`step-dot ${mobileStep === 2 ? 'active' : ''}`}></div>
          <div className={`step-dot ${mobileStep === 3 ? 'active' : ''}`}></div>
        </div>
        <button 
          onClick={() => setMobileStep(Math.min(3, mobileStep + 1))}
          disabled={mobileStep === 3}
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
}


(function() {
    const cleanup = () => {
        const oldPanel = document.getElementById('pracc-ar-panel');
        if (oldPanel) oldPanel.remove();
        const oldStyle = document.getElementById('pracc-ar-styles');
        if (oldStyle) oldStyle.remove();
    };
    cleanup();

    let blocklist = JSON.parse(localStorage.getItem('pracc_blocklist') || "[]");

    const style = document.createElement('style');
    style.id = 'pracc-ar-styles';
    style.innerHTML = `
        #pracc-ar-panel { position: fixed !important; bottom: 20px !important; right: 20px !important; font-family: 'Rajdhani', sans-serif !important; z-index: 9999999 !important; }
        #pracc-ar-body { background: rgba(13, 17, 23, 0.7) !important; border: 2px solid #007bff !important; backdrop-filter: blur(8px) !important; border-radius: 12px !important; padding: 15px !important; width: 320px !important; display: none; box-shadow: 0 8px 32px rgba(0,0,0,0.8) !important; }
        #pracc-ar-body.active { display: block !important; }
        .ar-collapsible-header { color: #007bff !important; font-size: 11px !important; margin-bottom: 6px !important; text-transform: uppercase !important; font-weight: bold !important; border-bottom: 1px solid #1a2332 !important; margin-top: 15px !important; display: flex !important; justify-content: space-between !important; cursor: pointer !important; }
        #ar-rank-select, #ar-block-input { width: 100% !important; background: rgba(13, 17, 23, 0.8) !important; color: white !important; border: 1px solid #007bff !important; padding: 10px !important; border-radius: 6px !important; box-sizing: border-box !important; }
        #ar-log { width: 100% !important; background: rgba(0, 0, 0, 0.6) !important; font-family: monospace !important; font-size: 10px !important; padding: 10px !important; border: 1px solid #1a2332 !important; height: 100px !important; color: #00ff00 !important; overflow-y: auto !important; margin-top: 10px !important; border-radius: 4px !important; }
        .ar-btn, #pracc-ar-toggle { background: #007bff !important; color: white !important; border: none !important; padding: 12px !important; cursor: pointer !important; font-weight: bold !important; border-radius: 6px !important; text-transform: uppercase !important; width: 100% !important; }
        #ar-block-list-display { display: flex !important; flex-wrap: wrap !important; gap: 4px !important; margin-top: 8px !important; max-height: 80px !important; overflow-y: auto !important; }
        .block-tag { background: rgba(255, 68, 68, 0.2) !important; border: 1px solid #ff4444 !important; color: #ff4444 !important; font-size: 10px !important; padding: 2px 6px !important; border-radius: 4px !important; display: flex !important; align-items: center !important; gap: 5px !important; cursor: pointer !important; }
        .ar-map-item { display: flex !important; align-items: center !important; gap: 6px !important; font-size: 11px !important; color: #ccc !important; }
        #ar-map-grid-container { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 6px !important; }
    `;
    document.head.appendChild(style);

    const RANK_ORDER = ["Radiant", "Immortal", "Ascendant", "Diamond", "Platinum", "Gold"];

    function forceCloseTooltips() {
        document.querySelectorAll('.MuiTooltip-popper, .MuiTooltip-tooltip, [role="tooltip"]').forEach(t => t.remove());
        document.body.click();
    }

    async function handleOfferModal(targetMaps, log) {
        let modal = null;
        for (let i = 0; i < 20; i++) {
            modal = document.querySelector('.MuiDialog-root, [role="presentation"] .MuiPaper-root');
            if (modal) break;
            await new Promise(r => setTimeout(r, 300));
        }
        if (!modal) return;
        
        // Let modal settle to avoid crash
        await new Promise(r => setTimeout(r, 1000));

        const mapLabels = Array.from(modal.querySelectorAll('label, .MuiFormControlLabel-root'));
        for (const label of mapLabels) {
            if (targetMaps.some(m => label.innerText.toLowerCase().includes(m))) {
                const checkbox = label.querySelector('input[type="checkbox"]');
                if (checkbox && !checkbox.checked) { 
                    label.click(); 
                    await new Promise(r => setTimeout(r, 250)); // Slowed down map clicking
                }
            }
        }
        
        // Final pause before submission to satisfy the server
        await new Promise(r => setTimeout(r, 1200));

        // Targeting "MAKE OFFER" specifically as seen in screenshot
        const submitBtn = Array.from(modal.querySelectorAll('button')).find(b => 
            /MAKE OFFER|SEND OFFER|REQUEST/i.test(b.innerText) && !/CANCEL|CLOSE/i.test(b.innerText)
        );

        if (submitBtn) {
            log.innerText += ">> Submitting Offer...\n";
            submitBtn.click();
            // Wait for modal to disappear before continuing
            await new Promise(r => setTimeout(r, 1500));
        } else {
            log.innerText += ">> Button missing. Modal might have glitched.\n";
        }
    }

    async function startBot() {
        const log = document.getElementById('ar-log');
        const minRank = document.getElementById('ar-rank-select').value;
        const enabledMaps = Array.from(document.querySelectorAll('.map-checkbox:checked')).map(cb => cb.value.toLowerCase());
        log.innerText = ">> STARTING STABILIZED SCAN...\n";
        
        const buttons = Array.from(document.querySelectorAll('button')).filter(b => 
            (b.innerText.toUpperCase().includes('OFFER') || b.innerText.toUpperCase().includes('REQUEST')) && !b.disabled
        );

        for (const btn of buttons) {
            let row = btn.closest('tr') || btn.closest('div[class*="ScrimRow"]') || btn.parentElement.parentElement.parentElement;
            const teamName = row.querySelector('a[href*="/team/"]')?.innerText.trim() || "Unknown Team";
            
            if (blocklist.includes(teamName.toLowerCase())) {
                log.innerText += `[BLOCKED] ${teamName}\n`;
                continue;
            }

            const rowText = row.innerText.toLowerCase();
            if (enabledMaps.length > 0 && !enabledMaps.some(m => rowText.includes(m))) continue;

            log.innerText += `> Analyzing: ${teamName}\n`;
            const rankIcon = Array.from(row.querySelectorAll('button, [role="button"]')).find(el => el.querySelector('svg') && !el.innerText.toUpperCase().includes('OFFER'));
            
            if (rankIcon) {
                rankIcon.scrollIntoView({ behavior: 'smooth', block: 'center' });
                await new Promise(r => setTimeout(r, 1000));
                rankIcon.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
                rankIcon.click();

                let tooltip = null;
                for (let i = 0; i < 15; i++) {
                    await new Promise(r => setTimeout(r, 200));
                    tooltip = document.querySelector('.MuiTooltip-tooltip, [role="tooltip"]');
                    if (tooltip && (tooltip.querySelector('img') || tooltip.innerText.length > 3)) break;
                }

                if (tooltip) {
                    const tooltipImgs = Array.from(tooltip.querySelectorAll('img')).map(img => img.alt || img.title || "");
                    const minIdx = RANK_ORDER.indexOf(minRank);
                    if (RANK_ORDER.slice(0, minIdx + 1).some(a => tooltipImgs.some(imgAlt => imgAlt.includes(a)))) {
                        log.innerText += `[MATCH] Opening ${teamName}...\n`;
                        btn.click();
                        await handleOfferModal(enabledMaps, log);
                    } else { log.innerText += `[SKIP] ${teamName}\n`; }
                }
                forceCloseTooltips();
                await new Promise(r => setTimeout(r, 1500)); // Delay between teams for stability
            }
        }
        log.innerText += ">> SCAN COMPLETE.\n";
    }

    function removeTeam(name) {
        blocklist = blocklist.filter(t => t !== name);
        localStorage.setItem('pracc_blocklist', JSON.stringify(blocklist));
        updateBlocklistUI();
    }

    function updateBlocklistUI() {
        const container = document.getElementById('ar-block-list-display');
        if (!container) return;
        container.innerHTML = "";
        blocklist.forEach(team => {
            const tag = document.createElement('div');
            tag.className = 'block-tag';
            tag.innerHTML = `${team} <span>×</span>`;
            tag.onclick = () => removeTeam(team);
            container.appendChild(tag);
        });
    }

    function injectUI() {
        if (document.getElementById('pracc-ar-panel')) return;
        const maps = ["Abyss", "Ascent", "Bind", "Breeze", "Fracture", "Haven", "Icebox", "Lotus", "Pearl", "Split", "Sunset"];
        const div = document.createElement('div');
        div.id = 'pracc-ar-panel';
        div.innerHTML = `
            <div id="pracc-ar-body">
                <div style="color: #007bff; font-weight: bold; border-bottom: 1px solid #1a2332;">SCRIM BOT STABLE</div>
                <div class="ar-collapsible-header">Block Team (Enter)</div>
                <input type="text" id="ar-block-input" placeholder="Team Name...">
                <div id="ar-block-list-display"></div>
                <div class="ar-collapsible-header">Min Rank</div>
                <select id="ar-rank-select"><option value="Ascendant">Ascendant+</option><option value="Immortal">Immortal+</option></select>
                <div class="ar-collapsible-header" id="ar-map-header">Maps Pool</div>
                <div id="ar-map-grid-container">
                    ${maps.map(m => `<label class="ar-map-item"><input type="checkbox" class="map-checkbox" value="${m}" checked> ${m}</label>`).join('')}
                </div>
                <div id="ar-log">Ready...</div>
                <button id="ar-start-btn" class="ar-btn" style="margin-top:10px;">START STABLE SCAN</button>
            </div>
            <button id="pracc-ar-toggle">OPEN PANEL</button>
        `;
        document.body.appendChild(div);

        const input = document.getElementById('ar-block-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && input.value.trim() !== "") {
                const name = input.value.trim().toLowerCase();
                if (!blocklist.includes(name)) {
                    blocklist.push(name);
                    localStorage.setItem('pracc_blocklist', JSON.stringify(blocklist));
                    input.value = "";
                    updateBlocklistUI();
                }
            }
        });

        document.getElementById('pracc-ar-toggle').onclick = () => document.getElementById('pracc-ar-body').classList.toggle('active');
        document.getElementById('ar-map-header').onclick = () => {
            const grid = document.getElementById('ar-map-grid-container');
            grid.style.display = grid.style.display === 'none' ? 'grid' : 'none';
        };
        document.getElementById('ar-start-btn').onclick = startBot;
        updateBlocklistUI();
    }

    injectUI();
    setInterval(injectUI, 2000);
})();
'use strict';

import { eventSource, event_types } from '../../../../script.js';
import { initSettings, getSettings } from './settings.js';
import { log, setVerbose } from './logger.js';

const MODULE            = 'core';
const CLASS_ACTIVE      = 'mobilyze-active';
const CLASS_WRAP        = 'mobilyze-wrap-active';
const WIDTH_BREAKPOINT  = 1000;

let _isActive = false;

function isWideViewport() {
    return window.innerWidth >= WIDTH_BREAKPOINT;
}

function syncActivationState() {
    const settings = getSettings();
    const shouldBeActive = settings.enabled
        && !(settings.disableOnWideScreens && isWideViewport());
    if (shouldBeActive && !_isActive) activate();
    else if (!shouldBeActive && _isActive) deactivate();
}

function syncWrapState() {
    const settings = getSettings();
    const shouldWrap = settings.enabled && settings.enableTextWrap;
    document.body.classList.toggle(CLASS_WRAP, !!shouldWrap);
    log(MODULE, 'Wrap state synced', { active: shouldWrap });
}

function onResize() {
    syncActivationState();
}

function activate() {
    if (_isActive) return;
    _isActive = true;
    document.body.classList.add(CLASS_ACTIVE);
    syncWrapState();
    window.addEventListener('resize', onResize);
    log(MODULE, 'Activated');
}

function deactivate() {
    if (!_isActive) return;
    _isActive = false;
    document.body.classList.remove(CLASS_ACTIVE);
    document.body.classList.remove(CLASS_WRAP);
    window.removeEventListener('resize', onResize);
    log(MODULE, 'Deactivated');
}

// --- Спойлер для дополнительных кнопок сообщения ---
// Работает независимо от переключателя WideChat.
function initButtonSpoiler() {
    function addToggle(mesButtons) {
        if (mesButtons.dataset.hasToggle) return;
        const extra = mesButtons.querySelector('.extraMesButtons');
        if (!extra) return;
        mesButtons.dataset.hasToggle = 'true';

        const toggle = document.createElement('div');
        toggle.className = 'mes_button custom_expand_toggle fa-solid fa-ellipsis interactable';
        toggle.title = 'Ещё действия';
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mesButtons.classList.toggle('expanded');
        });

        mesButtons.appendChild(toggle);
    }

    const observer = new MutationObserver(() => {
        document.querySelectorAll('.mes_buttons:not([data-has-toggle])').forEach(addToggle);
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll('.mes_buttons').forEach(addToggle);

    log(MODULE, 'Button spoiler initialized');
}

jQuery(async () => {
    await initSettings(
        () => syncActivationState(),
        (debugEnabled) => setVerbose(debugEnabled),
        () => {
            syncActivationState();
            if (_isActive) syncWrapState();
        }
    );

    const settings = getSettings();
    setVerbose(settings.debugLogging);

    if (settings.enabled) {
        eventSource.once(event_types.APP_READY, () => {
            syncActivationState();
        });
    }

    initButtonSpoiler();
});

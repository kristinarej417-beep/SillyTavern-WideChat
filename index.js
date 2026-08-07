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
    syncAct

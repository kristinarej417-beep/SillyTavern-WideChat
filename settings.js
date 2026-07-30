'use strict';

import { saveSettingsDebounced } from '../../../../script.js';
import { extension_settings }    from '../../../extensions.js';
import { log }                   from './logger.js';

const MODULE   = 'settings';
const EXT_NAME = 'mobilyze';

const DEFAULTS = {
    enabled:              true,
    debugLogging:         false,
    enableTextWrap:       true,
    disableOnWideScreens: false,
};

export function getSettings() {
    return extension_settings[EXT_NAME];
}

function injectSettingsPanel() {
    const html = `
<div id="mobilyze-settings" class="extension_settings">
    <div class="inline-drawer">
        <div class="inline-drawer-toggle inline-drawer-header">
            <b>Mes Wrap Fix</b>
            <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
        </div>
        <div class="inline-drawer-content">
            <label class="checkbox_label flexGap5">
                <input type="checkbox" id="mobilyze-enabled">
                <span>Включить</span>
            </label>
            <label class="checkbox_label flexGap5">
                <input type="checkbox" id="mobilyze-disable-wide">
                <span>Отключать на широких экранах</span>
            </label>
            <label class="checkbox_label flexGap5">
                <input type="checkbox" id="mobilyze-wrap">
                <span>Обтекание текста вокруг аватара</span>
            </label>
            <label class="checkbox_label flexGap5">
                <input type="checkbox" id="mobilyze-debug">
                <span>Debug logging</span>
            </label>
        </div>
    </div>
</div>`;
    $('#extensions_settings').append(html);
    log(MODULE, 'Settings panel injected');
}

export async function initSettings(onToggle, onDebugToggle, onSync) {
    extension_settings[EXT_NAME]                      ??= {};
    extension_settings[EXT_NAME].enabled              ??= DEFAULTS.enabled;
    extension_settings[EXT_NAME].debugLogging         ??= DEFAULTS.debugLogging;
    extension_settings[EXT_NAME].enableTextWrap       ??= DEFAULTS.enableTextWrap;
    extension_settings[EXT_NAME].disableOnWideScreens ??= DEFAULTS.disableOnWideScreens;

    injectSettingsPanel();

    const $enabled     = $('#mobilyze-enabled');
    const $wideDisable = $('#mobilyze-disable-wide');
    const $wrap        = $('#mobilyze-wrap');
    const $debug       = $('#mobilyze-debug');
    const settings     = getSettings();

    $enabled.prop('checked', settings.enabled);
    $wideDisable.prop('checked', settings.disableOnWideScreens);
    $wrap.prop('checked', settings.enableTextWrap);
    $debug.prop('checked', settings.debugLogging);

    $enabled.on('change', function () {
        settings.enabled = this.checked;
        saveSettingsDebounced();
        if (typeof onToggle === 'function') onToggle(settings.enabled);
    });

    $wideDisable.on('change', function () {
        settings.disableOnWideScreens = this.checked;
        saveSettingsDebounced();
        if (typeof onSync === 'function') onSync();
    });

    $wrap.on('change', function () {
        settings.enableTextWrap = this.checked;
        saveSettingsDebounced();
        if (typeof onSync === 'function') onSync();
    });

    $debug.on('change', function () {
        settings.debugLogging = this.checked;
        saveSettingsDebounced();
        if (typeof onDebugToggle === 'function') onDebugToggle(settings.debugLogging);
    });
}

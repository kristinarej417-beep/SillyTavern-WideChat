(function() {
    console.log("WideChat Mobile extension loaded!");
    
    function forceWideChat() {
        // Принудительно выставляем системные переменные ширины в 100%
        document.documentElement.style.setProperty('--chatWidth', '100%', 'important');
        document.documentElement.style.setProperty('--chat-width', '100%', 'important');
        
        // Находим и принудительно раскрываем контейнер чата
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.style.setProperty('width', '100%', 'important');
            chatContainer.style.setProperty('max-width', '100%', 'important');
        }
    }

    // Запускаем при загрузке страницы
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', forceWideChat);
    } else {
        forceWideChat();
    }

    // Запускаем повторно при переключении чатов, чтобы настройки не слетали
    jQuery(document).on('chat_loaded', forceWideChat);
})();

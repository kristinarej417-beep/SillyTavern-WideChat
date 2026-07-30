(function() {
    console.log("WideChat Mobile (Custom Pinned Mode) loaded!");

    function forceWideLayout() {
        // 1. Принудительно выставляем системные CSS-переменные ширины в 100%
        document.documentElement.style.setProperty('--chatWidth', '100%', 'important');
        document.documentElement.style.setProperty('--chat-width', '100%', 'important');

        // 2. Растягиваем главный каркас мобильной оболочки чата
        const sheld = document.getElementById('sheld');
        if (sheld) {
            sheld.style.setProperty('width', '100vw', 'important');
            sheld.style.setProperty('max-width', '100vw', 'important');
            sheld.style.setProperty('left', '0px', 'important');
            sheld.style.setProperty('right', '0px', 'important');
            sheld.style.setProperty('margin', '0px', 'important');
        }

        // 3. Растягиваем внутренний контейнер сообщений
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.style.setProperty('width', '100%', 'important');
            chatContainer.style.setProperty('max-width', '100%', 'important');
        }

        // 4. Растягиваем само окно чата
        const chat = document.getElementById('chat');
        if (chat) {
            chat.style.setProperty('width', '100%', 'important');
            chat.style.setProperty('max-width', '100%', 'important');
        }
    }

    // Запускаем скрипт каждые 100мс (0.1 сек), чтобы намертво заблокировать любые попытки ИИ сжать чат
    setInterval(forceWideLayout, 100);

    // Первичный запуск на старте
    forceWideLayout();
})();

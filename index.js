(function() {
    console.log("WideChat Mobile with MutationObserver loaded!");

    function forceWideChat() {
        // 1. Принудительно выставляем системные переменные ширины в 100%
        document.documentElement.style.setProperty('--chatWidth', '100%', 'important');
        document.documentElement.style.setProperty('--chat-width', '100%', 'important');

        // 2. Растягиваем главный каркас мобильной оболочки чата
        const sheld = document.getElementById('sheld');
        if (sheld) {
            sheld.style.setProperty('width', '100vw', 'important');
            sheld.style.setProperty('max-width', '100vw', 'important');
            sheld.style.setProperty('left', '0px', 'important');
            sheld.style.setProperty('right', '0px', 'important');
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

    // Создаем Наблюдатель, который будет следить за изменениями страницы в реальном времени
    const observer = new MutationObserver(forceWideChat);
    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class']
    });

    // Запускаем первично при загрузке
    forceWideChat();
})();

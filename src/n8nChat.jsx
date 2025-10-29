// src/N8nChat.js
import { useEffect } from 'react';

const N8nChat = () => {
    useEffect(() => {
        // load stylesheet
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
        document.head.appendChild(link);

    // Use a runtime dynamic import hidden from the bundler to load the ES module
    // This avoids bundlers (like react-scripts) trying to parse the import during build
    // eslint-disable-next-line no-new-func
    const dynamicImport = new Function('u', 'return import(u)');

        dynamicImport('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js')
            .then(({ createChat }) => {
                if (typeof createChat === 'function') {
                    createChat({
                        webhookUrl:
                            'https://prathmeshk1401.app.n8n.cloud/webhook/a889d2ae-2159-402f-b326-5f61e90f602e/chat',
                        title: 'Verdure AI',
                    });
                }
            })
            .catch((err) => {
                // swallow or log runtime errors — don't crash the app
                // eslint-disable-next-line no-console
                console.error('Failed to load chat module', err);
            });

        // cleanup not necessary for external script/css but keep safe removal if component unmounts
        return () => {
            // remove injected stylesheet (optional)
            try {
                if (link && link.parentNode) link.parentNode.removeChild(link);
            } catch (e) {
                /* ignore */
            }
        };
    }, []);

    return null;
};

export default N8nChat;

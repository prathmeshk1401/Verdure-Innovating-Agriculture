// src/N8nChat.js
import React, { useEffect } from 'react';

const N8nChat = () => {
    useEffect(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';
        script.onload = () => {
            import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(({ createChat }) => {
                createChat({
                    webhookUrl: 'https://verdureofficial.app.n8n.cloud/webhook/36afc3e7-c761-466b-847d-a71bbcd9526f/chat',
                    title: 'Verdure AI',
                });
            });
        };
        document.body.appendChild(script);
    }, []);

    return null;
};

export default N8nChat;

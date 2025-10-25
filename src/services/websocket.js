let socket = null;

export const connectWebSocket = (onMessage, onOpen, onClose) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("WebSocket is already connected.");
        return socket;
    };

    socket = new WebSocket("ws://localhost:8000/api/v1/ws");

    socket.onopen = () => {
        console.log("WebSocket connection established.");
        if (onOpen) onOpen();
    };

    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("WebSocket message received:", data);
        if (onMessage) onMessage(data);
    };

    socket.onclose = () => {
        console.log("WebSocket connection closed.");
        if (onClose) onClose();
        socket = null;
    };
    
    socket.onerror = (error) => {
        console.error("WebSocket error:", error);
    };

    return socket;
}

export const getWebSocket = () => socket;
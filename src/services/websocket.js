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
        try {
            const data = JSON.parse(event.data);
            console.log("WebSocket message received:", data);
            if (onMessage) onMessage(data);
        } catch (e) {
            console.error("Error parsing WebSocket message:", e, event.data)
        }
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

export const diconnectWebSocket = () => {
    if (socket) {
        if (socket.readyState === WebSocket.OPEN) {
            socket.close(1000, "Component unmount");
            console.log("WebSocket connection initiated close.");
        } else if (socket.readyState === WebSocket.CONNECTING) {
            console.log("WebSocket was connecting, interrupting the attempt.")
            socket = null
        } else {
            console.log("WebSocket is not connected...")
            socket = null
        }
    }
};

export const getWebSocket = () => socket;
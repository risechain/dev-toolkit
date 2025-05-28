export class WebSocketDemo {
  private ws: WebSocket | null = null;
  private timeout: NodeJS.Timeout | null = null;

  async connect(address: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket('wss://your-rise-api-endpoint');
        
        this.ws.onopen = () => {
          this.ws?.send(JSON.stringify({ address }));
        };

        this.ws.onmessage = (event) => {
          const data = JSON.parse(event.data);
          resolve(data);
          this.disconnect();
        };

        this.ws.onerror = (error) => {
          reject(new Error('WebSocket connection failed'));
        };

        // Auto-disconnect after 10 seconds
        this.timeout = setTimeout(() => {
          this.disconnect();
          reject(new Error('Connection timeout'));
        }, 10000);

      } catch (error) {
        reject(error);
      }
    });
  }

  private disconnect() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}
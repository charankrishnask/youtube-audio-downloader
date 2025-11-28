const BACKEND_URL = "http://127.0.0.1:8000";

export const streamDownload = (options, onMessage) => {
  const { url, convert_mp3, keep_original } = options;
  
  const queryParams = new URLSearchParams({
    url,
    convert_mp3: convert_mp3.toString(),
    keep_original: keep_original.toString(),
  });

  const eventSource = new EventSource(
    `${BACKEND_URL}/download-stream?${queryParams}`
  );

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      onMessage(data);
    } catch (err) {
      console.error("Error parsing SSE data:", err);
    }
  };

  eventSource.onerror = (err) => {
    console.error("SSE error:", err);
    eventSource.close();
  };

  return eventSource;
};

// New function for direct file download
export const downloadFile = async (options) => {
  const { url, convert_mp3, keep_original } = options;
  
  const response = await fetch(`${BACKEND_URL}/download-file`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      convert_mp3,
      keep_original
    })
  });

  return response;
};
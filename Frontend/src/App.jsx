import { useState } from "react";

// Direct API call function
const downloadFile = async (options) => {
  const { url, convert_mp3, keep_original } = options;
  
  const response = await fetch('http://127.0.0.1:8000/download-file', {
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

export default function App() {
  const [url, setUrl] = useState("");
  const [convertMp3, setConvertMp3] = useState(true);
  const [keepOriginal, setKeepOriginal] = useState(false);

  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState("-");
  const [eta, setEta] = useState("-");
  const [status, setStatus] = useState("Ready");
  const [logs, setLogs] = useState("Welcome to YouTube Audio Downloader! 🎵\n\nEnter a YouTube URL and click Download to start.");
  const [isDownloading, setIsDownloading] = useState(false);

  const addLog = (message, type = "info") => {
    const timestamp = new Date().toLocaleTimeString();
    const colors = {
      info: "#60a5fa",
      success: "#34d399", 
      error: "#f87171",
      warning: "#fbbf24",
      progress: "#a78bfa"
    };
    
    const color = colors[type] || "#60a5fa";
    const logEntry = `[${timestamp}] ${message}`;
    
    setLogs(prev => prev + `\n<span style="color: ${color}">${logEntry}</span>`);
  };

  const startDownload = async () => {
    if (!url.trim()) {
      addLog("❌ Please enter a YouTube URL", "error");
      return;
    }

    if (!url.includes("youtube.com") && !url.includes("youtu.be")) {
      if (!window.confirm("This doesn't look like a YouTube URL. Continue anyway?")) {
        return;
      }
    }

    setIsDownloading(true);
    setProgress(0);
    setSpeed("-");
    setEta("-");
    setStatus("Preparing download...");
    setLogs("Starting download process...\n");

    try {
      addLog("🔧 Starting download process...", "progress");
      addLog(`📺 URL: ${url}`, "info");
      addLog(`🎵 Convert to MP3: ${convertMp3 ? "Yes" : "No"}`, "info");
      addLog(`💾 Keep Original: ${keepOriginal ? "Yes" : "No"}`, "info");
      addLog("⏳ Requesting file from server...", "progress");

      // Show initial progress
      setProgress(10);
      setStatus("Connecting to server...");

      // Use the download-file endpoint
      const response = await downloadFile({
        url,
        convert_mp3: convertMp3,
        keep_original: keepOriginal
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      setProgress(50);
      setStatus("File ready - triggering download...");
      addLog("✅ Server processing complete!", "success");
      addLog("💾 Browser save dialog should appear now...", "success");

      // Get the filename from response headers
      const contentDisposition = response.headers.get('content-disposition');
      let filename = 'youtube_audio.mp3';
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }

      addLog(`📁 Filename: ${filename}`, "info");

      // Create blob from response
      const blob = await response.blob();
      addLog(`💿 File size: ${(blob.size / 1024 / 1024).toFixed(2)} MB`, "info");

      // Create object URL
      const fileUrl = URL.createObjectURL(blob);
      
      setProgress(80);
      setStatus("Opening save dialog...");

      // Create a temporary link and click it (triggers save dialog)
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = filename;
      link.style.display = 'none';
      
      // Append to body and click
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      
      setProgress(100);
      setStatus("Download Complete!");
      
      addLog("🎉 Save dialog triggered successfully!", "success");
      addLog("📍 Choose where to save the file in the dialog box", "info");
      addLog("✅ Download will start after you select location", "success");

      // Clean up object URL after a delay
      setTimeout(() => {
        URL.revokeObjectURL(fileUrl);
        addLog("🧹 Cleaned up temporary files", "info");
      }, 5000);

    } catch (error) {
      console.error('Download error:', error);
      addLog(`❌ Error: ${error.message}`, "error");
      addLog("🔧 Please check the URL and try again", "warning");
      setStatus("Download Failed");
      setProgress(0);
    } finally {
      setIsDownloading(false);
    }
  };

  const clearLogs = () => {
    setLogs("Welcome to YouTube Audio Downloader! 🎵\n\nEnter a YouTube URL and click Download to start.");
    setUrl("");
    setProgress(0);
    setStatus("Ready");
    setSpeed("-");
    setEta("-");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header Banner */}
      <div className="bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="text-4xl">🎵</div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  YouTube Audio Pro
                </h1>
                <p className="text-white/60 text-lg mt-1">
                  Professional YouTube Audio Downloader
                </p>
              </div>
            </div>
            <p className="text-pink-400 text-sm mt-2 flex items-center justify-center space-x-1">
              <span>❤️</span>
              <span>exclusively for madam</span>
              <span>❤️</span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Content - Full Height Layout */}
      <div className="max-w-[95vw] mx-auto px-4 py-4 h-[calc(100vh-160px)]">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 h-full"> {/* Increased gap from gap-8 to gap-12 */}
          
          {/* Left Panel - Controls - Increased width */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 flex flex-col min-w-0"> {/* Added min-w-0 */}
            <div className="flex-1">
              <h2 className="text-white text-xl font-semibold mb-6">Download Settings</h2>
              
              {/* URL Input */}
              <div className="mb-6">
                <label className="block text-white/80 text-sm font-semibold mb-3">
                  YouTube URL
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isDownloading}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isDownloading && url.trim()) {
                      startDownload();
                    }
                  }}
                />
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    id="convertMp3"
                    checked={convertMp3}
                    onChange={() => setConvertMp3(!convertMp3)}
                    disabled={isDownloading}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400"
                  />
                  <label htmlFor="convertMp3" className="text-white font-medium flex-1">
                    <div className="font-semibold">Convert to MP3</div>
                    <div className="text-white/60 text-sm">High quality 320kbps audio</div>
                  </label>
                </div>

                <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <input
                    type="checkbox"
                    id="keepOriginal"
                    checked={keepOriginal}
                    onChange={() => setKeepOriginal(!keepOriginal)}
                    disabled={isDownloading}
                    className="w-5 h-5 text-blue-500 rounded focus:ring-blue-400"
                  />
                  <label htmlFor="keepOriginal" className="text-white font-medium flex-1">
                    <div className="font-semibold">Keep Original File</div>
                    <div className="text-white/60 text-sm">Preserve original audio format</div>
                  </label>
                </div>
              </div>

              {/* Progress Section */}
              <div className="mb-6 p-5 rounded-xl bg-white/5 border border-white/10">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-semibold text-lg">{status}</span>
                  <span className="text-white/70 text-sm bg-white/10 px-3 py-1 rounded-full">{progress.toFixed(1)}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden mb-4">
                  <div
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-3 transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/60 text-sm mb-1">Speed</div>
                    <div className="text-white font-semibold">{speed}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/60 text-sm mb-1">ETA</div>
                    <div className="text-white font-semibold">{eta}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <div className="text-white/60 text-sm mb-1">Progress</div>
                    <div className="text-white font-semibold">{progress.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <button
              onClick={startDownload}
              disabled={isDownloading || !url.trim()}
              className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                isDownloading || !url.trim()
                  ? 'bg-gray-600 cursor-not-allowed text-gray-300'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-2xl hover:shadow-3xl transform hover:scale-[1.02]'
              }`}
            >
              {isDownloading ? (
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Processing Download...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center space-x-3">
                  <span className="text-xl">🚀</span>
                  <span>Download Audio</span>
                </div>
              )}
            </button>

            {/* Quick Tips */}
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-400/20 rounded-xl">
              <div className="flex items-start space-x-3">
                <div className="text-blue-400 text-lg">💡</div>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">How it works</div>
                  <div className="text-white/60 text-xs">
                    Enter URL → Click Download → Choose save location → Audio downloads automatically
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Logs - Increased width */}
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 flex flex-col min-w-0"> {/* Added min-w-0 */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-semibold">Download Log</h2>
              <button
                onClick={clearLogs}
                disabled={isDownloading}
                className="text-white/60 hover:text-white text-sm transition-colors disabled:opacity-50 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg"
              >
                🗑️ Clear All
              </button>
            </div>
            
            <div 
              className="bg-black/30 rounded-xl p-6 flex-1 overflow-auto font-mono text-sm border border-white/10"
              dangerouslySetInnerHTML={{ __html: logs }}
            />
            
            {/* Footer Stats */}
            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="grid grid-cols-3 gap-4 text-center text-xs">
                <div className="text-white/60">
                  <div>Status</div>
                  <div className="text-white font-semibold">{status}</div>
                </div>
                <div className="text-white/60">
                  <div>Format</div>
                  <div className="text-white font-semibold">{convertMp3 ? "MP3" : "Original"}</div>
                </div>
                <div className="text-white/60">
                  <div>Files</div>
                  <div className="text-white font-semibold">{keepOriginal && convertMp3 ? "2" : "1"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
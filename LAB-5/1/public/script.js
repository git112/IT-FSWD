document.addEventListener('DOMContentLoaded', () => {
    const fetchLogsButton = document.getElementById('fetchLogs');
    const logsContainer = document.getElementById('logsContainer');

    fetchLogsButton.addEventListener('click', async () => {
        try {
            // Disable button and show loading state
            fetchLogsButton.disabled = true;
            fetchLogsButton.textContent = 'Loading...';
            
            // Fetch logs from the server
            const response = await fetch('/logs');
            const logs = await response.json();
            
            // Clear previous logs
            logsContainer.innerHTML = '';
            
            // Display logs or no logs message
            if (logs.length === 0) {
                logsContainer.innerHTML = '<p>No visits logged yet.</p>';
                return;
            }

            // Create and append log entries
            logs.forEach(log => {
                const logEntry = document.createElement('div');
                logEntry.className = 'log-entry';
                logEntry.innerHTML = `
                    <strong>IP:</strong> ${log.ip}<br>
                    <strong>Time:</strong> ${new Date(log.timestamp).toLocaleString()}
                `;
                logsContainer.appendChild(logEntry);
            });
        } catch (error) {
            console.error('Error fetching logs:', error);
            logsContainer.innerHTML = '<p>Error loading logs. Please try again.</p>';
        } finally {
            // Reset button state
            fetchLogsButton.disabled = false;
            fetchLogsButton.textContent = 'View Visit Logs';
        }
    });
}); 
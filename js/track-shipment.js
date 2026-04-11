document.addEventListener('DOMContentLoaded', () => {
    const trackBtn = document.getElementById('trackBtn');
    const trackingInput = document.getElementById('trackingInput');
    const resultContainer = document.getElementById('trackingResult');
    const errorMsg = document.getElementById('errorMsg');

    // Mock Data based on your dashboard system
    const shipments = {
        "TRK001": { status: "Ordered", location: "Kolkata, IN", percent: 25 },
        "TRK002": { status: "Shipped", location: "Warehouse A, Delhi", percent: 50 },
        "TRK003": { status: "In Transit", location: "On Route to Mumbai", percent: 75 },
        "TRK004": { status: "Delivered", location: "Hyderabad, IN", percent: 100 }
    };

    trackBtn.addEventListener('click', () => {
        const id = trackingInput.value.trim().toUpperCase();
        
        if (shipments[id]) {
            showResult(id, shipments[id]);
        } else {
            showError();
        }
    });

    function showResult(id, data) {
        errorMsg.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        // Update Text Info
        document.getElementById('resTrackingId').innerText = id;
        document.getElementById('resStatusText').innerText = data.status;
        document.getElementById('resLocation').innerText = data.location;

        // Update Bootstrap Progress Bar
        const progressBar = document.getElementById('dynamicProgressBar');
        progressBar.style.width = data.percent + "%";
        progressBar.innerText = data.percent + "%";
        progressBar.setAttribute('aria-valuenow', data.percent);

        // Dynamic Color Logic
        if (data.percent <= 25) progressBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-info";
        else if (data.percent <= 75) progressBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-primary";
        else progressBar.className = "progress-bar progress-bar-striped progress-bar-animated bg-success";

        // Highlight Labels
        updateLabels(data.percent);
    }

    function updateLabels(percent) {
        const labels = ['ordered', 'shipped', 'transit', 'delivered'];
        labels.forEach((label, index) => {
            const element = document.getElementById(`label-${label}`);
            const stepPercent = (index + 1) * 25;
            element.style.color = percent >= stepPercent ? "#1e3c72" : "#adb5bd";
            element.style.opacity = percent >= stepPercent ? "1" : "0.5";
        });
    }

    function showError() {
        resultContainer.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
});
const shipments = [
      { trackingId: "TRK001", status: "Pending", currentLocation: "Kolkata", step: 1 },
      { trackingId: "TRK002", status: "In Transit", currentLocation: "Delhi", step: 3 },
      { trackingId: "TRK003", status: "Delivered", currentLocation: "Mumbai", step: 4 },
      { trackingId: "TRK004", status: "Shipped", currentLocation: "Hyderabad", step: 2 }
    ];

    const trackBtn = document.getElementById('trackBtn');
    const trackingInput = document.getElementById('trackingInput');
    const resultContainer = document.getElementById('trackingResult');
    const errorMsg = document.getElementById('errorMsg');

    trackBtn.addEventListener('click', () => {
      const id = trackingInput.value.trim().toUpperCase();
      const shipment = shipments.find(s => s.trackingId === id);

      if (shipment) {
        errorMsg.classList.add('hidden');
        resultContainer.classList.remove('hidden');
        
        document.getElementById('resTrackingId').innerText = shipment.trackingId;
        document.getElementById('resStatusText').innerText = shipment.status;
        document.getElementById('resLocation').innerText = shipment.currentLocation;

        // Update progress bar active states
        const steps = ['step1', 'step2', 'step3', 'step4'];
        steps.forEach((stepId, index) => {
          const el = document.getElementById(stepId);
          if (index < shipment.step) {
            el.classList.add('active');
          } else {
            el.classList.remove('active');
          }
        });
      } else {
        resultContainer.classList.add('hidden');
        errorMsg.classList.remove('hidden');
      }
    });

    // Basic mobile menu toggle logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
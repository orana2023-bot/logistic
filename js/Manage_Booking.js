let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
let id = bookings.length ? bookings[bookings.length - 1].id + 1 : 1;

function save() {
    localStorage.setItem("bookings", JSON.stringify(bookings));
}

function generateTracking() {
    return "TRK" + Math.floor(Math.random() * 1000000);
}

function addBooking() {
    let name = nameInput.value;
    let phone = phoneInput.value;
    let pickup = pickupInput.value;
    let delivery = deliveryInput.value;
    let parcel = parcelInput.value;
    let price = priceInput.value;
    let status = statusInput.value;

    if (!name || !phone || !pickup || !delivery) {
        alert("Fill all required fields");
        return;
    }

    bookings.push({
        id: id++,
        tracking: generateTracking(),
        name, phone, pickup, delivery, parcel, price, status
    });

    save();
    display();
    clearForm();
}

function display() {
    tbody.innerHTML = "";
    bookings.forEach((b, i) => {
        tbody.innerHTML += `
<tr>
<td>${b.id}</td>
<td>${b.tracking}</td>
<td>${b.name}</td>
<td>${b.phone}</td>
<td>${b.pickup}</td>
<td>${b.delivery}</td>
<td>₹${b.price}</td>
<td>${b.status}</td>
<td>
<button class="btn view" onclick="view(${i})">View</button>
<button class="btn edit" onclick="edit(${i})">Edit</button>
<button class="btn delete" onclick="del(${i})">Delete</button>
</td>
</tr>`;
    });
    updateDashboard();
}

function updateDashboard() {
    let total = bookings.length;
    let delivered = bookings.filter(b => b.status === "Delivered").length;
    let pending = bookings.filter(b => b.status === "Pending").length;
    let shipped = bookings.filter(b => b.status === "Shipped").length;

    document.getElementById("total").innerText = total;
    document.getElementById("delivered").innerText = delivered;
    document.getElementById("pending").innerText = pending;
    document.getElementById("shipped").innerText = shipped;

    let percent = total ? (delivered / total) * 100 : 0;
    document.getElementById("progress").style.width = percent + "%";
}

function del(i) {
    if (confirm("Delete this booking?")) {
        bookings.splice(i, 1);
        save();
        display();
    }
}

function edit(i) {
    let b = bookings[i];
    nameInput.value = b.name;
    phoneInput.value = b.phone;
    pickupInput.value = b.pickup;
    deliveryInput.value = b.delivery;
    parcelInput.value = b.parcel;
    priceInput.value = b.price;

    bookings.splice(i, 1);
    save();
    display();
}

function view(i) {
    let b = bookings[i];
    modal.style.display = "block";
    modalContent.innerHTML = `
<h3>📦 Booking Details</h3>
<p><b>Name:</b> ${b.name}</p>
<p><b>Phone:</b> ${b.phone}</p>
<p><b>Pickup:</b> ${b.pickup}</p>
<p><b>Delivery:</b> ${b.delivery}</p>
<p><b>Parcel:</b> ${b.parcel}</p>
<p><b>Price:</b> ₹${b.price}</p>
<p><b>Status:</b> ${b.status}</p>
<button onclick="closeModal()">Close</button>`;
}

function closeModal() {
    modal.style.display = "none";
}

function searchBooking() {
    let val = search.value.toLowerCase();
    document.querySelectorAll("tbody tr").forEach(r => {
        r.style.display = r.innerText.toLowerCase().includes(val) ? "" : "none";
    });
}

function clearAll() {
    if (confirm("Clear all data?")) {
        bookings = [];
        save();
        display();
    }
}

function clearForm() {
    document.querySelectorAll(".form input").forEach(i => i.value = "");
}

/* selectors */
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const pickupInput = document.getElementById("pickup");
const deliveryInput = document.getElementById("delivery");
const parcelInput = document.getElementById("parcel");
const priceInput = document.getElementById("price");
const statusInput = document.getElementById("status");
const tbody = document.getElementById("tbody");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const search = document.getElementById("search");

display();
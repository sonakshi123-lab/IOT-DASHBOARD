let doorOpen = false;
let parcelAddedThisDelivery = false;
let totalDeliveries = 0;
let totalWeight = 0;

function updateDashboard(message, type = "") {
    document.getElementById("count").innerText =
        totalDeliveries;

    document.getElementById("door").innerText =
        doorOpen ? "Unlocked" : "Locked";

    document.getElementById("parcel").innerText =
        totalWeight > 0 ? "Occupied" : "Empty";

    document.getElementById("doorDetail").innerText =
        doorOpen ? "Open" : "Closed";

    document.getElementById("detect").innerText =
        totalWeight > 0 ? "Yes" : "No";

    document.getElementById("weight").innerText =
        totalWeight + " g";

    const status = document.getElementById("status");

    status.innerText = message;
    status.className = "status " + type;
}

function addHistory(message) {
    const history = document.getElementById("history");

    if (history.innerText === "No deliveries yet.") {
        history.innerHTML = "";
    }

    const item = document.createElement("p");
    item.innerText =
        new Date().toLocaleTimeString() + " - " + message;

    history.prepend(item);
}

function unlockDoor() {
    if (doorOpen) {
        alert("Door is already unlocked!");
        return;
    }

    doorOpen = true;
    parcelAddedThisDelivery = false;

    updateDashboard("Awaiting Parcel", "warning");
    addHistory("Door Unlocked");
}

function addParcel() {
    if (!doorOpen) {
        alert("Please unlock the door first!");
        return;
    }

    totalWeight += 150;
    parcelAddedThisDelivery = true;

    updateDashboard("Parcel Detected", "success");
    addHistory("New parcel detected in demo");
}

function closeDoor() {
    if (!doorOpen) {
        alert("Door is already closed!");
        return;
    }

    doorOpen = false;

    if (parcelAddedThisDelivery) {
        totalDeliveries++;

        updateDashboard("Parcel Secured", "success");
        addHistory("Parcel Successfully Secured");

        parcelAddedThisDelivery = false;
    } else {
        updateDashboard(
            "Delivery Incomplete",
            "error"
        );

        addHistory("Delivery Incomplete - No New Parcel");
    }
}

function closeWithoutParcel() {
    if (!doorOpen) {
        alert("Door is already closed!");
        return;
    }

    doorOpen = false;

    updateDashboard(
        "Delivery Incomplete",
        "error"
    );

    addHistory("Delivery Failed - No Parcel Added");
}

// Initial dashboard status
updateDashboard("Box Empty");
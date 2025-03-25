// Sample data for restaurants and menus
const restaurants = [
    { id: 1, name: "Dosa Palace", menu: [
        { id: 1, name: "Plain Dosa", price: 30 },
        { id: 2, name: "Cheese Dosa", price: 50 },
        { id: 3, name: "Masala Dosa", price: 70 },
    ]},
    { id: 2, name: "Alpha", menu: [
        { id: 4, name: "Chicken Dum Biryani", price: 199 },
        { id: 5, name: "Mutton Dum Biryani", price: 349 },
    ]},
    { id: 3, name: "Only Vegan's", menu: [
        { id: 6, name: "Butter Paneer", price: 149 },
        { id: 7, name: "Veg Rice", price: 120 },
    ]}
];

let order = [];
let userDetails = {};

// Function to handle user details form submission
document.getElementById("user-details-form").addEventListener("submit", function(e) {
    e.preventDefault();
    userDetails.name = document.getElementById("userName").value;
    userDetails.mobile = document.getElementById("mobileNumber").value;
    userDetails.address = document.getElementById("address").value;

    document.getElementById("user-details-section").classList.add("hidden");
    document.getElementById("menu-section").classList.remove("hidden");
});

// Show menu by restaurant
function showMenuByRestaurant(restaurantId) {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    const menuDisplay = document.getElementById("menu-display");
    menuDisplay.innerHTML = `<h3>${restaurant.name} Menu</h3><ul>${restaurant.menu.map(item => `
        <li>
            ${item.name} - Rs.${item.price}
            <button onclick="addToOrder(${item.id}, '${item.name}', ${item.price})">Add</button>
        </li>
    `).join('')}</ul>`;
    menuDisplay.innerHTML += `<button class="proceed-btn" onclick="goToOrder()">Proceed to Order</button>`;
}

// Show combined menu
function showAllMenu() {
    const menuDisplay = document.getElementById("menu-display");
    menuDisplay.innerHTML = "<h3>All Restaurants Menu</h3>";
    restaurants.forEach(restaurant => {
        menuDisplay.innerHTML += `<h4>${restaurant.name}</h4><ul>${restaurant.menu.map(item => `
            <li>
                ${item.name} - Rs.${item.price}
                <button onclick="addToOrder(${item.id}, '${item.name}', ${item.price})">Add</button>
            </li>
        `).join('')}</ul>`;
    });
    menuDisplay.innerHTML += `<button class="proceed-btn" onclick="goToOrder()">Proceed to Order</button>`;
}

// Add item to order
function addToOrder(id, name, price) {
    order.push({ id, name, price });
    alert(`${name} has been added to your order!`);
}

// Navigate to order summary
function goToOrder() {
    if (order.length === 0) {
        alert("Your order is empty. Please add items before proceeding.");
        return;
    }
    document.getElementById("menu-section").classList.add("hidden");
    document.getElementById("order-section").classList.remove("hidden");

    // Populate order summary
    const orderSummary = document.getElementById("order-summary");
    orderSummary.innerHTML = order.map(item => `<li>${item.name} - Rs.${item.price}</li>`).join('');
    orderSummary.innerHTML += `<button class="proceed-btn" onclick="showBill()">Place Order & View Bill</button>`;
}

// Show bill
function showBill() {
    const billSection = document.getElementById("bill-display");
    const total = order.reduce((sum, item) => sum + item.price, 0);
    const gst = total * 0.05;
    const sgst = total * 0.05;
    const finalTotal = total + gst + sgst;

    billSection.innerHTML = `
        <p><strong>Name:</strong> ${userDetails.name}</p>
        <p><strong>Mobile:</strong> ${userDetails.mobile}</p>
        <p><strong>Address:</strong> ${userDetails.address}</p>
        <h3>Items Ordered:</h3>
        <ul>${order.map(item => `<li>${item.name} - Rs.${item.price}</li>`).join('')}</ul>
        <p><strong>Subtotal:</strong> Rs.${total.toFixed(2)}</p>
        <p><strong>GST (5%):</strong> Rs.${gst.toFixed(2)}</p>
        <p><strong>SGST (5%):</strong> Rs.${sgst.toFixed(2)}</p>
        <h3>Total: Rs.${finalTotal.toFixed(2)}</h3>
        <button class="proceed-btn" onclick="showFeedbackForm()">Provide Feedback</button>
    `;
    document.getElementById("order-section").classList.add("hidden");
    document.getElementById("bill-section").classList.remove("hidden");
}

// Show feedback form
function showFeedbackForm() {
    document.getElementById("bill-section").classList.add("hidden");
    document.getElementById("feedback-section").classList.remove("hidden");
}

// Handle feedback form submission
document.getElementById("feedback-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const foodRating = document.getElementById("foodRating").value;
    const restaurantRating = document.getElementById("restaurantRating").value;
    const additionalFeedback = document.getElementById("additionalFeedback").value;

    alert(`Thank you for your feedback!\nFood Rating: ${foodRating}/5\nRestaurant Rating: ${restaurantRating}/5\nFeedback: ${additionalFeedback}`);
    location.reload(); // Reload the page for a new session
});
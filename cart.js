let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.querySelector(".cart-count");
const buttons = document.querySelectorAll(".add-to-cart");

updateCartCount();

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const item = {
            id: button.dataset.id,
            name: button.dataset.name,
            price: Number(button.dataset.price)
        };

        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        
        button.innerHTML = '<i class="fas fa-check"></i> Додано';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-cart-plus"></i> У кошик';
        }, 1000);
    });
});

function updateCartCount() {
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function showCart() {
    let cartContainer = document.querySelector(".cart-items");
    let totalElement = document.querySelector(".total-price");
    
    if (!cartContainer) return;

    if (cart.length > 0) {
        cartContainer.innerHTML = '';
        let sum = 0;

        cart.forEach((item, index) => {
            cartContainer.innerHTML += `
            <div class="cart-item" style="display: flex; justify-content: space-between; padding: 10px; border-bottom: 1px solid #ddd;">
                <span>${item.name}</span>
                <span>
                    <b>${item.price} грн</b>
                    <button onclick="removeItem(${index})" style="margin-left:10px; cursor:pointer; background:none; border:none; color:red;">
                        <i class="fas fa-trash"></i>
                    </button>
                </span>
            </div>
            `;
            sum += item.price;
        });

        if (totalElement) {
            totalElement.textContent = sum + " грн";
        }
    } else {
        cartContainer.innerHTML = '<p class="empty-cart">Кошик порожній 🪄</p>';
        if (totalElement) totalElement.textContent = "0 грн";
    }
}

window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCart();
}

showCart();

const orderForm = document.getElementById('checkout-form');

if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            alert("Ваш кошик порожній! Додайте спочатку магічні артефакти.");
            return;
        }

        const name = document.getElementById('name').value;

        alert(`Дякуємо, ${name}! Ваше замовлення прийняте. Очікуйте на сову! 🦉`);

        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        
        updateCartCount();
        showCart();
        orderForm.reset();
    });
}
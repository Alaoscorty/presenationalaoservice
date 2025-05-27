//code qui gère le formulaire
document.querySelector('form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Empêche le rechargement

    const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        service: document.getElementById('service').value,
        message: document.getElementById('message').value,
    };

    try {
        const response = await fetch('https://presenationalaoservice.onrender.com/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            alert('Réservation envoyée avec succès !');
        } else {
            alert('Erreur lors de l’envoi de la réservation.');
        }
    } catch (error) {
        console.error('Erreur réseau :', error);
        alert('Erreur réseau.');
    }
});
//code qui gère la carte produit
document.getElementById('show-products-btn').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('hidden-products').classList.toggle('hidden');
  this.classList.add('hidden');
});

//script qui permet de gérer le panier 
 const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCart = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let cart = [];

function updateCartDisplay() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
    cartItemsList.innerHTML = '';
    let total = 0;
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="text-gray-500 text-center">Votre panier est vide.</li>';
    } else {
        cart.forEach((item, idx) => {
            total += item.price * item.qty;
            const li = document.createElement('li');
            li.className = "flex justify-between items-center mb-2";
            li.innerHTML = `
                <span>${item.name} <span class="text-xs text-gray-400">x${item.qty}</span></span>
                <span>${item.price * item.qty} FCFA <button data-idx="${idx}" class="text-red-500 ml-2 remove-item"><i class="fas fa-trash"></i></button></span>
            `;
            cartItemsList.appendChild(li);
        });
    }
    cartTotal.textContent = total + ' FCFA';
}

document.querySelectorAll('.product-card button').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = btn.closest('.product-card');
        const name = card.querySelector('h3').textContent.trim();
        const price = parseInt(card.querySelector('.font-bold.text-amber-600').textContent.replace(/\D/g, ''));
        const idx = cart.findIndex(item => item.name === name && item.price === price);
        if (idx > -1) {
            cart[idx].qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        updateCartDisplay();
    });
});

cartBtn.addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    updateCartDisplay();
});

closeCart.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

cartItemsList.addEventListener('click', function(e) {
    if (e.target.closest('.remove-item')) {
        const idx = e.target.closest('.remove-item').dataset.idx;
        cart.splice(idx, 1);
        updateCartDisplay();
    }
});

// Fermer le modal panier en cliquant en dehors
cartModal.addEventListener('click', function(e) {
    if (e.target === cartModal) cartModal.classList.add('hidden');
});
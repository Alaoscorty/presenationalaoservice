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


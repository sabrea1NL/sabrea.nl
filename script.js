// ============================================
// SABREA.NL — script.js
// Navigation, Panier, Filtres, Formulaire
// ============================================

var cart = [];

// --------------------------------------------
// NAVIGATION ENTRE PAGES
// --------------------------------------------
function goTo(page) {
  // Cacher toutes les pages
  document.querySelectorAll('.page').forEach(function(p) {
    p.classList.remove('active');
  });

  // Afficher la page cible
  var target = document.getElementById('page-' + page);
  if (target) target.classList.add('active');

  // Mettre à jour le menu actif
  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.classList.remove('active');
  });
  var navEl = document.getElementById('nav-' + page);
  if (navEl) navEl.classList.add('active');

  // Remonter en haut de la page
  window.scrollTo(0, 0);

  // Si on va sur le panier, rafraîchir l'affichage
  if (page === 'cart') renderCartItems();
}

// --------------------------------------------
// PANIER
// --------------------------------------------
function addCart(name, price) {
  cart.push({ name: name, price: price });
  updateCartCount();
  showToast('« ' + name + ' » ajouté au panier !');
}

function removeCart(idx) {
  cart.splice(idx, 1);
  updateCartCount();
  renderCartItems();
}

function updateCartCount() {
  var el = document.getElementById('cartCount');
  if (el) el.textContent = cart.length;
}

function renderCartItems() {
  var el = document.getElementById('cartItems');
  var footer = document.getElementById('cartFooter');
  if (!el) return;

  if (cart.length === 0) {
    el.innerHTML = '<p class="cart-empty">Votre panier est vide. <a onclick="goTo(\'collection\')" style="color:#7B0000;cursor:pointer;">Voir la collection →</a></p>';
    if (footer) footer.style.display = 'none';
    return;
  }

  var total = 0;
  var html = '';

  cart.forEach(function(item, i) {
    total += item.price;
    html += '<div class="cart-item">';
    html += '<span class="cart-item-name">' + item.name + '</span>';
    html += '<span class="cart-item-price">€ ' + item.price.toLocaleString('fr-FR') + '</span>';
    html += '<button class="cart-item-del" onclick="removeCart(' + i + ')" aria-label="Supprimer"><i class="ti ti-x"></i></button>';
    html += '</div>';
  });

  el.innerHTML = html;

  var totalEl = document.getElementById('cartTotal');
  if (totalEl) totalEl.textContent = '€ ' + total.toLocaleString('fr-FR');
  if (footer) footer.style.display = 'block';
}

function checkout() {
  cart = [];
  updateCartCount();
  renderCartItems();
  showToast('Commande confirmée ! Merci pour votre achat.');
  setTimeout(function() { goTo('home'); }, 1500);
}

// --------------------------------------------
// WISHLIST / COEUR
// --------------------------------------------
function toggleHeart(el) {
  el.classList.toggle('liked');
  if (el.classList.contains('liked')) {
    showToast('Ajouté à votre wishlist !');
  }
}

// --------------------------------------------
// FILTRES COLLECTION
// --------------------------------------------
function filterProd(btn, cat) {
  // Mettre à jour le bouton actif
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  // Afficher / cacher les produits
  document.querySelectorAll('#productGrid .prod').forEach(function(p) {
    if (cat === 'all' || p.dataset.cat === cat) {
      p.style.display = '';
    } else {
      p.style.display = 'none';
    }
  });
}

// --------------------------------------------
// FORMULAIRE CONTACT
// --------------------------------------------
function submitForm() {
  var fname  = document.getElementById('fname').value.trim();
  var femail = document.getElementById('femail').value.trim();
  var fmsg   = document.getElementById('fmsg').value.trim();

  if (!fname || !femail) {
    showToast('Veuillez remplir les champs obligatoires.');
    return;
  }

  if (!femail.includes('@')) {
    showToast('Adresse email invalide.');
    return;
  }

  // Afficher le message de succès
  var successEl = document.getElementById('formSuccess');
  if (successEl) successEl.style.display = 'block';

  // Vider le formulaire
  document.getElementById('fname').value  = '';
  document.getElementById('lname').value  = '';
  document.getElementById('femail').value = '';
  document.getElementById('fmsg').value   = '';

  showToast('Message envoyé avec succès !');
}

// --------------------------------------------
// TOAST NOTIFICATION
// --------------------------------------------
function showToast(msg) {
  var toast   = document.getElementById('toast');
  var toastMsg = document.getElementById('toastMsg');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = msg;
  toast.classList.add('show');

  setTimeout(function() {
    toast.classList.remove('show');
  }, 3000);
}

// --------------------------------------------
// EFFET SCROLL NAVBAR
// --------------------------------------------
window.addEventListener('scroll', function() {
  var nav = document.querySelector('nav');
  if (!nav) return;
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 2px 24px rgba(0,0,0,0.6)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// --------------------------------------------
// INIT
// --------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  updateCartCount();
});
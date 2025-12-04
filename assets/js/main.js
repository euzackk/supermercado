// Estado da aplicação
let currentStep = 1;
let cart = JSON.parse(localStorage.getItem('familia_cart')) || [];
let selectedZone = localStorage.getItem('familia_zone') || 'sul';
let deliveryFee = 0;
let customerData = JSON.parse(localStorage.getItem('familia_customer')) || {
    name: '',
    phone: '',
    address: '',
    complement: '',
    payment: 'PIX'
};

// Dados dos produtos
const products = [
    { id: 1, name: "Açúcar Mascavo Unão 1kg", price: 22.49, category: "alimentos", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Arroz Camil Tipo 1 5kg", price: 18.50, category: "alimentos", img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Feijão Carioca Brasileirinho 1kg", price: 4.50, category: "alimentos", img: "https://images.unsplash.com/photo-1516594798947-e595055e5725?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Farinha de Mandioca Soberano 1kg", price: 4.40, category: "alimentos", img: "https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Atum Gomes Ralado Natural 170g", price: 5.90, category: "carnes", img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 6, name: "Carne Mista Desfiar Target 320g", price: 8.68, category: "carnes", img: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 7, name: "Almôndegas ao Molho Target 420g", price: 8.70, category: "carnes", img: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 8, name: "Água Sanitária Limpax 1L", price: 3.99, category: "limpeza", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 9, name: "Sabão em Pó Omo Lavagem Perfeita 1,6kg", price: 28.90, category: "limpeza", img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 10, name: "Refrigerante Coca-Cola 2L", price: 8.50, category: "bebidas", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 11, name: "Cerveja Heineken Long Neck 330ml", price: 6.99, category: "bebidas", img: "https://images.unsplash.com/photo-1586993451381-8d687115c9c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 12, name: "Shampoo Anticaspa Clear 400ml", price: 24.99, category: "higiene", img: "https://images.unsplash.com/photo-1620916297392-9a5a6d09428a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 13, name: "Sabonete Líquido Palmolive 250ml", price: 7.90, category: "higiene", img: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 14, name: "Banana Prata (kg)", price: 7.99, category: "hortifruti", img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 15, name: "Tomate Italiano (kg)", price: 6.50, category: "hortifruti", img: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 16, name: "Leite Integral Tirol 1L", price: 4.99, category: "frios", img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 17, name: "Manteiga Aviação 200g", price: 12.90, category: "frios", img: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 18, name: "Queijo Mussarela Kg", price: 35.90, category: "frios", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 19, name: "Presunto Sadia Kg", price: 28.50, category: "frios", img: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" },
    { id: 20, name: "Desinfetante Veja 500ml", price: 6.99, category: "limpeza", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" }
];

// Elementos DOM
const floatingCart = document.getElementById('floating-cart');
const floatingCartToggle = document.getElementById('floating-cart-toggle');
const floatingCartClose = document.getElementById('floating-cart-close');
const floatingCartBody = document.getElementById('floating-cart-body');
const floatingCartTotal = document.getElementById('floating-cart-total');
const cartCountBadge = document.getElementById('cart-count-badge');
const checkoutButton = document.getElementById('checkout-button');
const clearCartBtn = document.getElementById('clear-cart-btn');
const productListSection = document.getElementById('product-list-section');
const checkoutSteps = document.getElementById('checkout-steps');
const notificationToast = document.getElementById('notification-toast');
const toastMessage = document.getElementById('toast-message');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const verProdutosBtn = document.getElementById('ver-produtos-btn');
const heroBanner = document.getElementById('hero-banner');

// Funções utilitárias
function showToast(message) {
    toastMessage.textContent = message;
    notificationToast.classList.add('show');
    setTimeout(() => {
        notificationToast.classList.remove('show');
    }, 3000);
}

function updateLocalStorage() {
    localStorage.setItem('familia_cart', JSON.stringify(cart));
    localStorage.setItem('familia_zone', selectedZone);
    localStorage.setItem('familia_customer', JSON.stringify(customerData));
}

function formatPrice(price) {
    return price.toFixed(2).replace('.', ',');
}

function calculateDeliveryFee(zone) {
    switch (zone) {
        case 'sul': return 8.00;
        case 'leste': return 12.00;
        case 'norte': return 15.00;
        default: return 0.00;
    }
}

// Funções do carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateFloatingCart();
    showToast(`${product.name} adicionado ao carrinho!`);
    updateLocalStorage();
}

function removeFromCart(productId) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex !== -1) {
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
        } else {
            cart.splice(itemIndex, 1);
        }
        
        updateFloatingCart();
        updateLocalStorage();
        showToast('Produto removido do carrinho');
    }
}

function clearCart() {
    if (cart.length === 0) return;
    
    if (confirm('Tem certeza que deseja limpar o carrinho?')) {
        cart = [];
        updateFloatingCart();
        updateLocalStorage();
        showToast('Carrinho limpo com sucesso.');
    }
}

function updateFloatingCart() {
    floatingCartBody.innerHTML = '';
    deliveryFee = calculateDeliveryFee(selectedZone);

    if (cart.length === 0) {
        floatingCartBody.innerHTML = '<p style="text-align: center; color: var(--gray); padding: 20px;">Carrinho vazio</p>';
        checkoutButton.disabled = true;
        checkoutButton.style.opacity = '0.6';
    } else {
        checkoutButton.disabled = false;
        checkoutButton.style.opacity = '1';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            const cartItemHTML = `
                <div class="floating-cart-item" data-id="${item.id}">
                    <div class="floating-cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="floating-cart-item-quantity">
                            <button class="quantity-btn minus" onclick="removeFromCart(${item.id})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus" onclick="addToCart(${item.id})">+</button>
                        </div>
                    </div>
                    <div class="floating-cart-item-price">R$ ${formatPrice(itemTotal)}</div>
                </div>
            `;
            floatingCartBody.innerHTML += cartItemHTML;
        });
    }
    
    // Calcular total
    let subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let total = subtotal + deliveryFee;

    if (subtotal > 0) {
        const deliveryFeeHTML = `
            <div class="floating-cart-item">
                <div class="floating-cart-item-info">
                    <h4>Taxa de Entrega (${selectedZone.toUpperCase()})</h4>
                </div>
                <div class="floating-cart-item-price">R$ ${formatPrice(deliveryFee)}</div>
            </div>
        `;
        floatingCartBody.innerHTML += deliveryFeeHTML;
    }

    floatingCartTotal.textContent = `R$ ${formatPrice(total)}`;
    
    // Atualizar badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountBadge.textContent = totalItems;
    
    // Atualizar botão de limpar carrinho
    clearCartBtn.disabled = cart.length === 0;
}

// Funções de renderização
function renderProducts() {
    const categories = {};
    
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });

    productListSection.innerHTML = '';
    
    Object.keys(categories).forEach(category => {
        const categoryName = category === 'alimentos' ? 'Alimentos Básicos' :
                           category === 'frios' ? 'Frios e Laticínios' :
                           category === 'limpeza' ? 'Limpeza' :
                           category === 'bebidas' ? 'Bebidas' :
                           category === 'higiene' ? 'Higiene Pessoal' :
                           category === 'hortifruti' ? 'Hortifrúti' :
                           category === 'carnes' ? 'Carnes e Enlatados' : category;
        
        const iconClass = category === 'alimentos' ? 'fas fa-bread-slice' :
                         category === 'frios' ? 'fas fa-cheese' :
                         category === 'limpeza' ? 'fas fa-spray-can' :
                         category === 'bebidas' ? 'fas fa-beer' :
                         category === 'higiene' ? 'fas fa-soap' :
                         category === 'hortifruti' ? 'fas fa-apple-alt' :
                         category === 'carnes' ? 'fas fa-drumstick-bite' : 'fas fa-box';
        
        const categoryHTML = `
            <div class="product-category" id="${category}">
                <div class="category-header">
                    <i class="${iconClass}"></i>
                    <h2>${categoryName}</h2>
                </div>
                <div class="product-grid-v2" id="grid-${category}">
                    ${categories[category].map(product => `
                        <div class="product-card-v2">
                            <div class="product-image-v2">
                                <img src="${product.img}" alt="${product.name}" loading="lazy">
                            </div>
                            <h3>${product.name}</h3>
                            <div class="product-price">
                                R$ ${formatPrice(product.price)}<small> / uni</small>
                            </div>
                            <button class="add-to-cart-v2" onclick="addToCart(${product.id})">
                                <i class="fas fa-cart-plus"></i> Adicionar
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        productListSection.innerHTML += categoryHTML;
    });
}

// Função de pesquisa
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        renderProducts();
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.category.toLowerCase().includes(searchTerm)
    );
    
    productListSection.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productListSection.innerHTML = `
            <div class="product-category" style="text-align: center; padding: 50px 20px;">
                <i class="fas fa-search" style="font-size: 3rem; color: var(--gray); margin-bottom: 20px;"></i>
                <h3>Nenhum produto encontrado</h3>
                <p>Tente buscar por outro termo</p>
                <button class="btn-primary-v2" onclick="clearSearch()" style="margin-top: 15px;">
                    Limpar Busca
                </button>
            </div>
        `;
        return;
    }
    
    const categoryHTML = `
        <div class="product-category" id="search-results">
            <div class="category-header">
                <i class="fas fa-search"></i>
                <h2>Resultados da Busca</h2>
            </div>
            <div class="product-grid-v2">
                ${filteredProducts.map(product => `
                    <div class="product-card-v2">
                        <div class="product-image-v2">
                            <img src="${product.img}" alt="${product.name}" loading="lazy">
                        </div>
                        <h3>${product.name}</h3>
                        <div class="product-price">
                            R$ ${formatPrice(product.price)}<small> / uni</small>
                        </div>
                        <button class="add-to-cart-v2" onclick="addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i> Adicionar
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    productListSection.innerHTML = categoryHTML;
}

function clearSearch() {
    searchInput.value = '';
    renderProducts();
}

// Funções do checkout
function renderStep1() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee;
    
    checkoutSteps.innerHTML = `
        <div class="step-header">
            <h2>Passo 1: Seleção de Zona</h2>
            <div class="step-navigation">
                <button onclick="changeStep(2)" ${cart.length === 0 ? 'disabled' : ''} class="btn-next">
                    Próximo <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        <div class="step-content">
            <h3>Selecione sua Zona de Entrega:</h3>
            <div class="zone-selector">
                <div class="zone-option ${selectedZone === 'sul' ? 'selected' : ''}" data-zone="sul">
                    Zona Sul (R$ ${formatPrice(calculateDeliveryFee('sul'))})
                </div>
                <div class="zone-option ${selectedZone === 'leste' ? 'selected' : ''}" data-zone="leste">
                    Zona Leste (R$ ${formatPrice(calculateDeliveryFee('leste'))})
                </div>
                <div class="zone-option ${selectedZone === 'norte' ? 'selected' : ''}" data-zone="norte">
                    Zona Norte (R$ ${formatPrice(calculateDeliveryFee('norte'))})
                </div>
            </div>

            <h3 style="margin-top: 30px;">Resumo do Carrinho:</h3>
            <div class="cart-summary-step1">
                <span>Subtotal: <span>R$ ${formatPrice(subtotal)}</span></span>
                <span>Taxa de Entrega: <span>R$ ${formatPrice(deliveryFee)}</span></span>
                <span>Total: <span>R$ ${formatPrice(total)}</span></span>
            </div>
            
            <p style="margin-top: 20px; text-align: center;">
                <button onclick="closeCheckout(true)" class="btn-primary-v2" style="background: transparent; color: var(--primary); border: 2px solid var(--primary);">
                    <i class="fas fa-edit"></i> Editar Produtos
                </button>
            </p>
        </div>
    `;

    document.querySelectorAll('.zone-option').forEach(zoneDiv => {
        zoneDiv.addEventListener('click', () => {
            document.querySelectorAll('.zone-option').forEach(el => el.classList.remove('selected'));
            zoneDiv.classList.add('selected');
            selectedZone = zoneDiv.dataset.zone;
            updateFloatingCart();
            renderStep1();
            updateLocalStorage();
        });
    });
}

function renderStep2() {
    checkoutSteps.innerHTML = `
        <div class="step-header">
            <h2>Passo 2: Dados e Pagamento</h2>
            <div class="step-navigation">
                <button onclick="changeStep(1)" class="btn-prev">
                    <i class="fas fa-arrow-left"></i> Anterior
                </button>
                <button onclick="changeStep(3)" class="btn-next">
                    Próximo <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
        <div class="step-content">
            <form id="customer-form">
                <h3>Dados de Contato</h3>
                <div class="form-group">
                    <label for="name">Nome Completo *</label>
                    <input type="text" id="name" name="name" value="${customerData.name}" required placeholder="Seu nome completo">
                </div>
                <div class="form-group">
                    <label for="phone">Telefone (WhatsApp) *</label>
                    <input type="tel" id="phone" name="phone" value="${customerData.phone}" required placeholder="(69) 99255-7719">
                </div>
                <div class="form-group">
                    <label for="address">Endereço de Entrega *</label>
                    <input type="text" id="address" name="address" value="${customerData.address}" required placeholder="Rua, Número, Bairro">
                </div>
                <div class="form-group">
                    <label for="complement">Complemento (Opcional)</label>
                    <input type="text" id="complement" name="complement" value="${customerData.complement}" placeholder="Apartamento, Bloco, Referência">
                </div>

                <h3>Forma de Pagamento *</h3>
                <div class="payment-options">
                    <div>
                        <input type="radio" id="pix" name="payment" value="PIX" ${customerData.payment === 'PIX' ? 'checked' : ''} required>
                        <label for="pix"><i class="fas fa-qrcode"></i> PIX (Recomendado)</label>
                    </div>
                    <div>
                        <input type="radio" id="debito" name="payment" value="Cartão de Débito" ${customerData.payment === 'Cartão de Débito' ? 'checked' : ''}>
                        <label for="debito"><i class="fas fa-credit-card"></i> Cartão de Débito</label>
                    </div>
                    <div>
                        <input type="radio" id="credito" name="payment" value="Cartão de Crédito" ${customerData.payment === 'Cartão de Crédito' ? 'checked' : ''}>
                        <label for="credito"><i class="fas fa-credit-card"></i> Cartão de Crédito</label>
                    </div>
                    <div>
                        <input type="radio" id="ticket" name="payment" value="Ticket Alimentação" ${customerData.payment === 'Ticket Alimentação' ? 'checked' : ''}>
                        <label for="ticket"><i class="fas fa-ticket-alt"></i> Ticket Alimentação</label>
                    </div>
                </div>
                
                <p style="margin-top: 20px; font-size: 0.9rem; color: var(--gray);">
                    <i class="fas fa-info-circle"></i> Campos marcados com * são obrigatórios
                </p>
            </form>
        </div>
    `;
    
    const form = document.getElementById('customer-form');
    if (form) {
        form.addEventListener('input', (e) => {
            if (e.target.name) {
                customerData[e.target.name] = e.target.value;
                updateLocalStorage();
            }
        });
        
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                customerData.payment = e.target.value;
                updateLocalStorage();
            });
        });
    }
}

function renderStep3() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + deliveryFee;

    const itemsList = cart.map(item => 
        `• ${item.name} - ${item.quantity}x = R$ ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const whatsappMessage = `*NOVO PEDIDO - SUPERMERCADO FAMÍLIA*\n\n` +
        `*CLIENTE:* ${customerData.name}\n` +
        `*TELEFONE:* ${customerData.phone}\n` +
        `*ENDEREÇO:* ${customerData.address}\n` +
        `*COMPLEMENTO:* ${customerData.complement || 'Nenhum'}\n` +
        `*ZONA:* ${selectedZone.toUpperCase()}\n\n` +
        `*ITENS DO PEDIDO:*\n${itemsList}\n\n` +
        `*RESUMO DO VALOR:*\n` +
        `Subtotal: R$ ${formatPrice(subtotal)}\n` +
        `Taxa de Entrega: R$ ${formatPrice(deliveryFee)}\n` +
        `*TOTAL: R$ ${formatPrice(total)}*\n\n` +
        `*FORMA DE PAGAMENTO:* ${customerData.payment}\n\n` +
        `*OBSERVAÇÕES:* Pedido realizado via site.`;

    const whatsappNumber = "556992557719";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    checkoutSteps.innerHTML = `
        <div class="step-header">
            <h2>Passo 3: Revisar Pedido</h2>
            <div class="step-navigation">
                <button onclick="changeStep(2)" class="btn-prev">
                    <i class="fas fa-arrow-left"></i> Anterior
                </button>
            </div>
        </div>
        <div class="step-content">
            <div class="review-section">
                <div class="review-info">
                    <h4><i class="fas fa-user"></i> Seus Dados</h4>
                    <div class="info-grid">
                        <div>
                            <strong>Nome:</strong>
                            <span>${customerData.name}</span>
                        </div>
                        <div>
                            <strong>Telefone:</strong>
                            <span>${customerData.phone}</span>
                        </div>
                        <div>
                            <strong>Endereço:</strong>
                            <span>${customerData.address}</span>
                        </div>
                        <div>
                            <strong>Complemento:</strong>
                            <span>${customerData.complement || 'Não informado'}</span>
                        </div>
                        <div>
                            <strong>Zona:</strong>
                            <span>${selectedZone.toUpperCase()}</span>
                        </div>
                        <div>
                            <strong>Pagamento:</strong>
                            <span>${customerData.payment}</span>
                        </div>
                    </div>
                </div>
                
                <div class="review-info">
                    <h4><i class="fas fa-shopping-cart"></i> Resumo do Pedido</h4>
                    <div class="cart-summary-review">
                        <div class="summary-item">
                            <span>Subtotal:</span>
                            <span>R$ ${formatPrice(subtotal)}</span>
                        </div>
                        <div class="summary-item">
                            <span>Entrega:</span>
                            <span>R$ ${formatPrice(deliveryFee)}</span>
                        </div>
                        <div class="summary-item total">
                            <span>Total:</span>
                            <span>R$ ${formatPrice(total)}</span>
                        </div>
                    </div>
                </div>
                
                <a href="${whatsappLink}" target="_blank" class="btn-whatsapp" onclick="completeOrder()">
                    <i class="fab fa-whatsapp"></i> Finalizar no WhatsApp
                </a>
                
                <p style="text-align: center; color: var(--gray); font-size: 0.9rem; margin-top: 15px;">
                    <i class="fas fa-info-circle"></i> Ao clicar, você será direcionado para nosso WhatsApp.
                </p>
            </div>
        </div>
    `;
}

function completeOrder() {
    setTimeout(() => {
        cart = [];
        updateFloatingCart();
        updateLocalStorage();
        closeCheckout(false);
        showToast('Pedido enviado com sucesso! Aguarde nosso contato.');
    }, 1000);
}

function changeStep(step) {
    if (step === 2 && cart.length === 0) {
        showToast('Adicione produtos ao carrinho antes de prosseguir.');
        return;
    }
    
    if (step === 3) {
        const name = document.getElementById('name');
        const phone = document.getElementById('phone');
        const address = document.getElementById('address');
        const payment = document.querySelector('input[name="payment"]:checked');
        
        let isValid = true;
        
        if (!name || !name.value.trim()) {
            isValid = false;
            name.style.borderColor = 'var(--danger)';
        } else {
            name.style.borderColor = '';
        }
        
        if (!phone || !phone.value.trim()) {
            isValid = false;
            phone.style.borderColor = 'var(--danger)';
        } else {
            phone.style.borderColor = '';
        }
        
        if (!address || !address.value.trim()) {
            isValid = false;
            address.style.borderColor = 'var(--danger)';
        } else {
            address.style.borderColor = '';
        }
        
        if (!payment) {
            isValid = false;
            showToast('Selecione uma forma de pagamento.');
        }
        
        if (!isValid) {
            showToast('Preencha todos os campos obrigatórios.');
            return;
        }
        
        customerData.name = name.value;
        customerData.phone = phone.value;
        customerData.address = address.value;
        customerData.complement = document.getElementById('complement') ? document.getElementById('complement').value : '';
        customerData.payment = payment.value;
        updateLocalStorage();
    }

    currentStep = step;
    switch (currentStep) {
        case 1: renderStep1(); break;
        case 2: renderStep2(); break;
        case 3: renderStep3(); break;
        default: renderStep1();
    }
}

// MODIFICAÇÃO: openCheckout agora também esconde o hero banner
function openCheckout() {
    productListSection.style.display = 'none';
    if (heroBanner) {
        heroBanner.style.display = 'none';
    }
    checkoutSteps.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renderStep1();
}

// MODIFICAÇÃO: closeCheckout agora também mostra o hero banner novamente
function closeCheckout(showProducts) {
    if (showProducts) {
        productListSection.style.display = 'block';
        if (heroBanner) {
            heroBanner.style.display = '';
        }
        window.scrollTo({ top: productListSection.offsetTop - 100, behavior: 'smooth' });
    }
    checkoutSteps.classList.remove('active');
    floatingCart.classList.remove('open');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateFloatingCart();
    
    deliveryFee = calculateDeliveryFee(selectedZone);
    
    // Fechar carrinho ao clicar fora
    document.addEventListener('click', (e) => {
        if (floatingCart.classList.contains('open') &&
            !floatingCart.contains(e.target) &&
            !floatingCartToggle.contains(e.target)) {
            floatingCart.classList.remove('open');
        }
    });
});

if (floatingCartToggle) {
    floatingCartToggle.addEventListener('click', () => {
        floatingCart.classList.toggle('open');
    });
}

if (floatingCartClose) {
    floatingCartClose.addEventListener('click', () => {
        floatingCart.classList.remove('open');
    });
}

if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
        if (cart.length === 0) {
            showToast('Adicione produtos ao carrinho antes de finalizar!');
            return;
        }
        floatingCart.classList.remove('open');
        openCheckout();
    });
}

if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
}

if (searchButton) {
    searchButton.addEventListener('click', searchProducts);
}

if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchProducts();
        }
    });
}

if (verProdutosBtn) {
    verProdutosBtn.addEventListener('click', () => {
        document.querySelector('.product-list-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
}

// Expor funções globalmente
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.clearSearch = clearSearch;
window.searchProducts = searchProducts;
window.changeStep = changeStep;
window.openCheckout = openCheckout;
window.closeCheckout = closeCheckout;
window.completeOrder = completeOrder;

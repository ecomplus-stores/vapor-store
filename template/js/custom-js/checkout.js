import ecomCart from '@ecomplus/shopping-cart'

var lessUnit = document.getElementById('lessUnit')
var firstphrase = document.getElementById('lessSome')
var lastphrase = document.getElementById('noMore')
var lessQuantity = 250
lessUnit.innerHTML = window.ecomUtils.formatMoney(lessQuantity, 'BRL', 'pt_br')
ecomCart.on('change', ({ data }) => {
  var cartCalc = document.querySelectorAll('#cart')
  if (cartCalc.length) {
    document.getElementById('containerCalc').style.display = 'block'
    var checkoutButton = document.querySelector('.cart__btn-checkout')
    var percentBar
    var countQuantity = data.subtotal
    var evalQuantity = lessQuantity - countQuantity
    if (evalQuantity > 0) {
      lessUnit.innerHTML = window.ecomUtils.formatMoney(evalQuantity, 'BRL', 'pt_br')
      percentBar = Math.round(countQuantity / lessQuantity * 100) + '%'
      document.getElementById('lastUnitsBar').style.width = percentBar
      document.getElementById('percentBar').innerHTML = percentBar
      firstphrase.style.display = 'block'
      lastphrase.style.display = 'none'
      checkoutButton.style.display = 'none'
    } else {
      percentBar = '100%'
      checkoutButton.style.display = 'block'
      firstphrase.style.display = 'none'
      lastphrase.style.display = 'block'
      document.getElementById('lastUnitsBar').style.width = percentBar
      document.getElementById('percentBar').innerHTML = percentBar
    }
  } else {
    document.getElementById('containerCalc').style.display = 'none'
  }
})
const router1 = window.storefrontApp && window.storefrontApp.router
let isMinSubtotalAlert = false
setInterval(function () {
  if (router1) {
    const emitCheckout1 = (name) => {
      var countQuantity = ecomCart.data.subtotal
      if (countQuantity < lessQuantity) {
        window.location.href = '/app/#/cart'
        if (!isMinSubtotalAlert) {
          window.alert(`Valor mínimo de pedido é R$${lessQuantity}, insira mais itens`)
          isMinSubtotalAlert = true
        }
        window.location.reload()
      }
    }
    const addRoute1ToData = ({ name }) => {
      if (name === 'checkout') {
        emitCheckout1(name)
      }
    }
    if (router1.currentRoute) {
      addRoute1ToData(router1.currentRoute)
    }
    router1.afterEach(addRoute1ToData)
  }
}, 300)

storefront.on('widget:@ecomplus/widget-tag-manager', function () {
  document.querySelector('.cart__btn-checkout').insertAdjacentHTML('beforebegin', `
    <div id="block-confirm" class="form-group"><div class="custom-control custom-checkbox"><input type="checkbox" id="input-confirm-checkout" class="custom-control-input"> <label for="input-confirm-checkout" class="custom-control-label">
      Eu li e aceito a
      <a href="/pages/termos" target="_blank">Termos de Uso</a> para continuar comprando
    </label></div></div>
  `);
  document.querySelector('#block-confirm').addEventListener('click', (e) => {
    if (e.target.checked) {
      document.querySelector('#block-confirm').style.display = 'none'
      document.querySelector('.cart__btn-checkout').style.display = 'block'
    }
  })
})

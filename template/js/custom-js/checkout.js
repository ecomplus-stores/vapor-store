// Add your custom JavaScript for checkout here.
storefront.on('widget:@ecomplus/widget-tag-manager', function () {
    document.querySelector('.cart__btn-checkout').insertAdjacentHTML('beforebegin', `
    <div id="block-confirm" class="form-group"><div class="custom-control custom-checkbox"><input type="checkbox" id="input-confirm-checkout" class="custom-control-input"> <label for="input-confirm-checkout" class="custom-control-label">
          Eu li e aceito
          a
          <a href="/pages/termos-de-uso" target="_blank">Termos de Uso</a> para continuar comprando
        </label></div></div>
    `);
    document.querySelector('#block-confirm').addEventListener('click', (e) => {
        if (e.target.checked) {
            document.querySelector('#block-confirm').style.display = 'none'
            document.querySelector('.cart__btn-checkout').style.display = 'block'
        }
    })
})

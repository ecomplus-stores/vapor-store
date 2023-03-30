// Add your custom JavaScript for storefront pages here.
setTimeout(() => {
    document.getElementById('closeModal').addEventListener('click', () => sessionStorage.setItem('modal', 'close'))
    if (!sessionStorage.getItem('modal')) {
        $('#exampleModalLong').modal('show')
    }
}, 1200)
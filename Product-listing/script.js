const buttons = document.querySelectorAll('.add-btn');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.innerText = 'Added';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-success');
    alert('Item added to cart');
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const itemsList = document.getElementById('itemsList');
    const addItemForm = document.getElementById('addItemForm');
  
    let shoppingList = [];
  
    // Cargar lista de compras desde el localStorage
    if (localStorage.getItem('shoppingList')) {
      shoppingList = JSON.parse(localStorage.getItem('shoppingList'));
      renderItems();
    }
  
    // Agregar evento de envío del formulario
    addItemForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const itemName = document.getElementById('itemName').value;
      const itemQuantity = document.getElementById('itemQuantity').value;
  
      addItem(itemName, itemQuantity);
      addItemForm.reset();
    });
  
    // Agregar evento de clic a los botones de eliminar
    itemsList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-button')) {
        const itemId = event.target.getAttribute('data-id');
        deleteItem(itemId);
      }
    });
  
    // Función para agregar un ítem a la lista de compras
    function addItem(name, quantity) {
      const item = {
        id: Date.now().toString(),
        name: name,
        quantity: quantity
      };
  
      shoppingList.push(item);
      saveList();
      renderItems();
    }
  
    // Función para eliminar un ítem de la lista de compras
    function deleteItem(itemId) {
      shoppingList = shoppingList.filter(item => item.id !== itemId);
      saveList();
      renderItems();
    }
  
    // Función para guardar la lista de compras en el localStorage
    function saveList() {
      localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
    }
  
    // Función para renderizar los ítems en la lista de compras
    function renderItems() {
      itemsList.innerHTML = '';
  
      for (const item of shoppingList) {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity}`;
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.setAttribute('data-id', item.id);
        
        li.appendChild(deleteButton);
        itemsList.appendChild(li);
      }
    }
  });
  
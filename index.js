document.addEventListener('DOMContentLoaded', function () {
  const itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
  let items = itemsArray;
  const list = document.querySelector('.list');
  const button = document.getElementById('myBtn');
  const check = document.getElementsByClassName('checkBox');
  const deleteAllBtn = document.querySelector('.deleteAll');

  if(items.length < 1){
    deleteAllBtn.style.display = 'none';
  }else{
    deleteAllBtn.style.display = 'inline-block';
  }

  deleteAllBtn.addEventListener('click' , function(){
    localStorage.removeItem('items');
    location.reload();
  });

  function addElement(e){
    let title = document.getElementById('title').value;
    let desc = document.getElementById('desc').value;
    document.querySelectorAll('#title ,  #desc').forEach(el => el.value = '');

    if (title === '') {
      alert('Make sure to fill the first input');
    } else {
      if (desc === '') {
        document.querySelector('#title').value = '';
      } else {
        const node = document.querySelectorAll('.form input');  //vider input !apres  qu'on a  stocke les valeurs 
        node.forEach((item) => item.value = '');
      }
      
      title = title.replace(/<\/?[^>]+(>|$)/g, '');  //prevent user from typing html and js
    desc = desc.replace(/<\/?[^>]+(>|$)/g, '');
      const task = { title, desc };
      items.unshift(task);
      localStorage.setItem('items', JSON.stringify(items));
      fillList();

    }
  };
  

  button.addEventListener('click', function(e){ addElement(e)} );
  button.addEventListener('keypress', function(e){ 
    if(e.code === 'Enter'){
      addElement(e)
    }
    
  });
  

  function fillList() {
    list.innerHTML = '';
   
    items.map((task, index) => {
      const item = document.createElement('div');
      item.innerHTML = `
        <div class="list-item-container" data-index='${index}'>
          <input type="checkbox" name="" class='checkBox' data-index='${index}'/>
          <svg  class="delete-btn" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<path fill="#f8738c" d="M34,12l-6-6h-8l-6,6h-3v28c0,2.2,1.8,4,4,4h18c2.2,0,4-1.8,4-4V12H34z"></path><path fill="#ff5072" d="M24.5 39h-1c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v19C26 38.3 25.3 39 24.5 39zM31.5 39L31.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C33 38.3 32.3 39 31.5 39zM16.5 39L16.5 39c-.8 0-1.5-.7-1.5-1.5v-19c0-.8.7-1.5 1.5-1.5l0 0c.8 0 1.5.7 1.5 1.5v19C18 38.3 17.3 39 16.5 39z"></path><path fill="#ffaebd" d="M11,8h26c1.1,0,2,0.9,2,2v2H9v-2C9,8.9,9.9,8,11,8z"></path>
</svg>
          <div class="list-item">

            <h3>${task.title} ${task.desc ? `<button type="button"  data-index="${index}" class="desc-btn"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6" data-index="${index}" >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5" />
          </svg></button>   ` : ''}</h3 >
            ${task.desc ? `<p data-index="${index}" class='desc-para'>${task.desc}</p>` : ''}
           
          </div>
        </div>`;
      list.appendChild(item);
      
      if(list.childElementCount > 0){
        deleteAllBtn.style.display = 'flex';   
      }
    });

    Array.from(check).forEach(function (checkbox) {
      checkbox.addEventListener('click', function (e) {
        const index = e.target.getAttribute('data-index');
        const container = document.querySelectorAll('.list-item-container');
        container.forEach(function (item) {
          if (item.getAttribute('data-index') === index) {
            item.classList.toggle('checked');
          }
        });
      });
    });

    selectSVGs();
    addDeleteListeners();  // Add event listeners for delete buttons
  }

  function selectSVGs() {
    const descBtn = document.querySelectorAll('.desc-btn svg');

    Array.from(descBtn).forEach(function (descButton) {
      descButton.addEventListener('click', function (e) {
        const index = e.target.getAttribute('data-index');
        const desc = document.querySelectorAll('.desc-para');
        desc.forEach((item) => {
          if (item.getAttribute('data-index') === index) {
            item.classList.toggle('desc-activated');
          }
        });
      });
    });
  }

  function addDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function (e) {
        const index = e.target.getAttribute('data-index');
        items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(items));
        fillList();
        location.reload(); // so the delete All disepear if no item is there
      });
    });
  }

  window.onload = function () {
    let date = new Date();
    date = date.toString().split(' ');
    document.getElementById('date').innerHTML = date[1] + " " + date[2] + " " + date[3];
    fillList();
  }
});

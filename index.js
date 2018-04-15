window.onload = function () {


  var data = {};
  var toCheckInputFields = function(){
		var bookName = document.getElementById('bookName');
		var bookAutor = document.getElementById('bookAutor');
		var bookYear = document.getElementById('bookYear');
		var bookPicture = document.getElementById('bookPicture');
		var bookNam = document.getElementById('bookNam');
  		if(bookName.value!==''){data.bookName=bookName.value}else{
  			var newP = document.createElement('p');
  				newP.innerHTML = 'Введите название книги!';
  				bookName.parentNode.insertBefore(newP, bookName.nextSibling);
  				return false;
  			};
		data.bookNam=bookNam.value;
  		if(bookAutor.value!==''){data.bookAutor=bookAutor.value}else{
  			var newP = document.createElement('p');
  				newP.innerHTML = 'Введите автора книги!';
  				bookAutor.parentNode.insertBefore(newP, bookAutor.nextSibling);
  				return false;
  			};
		if(bookYear.value==''){
			var newP = document.createElement('p');
				newP.innerHTML = 'Введите год издания книги!';
				bookYear.parentNode.insertBefore(newP, bookYear.nextSibling);
				return false;
			}else if(isNaN(bookYear.value)&&( parseInt( bookYear.value ) != bookYear.value )){
			var newP = document.createElement('p');
				newP.innerHTML = 'Должно быть целое число без любых букв!';
				bookYear.parentNode.insertBefore(newP, bookYear.nextSibling);
				return false;
			}else if(bookYear.value>2017/*(new Date()).getFullYear()*/){
				var newP = document.createElement('p');
				newP.innerHTML = 'Год издания книги не может превышать 2017 год!';
				bookYear.parentNode.insertBefore(newP, bookYear.nextSibling);
				return false;
			}else if(bookYear.value<1900){
				var newP = document.createElement('p');
				newP.innerHTML = 'Очень старая книга!';
				bookYear.parentNode.insertBefore(newP, bookYear.nextSibling);
				return false;
			}else{data.bookYear=bookYear.value};
		if(bookPicture.value!==''){data.bookPicture=bookPicture.value}else{
			var newP = document.createElement('p');
				newP.innerHTML = 'Введите URL книги!';
				bookPicture.parentNode.insertBefore(newP, bookPicture.nextSibling);
				return false;
			};
		return data;
  };
	var newBookToAddToShelf = function(data){
		if((data.bookName.value!=='')&&(data.bookAutor.value!=='')&&(data.bookYear.value!=='')&&(data.bookPicture.value!=='')){
		if(data.bookNam){
  			var nam = data.bookNam;
  			var tBody = document.getElementById('booklist__tbody');
  			var elementToEdit = tBody.children[nam];
  			elementToEdit.remove();
  			var newTr = document.createElement('tr');
  			newTr.classList.add("booklist__item");
			newTr.innerHTML = '<td class="booklist__item--photo"><img src="' + data.bookPicture + '" alt="' + data.bookName + '" width="60px" height="100px"/>     </td><td class="booklist__item--description"><div class="book__description"><h6 class="book__description-name">' + data.bookName + '</h6><p class="book__description-autor">' + data.bookAutor + " " + '</p><p class="book__description-year">' + data.bookYear +' г.</p></div></td><td class="booklist__item--button-block"><div class="booklist__item--buttons"><button data-action="edit" class="booklist__button button--edit-book">Редактировать</button><button data-action="delete" class="booklist__button button--del-book">Удалить</button></div></td>';
  			tBody.appendChild(newTr);
  			data.bookName = null;data.bookAutor = null;data.bookYear = null;data.bookPicture = null;data = null;
  			putIdButton();
			toCloseForm();

		    }else{
      		var table = document.getElementById('booklist__tbody');
      		var newTr = document.createElement('tr');
      		newTr.classList.add("booklist__item");
			newTr.innerHTML = '<td class="booklist__item--photo"><img src="' + data.bookPicture + '" alt="' + data.bookName + '" width="60px" height="100px"/>     </td><td class="booklist__item--description"><div class="book__description"><h6 class="book__description-name">' + data.bookName + '</h6><p class="book__description-autor">' + data.bookAutor + " " + '</p><p class="book__description-year">' + data.bookYear +' г.</p></div></td><td class="booklist__item--button-block"><div class="booklist__item--buttons"><button data-action="edit" class="booklist__button button--edit-book">Редактировать</button><button data-action="delete" class="booklist__button button--del-book">Удалить</button></div></td>';
      		table.appendChild(newTr);
      		data.bookName = null;data.bookAutor = null;data.bookYear = null;data.bookPicture = null;data = null;
      		putIdButton();
			toCloseForm();
		    }
		 }
	}

	var deleteItem = function(selectedId){
  		var tBody = document.getElementById('booklist__tbody');
  		var elementToDel = tBody.children[selectedId];
  		elementToDel.remove();
  		putIdButton();
	}

	var takeEditData = function(selectedId){
  		var tBody = document.getElementById('booklist__tbody');
  		var elementToEdit = tBody.children[selectedId];
  		var bookPicture = elementToEdit.querySelector('.booklist__item--photo').firstElementChild.src;
  		bookPicture = bookPicture.trim();
  		var bookName = elementToEdit.querySelector('.book__description-name').innerHTML;
  		bookName = bookName.trim();
  		var bookAutor = elementToEdit.querySelector('.book__description-autor').innerHTML;
  		bookAutor = bookAutor.trim();
  		var bookYear = elementToEdit.querySelector('.book__description-year').innerHTML;
  		bookYear = bookYear.trim();
  		var bookNam = selectedId;
  		bookNam = bookNam.trim();
  		editData(bookNam,bookPicture,bookName,bookAutor,bookYear);
  		putIdButton();
	}
	var editData = function(selectedId,bookPicture,bookName,bookAutor,bookYear){
		toClearInputFields();
		toOpenForm();
    	var editForm = document.getElementById('add-book');
    	editForm.querySelector('#bookName').value=bookName;
    	editForm.querySelector('#bookAutor').value=bookAutor;
    	editForm.querySelector('#bookYear').value=bookYear;
    	editForm.querySelector('#bookPicture').value=bookPicture;
    	editForm.querySelector('#bookNam').value=selectedId;
    	putIdButton();
	};

	var putIdButton = function(){
			var buttons = document.querySelectorAll(".booklist__item--buttons");
			for(var i=0; i<buttons.length;i++){
				      buttons[i].id = [i];
		          }
	};

	function Menu(elem) {
    this.delete = function(butId) {deleteItem(butId);};
    this.edit = function(butId) {takeEditData(butId);};
    var self = this;
    elem.onclick = function(e) {
      var target = e.target;
      var action = target.getAttribute('data-action');
	    var butId = target.parentNode.id;
      if (action) {
        self[action](butId);
      }
    };
  }

  new Menu(booklist__tbody);
	putIdButton();
	document.getElementById('button__adding-form--open1').onclick = function() {
	toClearInputFields();
	toOpenForm();
	}
	document.getElementById('button__adding-form--open2').onclick = function() {
	toClearInputFields();
	toOpenForm();
	}
	document.getElementById('button--close').onclick = function() {
	toClearInputFields();
	toCloseForm();
	}
	document.getElementById('button--save').onclick = function() {
	toCheckInputFields();
	newBookToAddToShelf(data);
  	putIdButton();
	}

	var toClearInputFields = function () { //
		var Inputs = document.getElementsByClassName("add-book__input");
		for (var i = 0; i < Inputs.length; i++) {
			if (Inputs[i].type == 'text') { Inputs[i].value = ''; }
		};
	};
	var toOpenForm = function () {
		document.getElementById('add-book--background').classList.remove("visible--disable");
		document.getElementById('add-book').classList.remove("visible--disable");
	};
	var toCloseForm = function () {
		document.getElementById('add-book--background').classList.add("visible--disable");
		document.getElementById('add-book').classList.add("visible--disable");
	};
}
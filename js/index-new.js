{
	function tab2(el) {
		var menu=el.parentNode;
		var tabs=menu.getElementsByTagName('li');
		for (var i=0; i<tabs.length; i++) {
				var tab=tabs[i];
				var content=document.getElementById(tab.id+'_content');
				// Сделать вкладку активной
				if (tab.id==el.id) {
						tab.className='tab__active';
						if (content) {
								content.className='tab__content visible';
						}
						window.location.hash = tab.id;
						// history.replaceState(null, null, '#' + tab.id);
				}
				else {
						tab.className='';
						if (content) {
								content.className='tab__content';
						}
				}
		}
	}

    function activateTabFromHash() {
        var hash = window.location.hash.substring(1);
        if (hash) {
            var tabElement = document.getElementById(hash);
            if (tabElement && tabElement.onclick) {
                tabElement.onclick();
            }
        }
    }

    // Вызываем функцию при загрузке страницы
    window.addEventListener('DOMContentLoaded', activateTabFromHash);
    // Также вызываем при изменении хэша (если пользователь меняет его вручную)
    window.addEventListener('hashchange', activateTabFromHash);
}
(function (){
    const toasterRoot = document.querySelector('div.toaster-root');
    const toasterClose = ()=>{
        toasterRoot.style.display = "none";
    }
    let timerId ;
    
    toasterRoot.onclick = toasterClose
    
    window.ToastShow = (text)=>{
        clearTimeout(timerId)
        toasterRoot.classList.remove('success')
        toasterRoot.style.display = "block";
        toasterRoot.querySelector('div.toaster-text').innerText = text;
        timerId = setTimeout(toasterClose,5000);        
    }
    
    window.ToastSuccessShow = (text)=>{
         window.ToastShow(text)
         toasterRoot.classList.add('success')
    }
    
})()

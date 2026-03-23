
document.addEventListener("DOMContentLoaded", function(){
    (function (){
        const formBind = document.querySelector('form#registration');
        formBind.onsubmit = (ev) =>{
            ev.preventDefault()

        }
        const errorClass="error-message"
        const errorInput="is-invalid"

        const fioElement = formBind.querySelector('input[name=name]')
        const emailElement = formBind.querySelector('input[name=email]')
        const fieldPhone = formBind.querySelector('input[name=phone]');
        const fieldAgree = formBind.querySelector('input[name=agree]');
        //const fieldCaptcha = formBind.querySelector('input[name=captcha]');

        const fieldPromo = formBind.querySelector('input[name=promo]');


        const item = document.querySelector('.registr__item--no-visible');


        fioElement.onchange=()=>{clearError('name')}
        fioElement.onkeyup=()=>{clearError('name')}
        emailElement.onchange=()=>{clearError('email')}
        emailElement.onkeyup=()=>{clearError('email')}
        fieldPhone.onchange=()=>{clearError('phone')}
        fieldPhone.onkeyup=()=>{clearError('phone')}
        //fieldCaptcha.onchange=()=>{clearError('captcha')}
        //fieldCaptcha.onkeyup=()=>{clearError('captcha')}
        fieldAgree.onchange = () => {clearError('agree')}
        fieldAgree.onchange = () => {clearError('agree')}



        //const madalCloseButton = document.querySelector('.modal__block a.modal__close');
        const modalForm = document.querySelector('.modal.modal--registration');
        const modalMessage = document.querySelector('.modal.modal-success');
        const modalOverlay = document.querySelector('.overlay');


        //--------------------------

        const checkFio = () => {
            let val = fioElement.value;
            if( !val ) {
                addErrorText('name', 'Введите ФИО')
                val = false;
            } else if(val.length > 100) {
                addErrorText('name', 'Слишком длинное ФИО')
                val = false;
            }
            return val;
        };
        const checkMail = () => {
            const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let val = emailElement.value;
            let matches = val.match(emailRE);
            if( !emailElement ){
                addErrorText('email', 'Введите Email')
                val = false;
            } else if (  !matches) {
                addErrorText('email', 'Неправильный формат ввода электронной почты')
                val = false;
            } else if(val.length > 200) {
                addErrorText('email', 'Слишком длинный адрес')
                val = false;
            }
            return val;
        };
        const checkPhone = (form) => {
            const emailRE = /^\+?[0-9 ()-]{16,17}$/;
            let val = fieldPhone.value;
            let matches = val.match(emailRE);
            if (fieldPhone && !matches) {
                addErrorText( 'phone','Неправильный формат Телефона')
                val = false;
            } else if(val.length > 20) {
                addErrorText( 'phone','Слишком длинный Телефона')
                val = false;
            }
            return val;
        };
        const checkAgree = () => {
            let val = fieldAgree.checked;
            if( !val ) {
                addErrorText('agree', 'Согласие обязательно')
                val = false;
            }
            return val;
        };
        const checkCaptha = () => {
            let val = fieldCaptcha.value;
            if( !val ) {
                addErrorText('captcha', 'Введите Каптчу')
                val = false;
            } else if(val.length > 200) {
                addErrorText('captcha', 'Слишком длинная Каптчу')
                val = false;
            }
            return val;
        };
        const checkPromo = () => {
            let val = fieldPromo.value;
            if(val.length > 30) {
                addErrorText('promo', 'Слишком длинное Промокод')
                val = false;
            }
            return val;
        };

        //-------------
        const sendBtn = formBind.querySelector('button[type="submit"]');
        sendBtn.removeAttribute('disabled')
        formBind.onsubmit = (ev) => {
            ev.preventDefault()
            if(sendBtn.disabled) {
                window.ToastShow('Идет отправка данных');
                return false
            }
            // validate Data
            clearErrorAll()
            const datakFio = checkFio();
            const datakMail = checkMail();
            const datakPhone = checkPhone();
            const datakAgree = checkAgree();
            //const datakCaptcha = checkCaptha();
            //send
            if( datakFio && datakMail && datakPhone && datakAgree  /*&& datakCaptcha*/){
                const formData = new FormData(formBind);
                    //formData.append('queryParams', window.location.search);
                    formData.append('goal', "регистрация");
                    const url=(new URL(document.location))
                    for (const p of url.searchParams) {
                        if("utm_" == p[0].substr(0,4)) formData.append(p[0], p[1]);
                    }
                    formData.append('path', url.href.split('?')[0]);
                    sendBtn.disabled = true;
                    sendBtn.innerText="Идет отправка..."
                    //await
                    fetch('/actions/feedback.php', {
                        method: 'POST',
                        body: formData,
                    });

                    fetch('https://actions.druid.1t.ru/webhook/2d48aef7-6af8-4ec0-9fe8-b1d04eaed212', {
                        method: 'POST',
                        body: formData,
                    })
                    .then(res => {
                        sendBtn.disabled = false;
                        sendBtn.innerText="Отправить"
                        sendBtn.removeAttribute('disabled')
                        if( res.ok ){
                            return res.json()
                        } else{
                            if( 422 == res.status ){
                                return res.json()
                                errs = res.json()
                            }
                            console.error(res)
                            window.ToastShow('При отправке данных возникла ошибка');
                        }
                    })
                    .then(data => {
                        if( ! data ) return false
                        if( data["$json"]){
                            for(let i in data["$json"]){
                                data[i]=data["$json"][i]
                            }
                            if(data.errors && data.errors.errors){
                                for(let i in data.errors.errors){
                                    data.errors[i]=data.errors.errors[i]
                                }
                            }
                        }
                        if ('error' == data.result || data.error || 'object' == typeof(data.errors)){
                            for(let fName in data.errors){
                                if( 'array' == typeof(data.errors[fName])){
                                    for(let i in data.errors[fName]){
                                        addErrorText(fName,data.errors[fName][i])
                                    }
                                } else {
                                    addErrorText(fName,data.errors[fName])
                                }
                            }
                            if(data.text){
                                window.ToastShow(data.text);
                            } else {
                                window.ToastShow('Ошибка в данных');
                            }
                            return 0
                        }
                        if((data.result && 'success' == data.result)
                            || (data.message && "Workflow was started" == data.message)
                            || (data.status && 'success' == data.status)
                        ){
                            formBind.reset()
                            modalForm && modalForm.classList.remove('visible')
                            modalOverlay && modalOverlay.classList.remove('visible');
                            //item && (item.classList.add('registr__item--no-visible'))
                            //formBind.querySelector('.captch-reload').click();
                            //ToastSuccessShow('Ваша заявка успешно отправлена')
                            if( 'function' == typeof(ym) ){
                                try{ ym(101927030,'reachGoal','SendApplication'); }catch(e){}
                            }
                            modalOverlay && modalOverlay.classList.add('visible');
                            modalMessage && modalMessage.classList.add('visible');
                        }
                    })
                    .catch( err =>{
                        window.ToastShow('При отправке данных возникла ошибка обработки');
                        sendBtn.disabled = false;
                        sendBtn.innerText="Отправить"
                        sendBtn.removeAttribute('disabled')
                        console.error(err)
                    })
            } else {
                sendBtn.disabled = false;
                sendBtn.innerText="Отправить"
                window.ToastShow('Допущены ошибки в заполнении формы')
                return 0;
            }
        }

        //---------------------------
        const addErrorText = (name, text) => {
            let field =  formBind.querySelectorAll('input[name='+name+']');
            if( !field.length ){
                field =  formBind.querySelectorAll('select[name='+name+']');
            }
            if( field.length ){
                field.forEach((el)=>{
                    el.classList.add(errorInput)
                })
            }

            const errEl = formBind.querySelector('.'+errorClass+'.'+errorClass+'-'+name);
            if (errEl ){
                let errMsg = document.createElement('p');
                errMsg.innerText = text
                errEl.append(errMsg)
            }
        }
        const clearError =(name) => {
            const errEl = formBind.querySelector('.'+errorClass+'.'+errorClass+'-'+name);
            if (errEl){
                errEl.innerText = ''
            }

            let field =  formBind.querySelectorAll('input[name='+name+']');
            if( !field.length ){
                field =  formBind.querySelectorAll('select[name='+name+']');
            }
            if( !field.length ){
                return false
            }
            field.forEach((el)=>{
                el.classList.remove(errorInput)
            })
        }
        //-------------------------------------
        const clearErrorAll =() => {
            const errMsg = formBind.querySelectorAll('.'+errorClass);
            errMsg.forEach((el)=>{
                el.innerText = ''
            })
            const errFil = formBind.querySelectorAll('.'+errorInput);
            errFil.forEach((el)=>{
                 el.classList.remove(errorInput)
            })
        }
        //---------------

        const setPhoneMask = () =>{
            input = fieldPhone

                var keyCode;
                function mask(event) {
                        if( "input" == event.type ){
                            let k = 0
                        } else if( "keydown" == event.type ){
                            let k = 0
                        } else if( "focus" == event.type ){
                            let k = 0
                        } else if( "blur" == event.type ){
                            let k = 0
                        } else{
                            let k = 0
                        }
                    event.keyCode && (keyCode = event.keyCode);
                    var pos = this.selectionStart;
                    if (pos < 3) event.preventDefault();
                    let matrix = "+7 (___) ___ ____";
                    let i = 0;
                    let j = 0;
                    let def = matrix.replace(/\D/g, "");
                    let  val = this.value.replace(/ /g, "");
                        if( val.indexOf('+7') === 0 ){
                            val = val.substr(2);
                        }
                        if( val.indexOf('+7') === 0 ){
                            val = val.substr(2);
                        }
                        val = val.replace(/\D/g, ""),
                        new_value = matrix.replace(/[_\d]/g, (a) => {
                            let res = ''
                            if(i < val.length) {
                                res= def.charAt(j++)
                                if(!res){ res = val.charAt(i++)}
                            }else{
                                res =  a
                            }
                            return res
                            //return i < val.length ? def.charAt(i) || val.charAt(i++)  : a
                        });
                    i = new_value.indexOf("_");
                    if (i != -1) {
                        i < 5 && (i = 3);
                        new_value = new_value.slice(0, i)
                    }
                    var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                        function(a) {
                            return "\\d{1," + a.length + "}"
                        }).replace(/[+()]/g, "\\$&");
                    reg = new RegExp("^" + reg + "$");
                    if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                    if (event.type == "blur" && this.value.length < 5)  this.value = ""
                }

                input.addEventListener("input", mask, false);
                input.addEventListener("focus", mask, false);
                input.addEventListener("blur", mask, false);
                input.addEventListener("keydown", mask, false);

        }
        setPhoneMask()

        //сбросить обязательност браузера
        fioElement      && (fioElement.required = false);
        emailElement    && (emailElement.required = false);
        fieldPhone      && (fieldPhone.required = false);
        fieldAgree      && (fieldAgree.required = false);
        fieldPromo      && (fieldPromo.required = false);
        clearErrorAll();
    })()
});




let timeoutId:number|undefined;

const validatorName = (value:String):boolean|String => {
    const name = value.trim();
    if(name.length <= 3) {
        return "O nome precisa ter mais de 3 caracteres";
    } else if(!name.includes(" ")) {
        return "É necessário adicionar um sobrenome";
    }
    return true;
}

const validatorContact = (value:String):boolean|String => {
    const contact = value.trim().replace('/\D/g', '');
    if(contact.length < 11) {
        return "Número de Whatsapp inválido"
    }
    return true;
}

const validatorInstagram = (value:String):boolean|String => {
    const instagram = value.trim();
    if(instagram.length < 3) {
        return "Instagram inválido";
    }
    return true;
}

const validatorEmail = (value:String):boolean|String => {
    const email = value.trim();
    if(email.length < 3 || !email.includes('@') || !email.includes('.')) {
        return "Email inválido";
    }
    return true;
}

const validatorDefault = (value:String):boolean|String => {
    const v = value.trim();
    if(v.length < 3) {
        return "Essa resposta é obrigatória";
    }
    return true;
}

const validatorFinal = (value:String):boolean|String => {
    const result = validatorDefault(value);
    if(result !== true) { return result; }

    const content = [];
    const labels = <HTMLCollection> document.getElementsByClassName("label");
    const inputs = <HTMLCollection> document.getElementsByClassName("input");
    if(labels.length === inputs.length) {
        for(let i=0; i<labels.length; i++) {
            const label = <HTMLLabelElement>labels[i];
            const input = <HTMLInputElement>inputs[i];
            content.push({
                "question": label.innerText.replace("\n", "").trim(),
                "answer": input.value
            }) 
        }
    }

    try {
        fetch("https://mapi-kw50.onrender.com/enrollment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth": "9f6a6095bc6158b2b189eb009fe6b44d"
            },
            body: JSON.stringify({
                content
            })
        });
    } catch (error:any) {
        console.error({Erro: error?.message});
    }

    return true;
}

const alertTrigger = (input: HTMLInputElement, alert: HTMLSpanElement, message: string|null):void => {
    clearTimeout(timeoutId);
    if(message === null) {
        alert.classList.remove("alert");
        alert.innerHTML = "";
        input.classList.remove("alert");
    } else {
        alert.classList.add("alert");
        alert.innerHTML = message;
        input.classList.add("alert");
        timeoutId = setTimeout(() => {
            alert.classList.remove("alert");
            alert.innerHTML = "";
            input.classList.remove("alert");
        }, 4500);
    }
}

export const validateInput = (index:Number, callback:() => void):any => {
    const input = <HTMLInputElement> document.getElementById(`input-${index}`);
    const alert = <HTMLSpanElement>  document.getElementById(`input-alert-${index}`);
    let validator = null;
    switch (index) {
        case 1:
            validator = validatorName;
            break;
        case 2: 
            validator = validatorInstagram;
            break;
        case 3: 
            validator = validatorEmail;
            break;
        case 4:
            validator = validatorContact;
            break;
        case 11:
            validator = validatorFinal;
            break;
        default:
            validator = validatorDefault;
            break;
    }

    const res = validator(input.value);
    if(res === true) {
        alertTrigger(input, alert, null);
        callback();
    } else {
        alertTrigger(input, alert, res.toString());
    }
}

document.getElementById("input-2")?.addEventListener("input", (e:Event) => {
    if(e?.target instanceof HTMLInputElement) {
        let v = e.target.value.replace("@", "");
        if(v.includes("@")) {
            v = v.replace("@", ""); 
        }
        e.target.value = `@${v}`
    }
})

document.getElementById("input-1")?.addEventListener("input", (e:Event) => {
    if(e?.target instanceof HTMLInputElement) {
        let v = e.target.value.split(" ");
        v = v.map(word => {
            const a = word[0];
            const b = word.slice(1);
            return a.toUpperCase() + b;
        })
        e.target.value = v.join(" ")
    }
})
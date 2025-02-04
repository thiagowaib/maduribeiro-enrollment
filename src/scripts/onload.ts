const pingServer = async () => {
    try {
      fetch("https://mapi-kw50.onrender.com/ping", {
        method: "GET",
        headers: {
            "auth": "9f6a6095bc6158b2b189eb009fe6b44d"
        }
      });
    } catch (error:any) {
      console.error({error});
    }
}

const clearContent = () => {
    const inputs = <HTMLCollection> document.getElementsByClassName("input");
    const btns   = <HTMLCollection> document.getElementsByClassName("btn-slide-forward");
    for(let i=0; i<inputs.length; i++) {
        const input = <HTMLInputElement> inputs[i];
        input.value = "";

        const btn = <HTMLButtonElement> btns[i];
        input.addEventListener("keydown", (event:KeyboardEvent) => {
          console.log(event.code, event.key, event.location)
          if(event.code == "Enter" || event.keyCode === 13) {
              btn.click();
          }
      })
    }
}

window.onload = async () => {
    clearContent();
    await pingServer();
};
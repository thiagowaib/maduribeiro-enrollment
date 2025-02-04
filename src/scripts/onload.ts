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

    for(let i=0; i<inputs.length; i++) {
        const input = <HTMLInputElement> inputs[i];
        input.value = "";
    }
}

window.onload = async () => {
    clearContent();
    await pingServer();
};
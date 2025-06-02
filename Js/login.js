var body = document.querySelector("body");
var signInButton = document.querySelector("#signIn");
var signUpButton = document.querySelector("#signUp");
var authRegister = document.querySelector("#authRegister");
var authLogin = document.querySelector("#authLogin");

body.onload = function(){
    body.className = "on-load";
}

signInButton.addEventListener("click", function(){
    body.className = "sign-in";
})

authRegister.addEventListener("click", function(){
    body.className = "sign-up";
})

authRegister.addEventListener("submit", async function(e) {
    e.preventDefault()
    var email = document.querySelector('input[id="email"]').value
    var senha = document.querySelector('input[id="password"]').value
    var senhaConfirmada = document.querySelector('input[id="confirmPassword"]').value

        const dadosParaEnviar = {
        email: email,
        senha: senha,
        senhaConfirmada: senhaConfirmada
    };

    try {
        const resposta = await fetch(
            "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/registar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosParaEnviar)
            }
        );

        if (resposta.ok) {
            alert("Cadastro realizado com sucesso!");
        } else {
            const erro = await resposta.text();
            alert(`Erro no cadastro: ${erro}`);
        }
    } catch (erro) {
        alert("Falha na conexão com o servidor.");
    }
});

authLogin.addEventListener("submit", async function(e) {
    e.preventDefault()
    var email = document.querySelector('input[id="email_login"]').value
    var senha = document.querySelector('input[id="password_login"]').value

    const dadosParaEnviar = {
        email: email,
        senha: senha,
    };

    try {
        const response = await fetch(
            "https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosParaEnviar)
            }
        );

        if (response.ok) {
            alert("Usuário logado, seja bem-vindo(a)!");
            const data = await response.json();
            const token = data.token;
            const dataExpiracao = data.dataExpiracao;

            const dataUser = {
                email: email,
                token: token,
                dataExpiracao : dataExpiracao
            }

            localStorage.setItem("dataUser", JSON.stringify(dataUser))
            window.location.href = "welcome.html";
        } else {
            const erro = await response.text();
            alert(`Erro no cadastro: ${erro}`);
        }
    } catch (erro) {
        alert("Falha na conexão com o servidor.");
    }
});

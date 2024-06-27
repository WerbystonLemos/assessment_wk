let formHtml = document.querySelector("#formRegister");
formHtml.addEventListener("submit", (event) => {
    event.preventDefault();
})


let btnSubmitFrom = document.querySelector("#btn_submit")
btnSubmitFrom.addEventListener('click', () => {
    
    let nome        = document.querySelector("#input_name").value
    let email       = document.querySelector("#input_email").value
    let senha       = document.querySelector("#input_pass").value
    let contraSenha = document.querySelector("#input_counterpass").value

    // validar dados
    if (!validaDados( nome, email, senha, contraSenha ))
    {
        return;
    }

    let dadosForm = JSON.stringify({
        'nome' : nome,
        'email' : email,
        'senha' :  senha,
        'confirmacaoSenha': contraSenha,
    })
    
    // request a api
    fetch('http://127.0.0.1:8080', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'ECA1AB4CE8583613A2C759B445E98' // proteger (ENV)
            },
            body: dadosForm
        })
        .then( (data) => {
            return data.json()
        })
        .then( (res) => {

            let msg = (res.erro) ? res.tipoErro :  "Sucesso"
            alert( msg )
            formHtml.reset()
        })
        .catch( (err) => {
            alert(err.tipoErro)
        })
})

function validaDados( nome, email, senha, contraSenha )
{
    if( validaNome(nome) 
        && validaEmail(email)
        && validaSenha(senha)
        && validaContraSenha(senha, contraSenha) )
    {
        return true
    }
    return false
}
function validaNome(nome)
{
    document.querySelector("#ContainerErroNome").innerHTML = ` `
    if(!(nome && nome.length > 0 && nome != "" ))
    {
        document.querySelector("#ContainerErroNome").innerHTML = `<span style="font-size:13px; color:rgb(255, 0, 0)">Nome inválido</span><br/><br/>`
        return false
    }
    
    return true
}
function validaEmail(email)
{
    document.querySelector("#ContainerErroEmail").innerHTML = ` `
    // obrigatorio
    if(!( email 
        && (email.length > 0) 
        && (email != "") 
        && email.includes('@') 
        && email.includes('.com') ))
    {
        document.querySelector("#ContainerErroEmail").innerHTML = `<span style="font-size:13px; color:rgb(255, 0, 0)">Email inválido</span><br/>`
        return false
    }
    
    return true;
}
function validaSenha(senha)
{
    document.querySelector("#ContainerErroSenha").innerHTML = ` `
    // obrigatorio
    if( !(senha && senha.length > 0 && senha.length != "" ))
    {
        document.querySelector("#ContainerErroSenha").innerHTML = `<span style="font-size:13px; color:rgb(255, 0, 0)">Senha inválido</span><br/>`
        return false
    }
        
    // 0>maiuscula && 0>minuscula 
    if( !(/[A-Z][a-z]/.test(senha) && ( /\d/.test(senha) )) )
    {
        document.querySelector("#ContainerErroSenha").innerHTML = `<span style="font-size:13px; color:rgb(255, 0, 0)">SenhaDeve possuir pelo menos 1 letra maiúscula, 1 minúscula e 1 número</span><br/>`
        return false
    }
    return true;
}
function validaContraSenha( senha, contraSenha)
{
    document.querySelector("#ContainerErroContrasenha").innerHTML = ` `
    // obrigatorio
    if( !(contraSenha && contraSenha.length > 0 && contraSenha != "" ) || (!( senha === contraSenha )) )
    {
        document.querySelector("#ContainerErroContrasenha").innerHTML = `<span style="font-size:13px; color:rgb(255, 0, 0)">As Senhas devem ser igauis</span><br/>`
        return false
    }
    
    return true
}
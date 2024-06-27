let formHtml = document.querySelector("#formRegister");
formHtml.addEventListener("submit", (event) => {
    event.preventDefault();
})


let a = document.querySelector("#btn_submit")
a.addEventListener('click', () => {
    
    let nome        = document.querySelector("#input_name").value
    let email       = document.querySelector("#input_email").value
    let senha       = document.querySelector("#input_pass").value
    let contraSenha = document.querySelector("#input_pass").value

    // validar dados
    validaDados( nome, email, senha, contraSenha )

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
            if (res.erro)
            {
                alert(res.tipoErro)
            }
            else
            {
                alert("Sucesso")
            }
            formHtml.reset()
        })
        .catch( (err) => {
            alert(err.tipoErro)
        })
})

function validaDados( nome, email, senha, contraSenha )
{
    let resultado   = Array()
    let msgErro     = Array()

    resultado.push( validaNome(nome) )
    resultado.push( validaEmail(email) )
    resultado.push( validaSenha(senha) )
    resultado.push( validaContraSenha(senha, contraSenha) )

    for (let i = 0; i < resultado.length; i++)
    {
        for (let cont = 0; cont < resultado[i].length; cont++)
        {
            if (resultado[i][cont][1] != 'false' )
            {
                msgErro.push(resultado[i][cont][1])
            }                
        }
        
    }

    console.log(msgErro)
    // return msgErro
}

function validaNome(nome)
{
    let resultado = (nome && nome.length > 0 && nome != "" )
        ? [['erro', 'false']]
        : [['erro', 'Nome inválido']]
        
    return resultado
}
function validaEmail(email)
{
    // obrigatorio
    let resultado = Array()
    let validarequired = (email && (email.length > 0) && (email != "") )
        ? ['erro', 'false'] 
        : ['erro', 'Nome inválido'] 
           
    // valido
    let validaFormaEmail  = ( email.includes('@') && email.includes('.com') )
        ? ['erro', 'false']
        : ['erro', 'Email inválido']

    resultado.push(validaFormaEmail)
    resultado.push(validarequired)
    return resultado;
}
function validaSenha(senha)
{
    let resultado = Array()
    // obrigatorio
    let validaQtdSenha = (senha && senha.length > 0 && senha.length != "" )
        ? ['erro', 'false']
        : ['erro', 'Nome inválido']
        
    // 0>maiuscula && 0>minuscula 
    let validaCaracteres = ( /[A-Z][a-z]/.test(senha) )
        ? ['erro', 'false']
        : ['erro', 'Formação de senha inválida']

    // 0>numero
    let validaNumero = ( /\d/.test(senha) )
        ? ['erro', 'false']
        : ['erro', 'Quantidade de digitos da senha inválidos']
    
    resultado.push(validaQtdSenha)
    resultado.push(validaCaracteres)
    resultado.push(validaNumero)
    return resultado;
}
function validaContraSenha( senha, contraSenha)
{
    let resultado = Array()
    // obrigatorio
    let validaContraSenha = (contraSenha && contraSenha.length > 0 && contraSenha != "" )
        ? ['erro', 'false']
        : ['erro', 'Nome inválido']
    
    // contraSenha == senha
    let validaIgualdade = ( senha == contraSenha )
        ? ['erro', 'false']
        : ['erro', 'Senhas diferentes']

    resultado.push(validaContraSenha)
    resultado.push(validaIgualdade)
    return resultado
}
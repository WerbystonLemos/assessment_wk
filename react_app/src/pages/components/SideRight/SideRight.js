import { useState } from 'react'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'; 
import '../../../App.css'
import './sideRight.css'

export default function SideRight()
{

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmacaoSenha: ''
    })

    const [erros, setErros] = useState({})

    async function submitForm(e)
    {
        e.preventDefault();

        if( validateDados() )
        {
            await axios.post('http://localhost:8080', formData, {
                headers: {
                    'x-api-key': 'ECA1AB4CE8583613A2C759B445E98',
                    'Content-Type': 'application/json'
                }
            })
            .then( resposta => {
                if(!resposta.data.erro)
                {
                    toast.success("Cadastrado com sucesso")
                    setFormData({
                        nome: '',
                        email: '',
                        senha: '',
                        confirmacaoSenha: ''
                    })
                }
                else
                {
                    toast.error( (resposta.data.tipoErro)
                                    .toLowercase()
                                    .split('_')
                                    .join()
                                )
                }
            })
            .catch( (err) => {
                let msg = err.response.data.tipoErro
                                .split('_')
                                .join()
                                .replace(',', ' ')
                toast.error(msg)
            })
        }    
    }

    function inputFieldChange(e)
    {
        const { name, value } = e.target;
        
        setFormData({
          ...formData,
          [name]: value
        });
    };

    function validateDados()
    {
        let valid       = true;
        let listErros   = {}

        // validacao do campo nome
        if( !formData.nome )
        {
            valid = false
            listErros.nome = 'Campo Nome é obrigatório!'
        }
        // validacao do campo email
        if( !formData.email )
        {
            valid           = false
            listErros.email = 'Campo Email é obrigatório!'
        }
        else if( !/\S+@\S+\.\S+/.test(formData.email))
        {
            valid           = false
            listErros.email = 'Formato de Email inválido!'
        }
        // validacao do campo senha
        if( !(formData.senha) )
        {
            valid           = false
            listErros.senha = 'Campo Senha obrigatório!'
        }
        if( !(formData.senha.length >= 8) )
        {
            valid           = false
            listErros.senha = 'Campo Senha Deve possuir no mínimo 8 caracteres!'
        }
        else if( !(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[A-Za-z]).*$/.test(formData.senha)) )
        {
            valid           = false
            listErros.senha = 'Senha deve possuir ao menos 1 letra maiúscula, 1 letra minúscula e 1 número!'
        }
        // validacao do campo confirmacaoSenha
        if( !(formData.confirmacaoSenha === formData.senha) )
        {
            valid                   = false
            listErros.confirmacaoSenha   = 'Senhas não correspondem. Tente novamente.'            
        }

        setErros(listErros)
        return valid
    }

    return(
        <div>
            <div id="sideRight">
                <div id="containerForm">
                    
                    <h1>Registre-se</h1>

                    <form id="formRegister">
                        
                        <label htmlFor="input_name">Nome</label>
                        <input id="input_name" name="nome" className="input_form" type="text" placeholder="Digite seu nome" onChange={inputFieldChange} value={ formData.nome } required />
                        <div id="ContainerErroNome" className="containerErroInput">{erros.nome}</div>

                        <label htmlFor="input_email">Email</label>
                        <input id="input_email" name="email" className="input_form" type="email" placeholder="Digite seu email" onChange={inputFieldChange} value={formData.email} required />
                        <div id="ContainerErroEmail" className="containerErroInput">{erros.email}</div>

                        <label htmlFor="input_pass">Senha</label>
                        <input id="input_pass" name="senha" className="input_form" min="8" type="password" placeholder="Digite sua senha" onChange={inputFieldChange} value={formData.senha} required />
                        <div id="ContainerErroSenha" className="containerErroInput">{erros.senha}</div>

                        <label htmlFor="input_counterpass">Confirme sua Senha</label>
                        <input id="input_counterpass" name="confirmacaoSenha" className="input_form" min="8" type="password" placeholder="Digite seu nome" onChange={inputFieldChange} value={formData.confirmacaoSenha} required />
                        <div id="ContainerErroContrasenha" className="containerErroInput">{erros.confirmacaoSenha}</div>

                        <div className="groupForm">
                            <input id="btn_submit" className="btn btn_form_action" type="button" value="Registrar" onClick={ submitForm }/>
                            <input id="btn_reset" className="btn btn_form_action" type="reset" value="Cancelar"/>
                        </div>

                    </form>

                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
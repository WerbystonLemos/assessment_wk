import '../../../App.css'
import './sideRight.css'

export default function SideRight()
{
    return(
        <div>
            <div id="sideRight">
                <div id="containerForm">
                    
                    <h1>Registre-se</h1>

                    <form id="formRegister">
                        
                        <label for="input_name">Nome</label>
                        <input id="input_name" className="input_form" type="text" placeholder="Digite seu nome" required />
                        <div id="ContainerErroNome" className="containerErroInput"></div>

                        <label for="input_email">Email</label>
                        <input id="input_email" className="input_form" type="email" placeholder="Digite seu email" required />
                        <div id="ContainerErroEmail" className="containerErroInput"></div>

                        <label for="input_pass">Senha</label>
                        <input id="input_pass" className="input_form" min="8" type="password" placeholder="Digite sua senha" required />
                        <div id="ContainerErroSenha" className="containerErroInput"></div>

                        <label for="input_counterpass">Confirme sua Senha</label>
                        <input id="input_counterpass" className="input_form" min="8" type="password" placeholder="Digite seu nome" required />
                        <div id="ContainerErroContrasenha" className="containerErroInput"></div>

                        <div className="groupForm">
                            <input id="btn_submit" className="btn btn_form_action" type="button" value="Registrar"/>
                            <input id="btn_reset" className="btn btn_form_action" type="reset" value="Cancelar"/>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
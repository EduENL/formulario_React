import { useForm } from "react-hook-form";
import '../css/style.css';
import minhaImagem from '../images/login.jpg'
import verified from '..//images/verified.png'
import { useState } from "react";

function MyForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [status, setStatus] = useState({ submittedSuccesfully: false, loading: false, showPassoword: false})

    const onSubmit = data => {
        setStatus({...status, loading: true})
        setTimeout(() => {
            setStatus({ submittedSuccesfully: true, loading: false})
        }, 1000)
    }

    const generateErrorMessage = fieldName => {
        return {
            required: `${fieldName} é obrigatório`,
            pattern: fieldName === 'email' ? 'Formato de e-mail inválido' : null
        }
    }

    const handleReturnButtonClick = () => {
        window.location.href = '/'
    }

    return (
        <div className="container">
            {status.submittedSuccesfully ? (
                <div className="success-message">
                    <img src={verified} alt="Verificado" />
                    <h2>Formulário Enviado com Sucesso!</h2>
                    <p>Obrigado por enviar o Formulário.</p>
                    <button className="btn" onClick={handleReturnButtonClick}>Retornar</button>
                </div>
            ) : (
                <div className="form-sign-up">
                    <div>
                        <img src={minhaImagem} alt='Imagem de uma pessoa se cadastrando no celular' />
                    </div>

                    <section>
                        <h1>Inscreva-se</h1>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form flex">
                                <label htmlFor="name">Nome</label>
                                <input
                                    {...register("firstName", generateErrorMessage('Nome'))}
                                    placeholder="Nome"
                                    id="name"
                                    autoComplete="off"
                                    className={errors.firstName ? 'error' : ''}
                                />
                                {errors.firstName && <span className="error-message">{errors.firstName.message}</span>}
                            </div>

                            <div className="form flex">
                                <label htmlFor="sobrenome">Sobrenome</label>
                                <input
                                    {...register("lastName", generateErrorMessage('Sobrenome'))}
                                    placeholder="Sobrenome"
                                    id="sobrenome"
                                    autoComplete="off"
                                    className={errors.lastName ? 'error' : ''}
                                />
                                {errors.lastName && <span className="error-message">{errors.lastName.message}</span>}
                            </div>
                            

                            <div className="form flex">
                                <label htmlFor="email">E-mail</label>
                                <input
                                    {...register("email", generateErrorMessage('E-mail'))}
                                    placeholder="E-mail"
                                    id="email"
                                    autoComplete="off"
                                    className={errors.email ? 'error' : ''}
                                />
                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                            </div>

                            <div className="form flex">
                                <label htmlFor="password">Senha</label>
                                <div className="password-input-container">
                                    <input
                                        {...register("password", generateErrorMessage('Senha'))}
                                        placeholder="Senha"
                                        id="password"
                                        autoComplete="off"
                                        className={errors.password ? 'error' : ''}
                                    />

                                    <button 
                                        type="button"
                                        className='password-toogle'
                                        onClick={() => setStatus({ ...status, showPassoword: !status.showPassoword })}>
                                        {status.showPassoword ? <i className="fas fa-eye"></i> : <i className="fas fa-eye-slash"></i>}
                                    </button>
                                </div>
                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                            </div>

                            <button className="btn" type="submit" disabled={status.loading}>
                                {status.loading ? 'Enviando...' : 'Enviar'}
                            </button>
                        </form>
                        {status.loading && <p>Carregando...</p>}
                    </section>
                </div>
            )}
        </div>
    )
}

export default MyForm;


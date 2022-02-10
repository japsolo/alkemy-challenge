import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useHistory, Redirect } from 'react-router-dom';

function Login() {

	const history = useHistory();

	const submitHandler = e => {
		e.preventDefault();

		const email = e.target.email.value;
		const password = e.target.password.value;

		const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if(email === '' || password === '') {
			swAlert(<h2>Las campos no pueden estar vacíos</h2>);
			return;
		}

		if (email !== '' && !regexEmail.test(email)) {
			swAlert(<h2>Debes escribir una dirección de correo electrónico válida</h2>);
			return;
		}

		if (email !== 'challenge@alkemy.org' || password !== 'react') {
			swAlert(<h2>Credenciales inválidas</h2>);
			return
		}

		axios
			.post('http://challenge-react.alkemy.org', { email, password })
			.then(res => {
				swAlert(<h2>Perfecto, ingresaste correctamente</h2>)
				const tokenRecibido = res.data.token;
				sessionStorage.setItem('token', tokenRecibido);
				history.push('/listado');
			})
	}

	let token = sessionStorage.getItem('token');

	return (
		<>
			{ token && <Redirect to="/listado" /> }

			<div className="row">
				<div className="col-6 offset-3">
					<h2>Formulario de login</h2>
					<form onSubmit={submitHandler}>
						<label className="form-label d-block mt-2">
							<span>Correo electrónico:</span> <br />
							<input className="form-control" type="text" name="email" />
						</label>
						<label className="form-label d-block mt-2">
							<span>Contraseña:</span><br />
							<input type="password" name="password" className="form-control" />
						</label>
						<button className="btn btn-success mt-2" type="submit">Ingresar</button>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login;
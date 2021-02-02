import { authRoles } from 'app/auth';
import RegisterAdvisor from './RegisterAdvisor';
import RegisterEntrepreneur from './RegisterEntrepreneur';

const RegisterConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/register-entrepreneur',
			component: RegisterEntrepreneur
		},
		{
			path: '/register-advisor',
			component: RegisterAdvisor
		}
	]
};

export default RegisterConfig;

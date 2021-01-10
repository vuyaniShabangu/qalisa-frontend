import Ventures from './Ventures';
import {authRoles} from '../../auth';


const VenturesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user, // ['admin']
	routes: [
		{
			path: '/ventures',
			component: Ventures
		}
	]
};

export default VenturesConfig;
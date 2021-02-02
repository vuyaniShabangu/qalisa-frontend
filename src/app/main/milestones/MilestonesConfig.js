import Milestones from './Milestones';
import {authRoles} from '../../auth';


const MilestonesConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	auth: authRoles.user, // ['admin']
	routes: [
		{
			path: '/milestones',
			component: Milestones
		}
	]
};

export default MilestonesConfig;
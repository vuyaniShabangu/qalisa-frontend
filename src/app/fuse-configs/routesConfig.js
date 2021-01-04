import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import HomeConfig from 'app/main/example/HomeConfig';
import VenturesConfig from 'app/main/ventures/VenturesConfig';
import MilestonesConfig from 'app/main/milestones/MilestonesConfig';
import MeetingsConfig from 'app/main/meetings/MeetingsConfig';


const routeConfigs = [HomeConfig, VenturesConfig, MilestonesConfig, MeetingsConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/home" />
	}
];

export default routes;

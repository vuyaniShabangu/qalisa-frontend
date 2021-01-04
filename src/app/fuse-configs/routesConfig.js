import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import ExampleConfig from 'app/main/example/ExampleConfig';
import VenturesConfig from 'app/main/ventures/VenturesConfig';
import MilestonesConfig from 'app/main/milestones/MilestonesConfig';
import MeetingsConfig from 'app/main/meetings/MeetingsConfig';


const routeConfigs = [ExampleConfig, VenturesConfig, MilestonesConfig, MeetingsConfig];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/example" />
	}
];

export default routes;

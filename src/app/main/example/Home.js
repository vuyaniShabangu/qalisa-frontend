import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import AdvisorPage from '../advisorApplication/Advisor';
import Ventures from '../ventures/Ventures';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function HomePage(props) {
	const classes = useStyles(props);
	const user = useSelector(({ auth }) => auth.user);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}

			content={
				<div className="p-32 justify-center">
						{user.type == "entrepreneur" ? <Ventures /> : <AdvisorPage />}
				</div>
			}
		/>
	);
}

export default HomePage;

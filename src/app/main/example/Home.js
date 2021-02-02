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
				<div
					className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-60')}
				>
					<div className="max-w-600">
						{user.type == "entrepreneur" ? <Ventures /> : <AdvisorPage />}
					</div>
				</div>
			}
		/>
	);
}

export default HomePage;

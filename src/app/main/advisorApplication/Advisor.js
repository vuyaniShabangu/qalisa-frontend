import VentureView from '@fuse/core/VentureView';
import VentureForm from '@fuse/core/VentureForm';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import React from 'react';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function AdvisorPage(props) {
	const classes = useStyles(props);
	const user = useSelector(({ auth }) => auth.user);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24 justify-center">
					<h2>Advisor Application</h2>
				</div>
			}
			content={
				<div className="p-24 justify-center">
					{/*(user.ventures.length > 0) ? <VentureView venture={user.ventures[0]} /> : <VentureForm />*/}
				</div>
			}
		/>
	);
}

export default AdvisorPage;

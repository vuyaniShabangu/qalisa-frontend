import React from 'react';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import VentureInfo from './VentureInfo';

function VentureView(props) {
	return (
		<div className="w-full sm:w-1/2">
			{props.venture.image && <img
				src={"https://qalisa-backend.herokuapp.com" + props.venture.image.url}
				alt="beach"
				style={{
					maxWidth: '640px',
					width: '100%'
				}}
				className="rounded-6"
			/>}

			{(props.venture.approved === null) &&
				<Alert className="mb-32 mt-32" severity="info">
					<Typography variant="h6" gutterBottom>Status: Your venture application is still under review.</Typography>
				</Alert>
			}

			{(props.venture.approved === true) &&
				<Alert className="mb-32 mt-32" severity="success">
					<Typography variant="h6" gutterBottom>Status: Your venture has been approved.</Typography>
				</Alert>
			}

			{(props.venture.approved === false) &&
				<Alert className="mb-32 mt-32" severity="error">
					<Typography variant="h6" gutterBottom>Status: Your venture has been rejected. Please check your email for further information.</Typography>
				</Alert>
			}

			{(props.venture.approved === true) &&
				<VentureInfo venture={props.venture} />
			}
		</div>
	);
}

export default React.memo(VentureView);

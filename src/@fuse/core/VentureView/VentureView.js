import React from 'react';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import ReactPlayer from 'react-player'

function VentureView(props) {
	return (
		<div className="max-w-md m-32">
			{props.venture.image && <img
				src={"https://qalisa-backend.herokuapp.com" + props.venture.image.url}
				alt="beach"
				style={{
					maxWidth: '640px',
					width: '100%'
				}}
				className="rounded-6"
			/>}

			{(props.venture.approved === null) && <Alert className="mb-32 mt-32" severity="info">Status: Your venture application is still under review.</Alert>}
			{(props.venture.approved === true) && <Alert className="mb-32 mt-32" severity="success">Status: Your venture has been approved.</Alert>}
			{(props.venture.approved === false) && <Alert className="mb-32 mt-32" severity="error">Status: Your venture has been rejected. Please check your email for further information.</Alert>}

			<Typography variant="h3" color="inherit" className="font-800 leading-tight">
				{props.venture.companyName}
			</Typography>

			<Typography variant="h6" gutterBottom>
				{props.venture.tagLine}
			</Typography>

			<Typography variant="overline" display="block" gutterBottom>
				Founding date: {props.venture.foundingDate}
			</Typography>

			<Typography variant="body1" gutterBottom>
				{props.venture.pitch}
			</Typography>

			{(props.venture.pitchUrlVideo) && <ReactPlayer className="mb-32 mt-32" url={props.venture.pitchUrlVideo} />}

			<Typography variant="body1" gutterBottom>
				Address: {props.venture.fullAddress}
			</Typography>

			<Typography variant="body1" gutterBottom>
				Website: <a href={props.venture.website}>{props.venture.website}</a>
			</Typography>


		</div>
	);
}

export default React.memo(VentureView);

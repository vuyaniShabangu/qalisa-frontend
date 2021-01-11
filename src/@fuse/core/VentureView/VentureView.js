import React from 'react';

function VentureView(props) {
	return (
		<div>
			{props.venture.image && <img
				src={"https://qalisa-backend.herokuapp.com" + props.venture.image.url}
				alt="beach"
				style={{
					maxWidth: '640px',
					width: '100%'
				}}
				className="rounded-6"
			/>}
			<h1 className="py-16">{props.venture.companyName}</h1>
			<h4 className="pb-12">{props.venture.tagLine}</h4>
			<h4 className="pb-12">Founding date: {props.venture.foundingDate}</h4>
			<p>
				{props.venture.pitch}
			</p>

		</div>
	);
}

export default React.memo(VentureView);

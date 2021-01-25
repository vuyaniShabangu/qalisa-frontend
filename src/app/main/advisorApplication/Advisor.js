import React, { useEffect, useState } from 'react';
import AdvisorApplicationForm from '@fuse/core/AdvisorApplication';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function AdvisorPage(props) {
	const classes = useStyles(props);
	//const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	//const [advisorApplicationInfo, setAdvisorApplicationInfo] = useState(["initial"]);
	const [data, setData] = useState({ advisorApplicationInfo: [], isFetching: false });

	useEffect(() => {
		setData({ advisorApplicationInfo: data.advisorApplicationInfo, isFetching: true });
		async function fetchData() {
			await axios
				.get('https://qalisa-backend.herokuapp.com/advisors', {
					headers: {
						'Authorization': 'Bearer ' + jwtService.getAccessToken()
					}
				})
				.then(response => {
					console.log(response);
					if (response.status >= 200 && response.status <= 299) {
						setData({ advisorApplicationInfo: response.data, isFetching: false });
					} else {
						console.log(response);
					}
				}).catch(error => {
					console.log(error);
					setData({ advisorApplicationInfo: data.advisorApplicationInfo, isFetching: false });
					dispatch(showMessage({ message: "There was an error in retrieving your advisor application." }));
				});
		}

		fetchData();

	}, []);

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
					{data.isFetching ? <CircularProgress /> : ((data.advisorApplicationInfo === null || data.advisorApplicationInfo.length === 0) ? <AdvisorApplicationForm /> : <h2>Your adivsor application is currently being processed.</h2>)}
				</div >
			}
		/>
	);
}

export default AdvisorPage;

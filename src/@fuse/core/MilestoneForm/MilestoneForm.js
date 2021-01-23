import React, { useEffect, useRef, useState } from 'react';
import { TextFieldFormsy, SelectFormsy, RadioGroupFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import Formsy from 'formsy-react';
import axios from 'axios';
import jwtService from 'app/services/jwtService';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { showMessage } from 'app/store/fuse/messageSlice';




function MilestoneForm(props) {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(false);
	const [isWaitingForRequest, setIsWaitingForRequest] = useState(false);
	const values = {
		someDate: "2017-05-24"
	};

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function toBoolean(value) {
		if (value && typeof value === "string") {
			if (value.toLowerCase() === "true") return true;
			if (value.toLowerCase() === "false") return false;
		}
		return value;
	}

	function handleSubmit(model) {
		model.user = user.id;
		model.timeCommitment = toBoolean(model.timeCommitment);
		return new Promise((resolve, reject) => {
			setIsWaitingForRequest(true);
			axios
				.post('https://qalisa-backend.herokuapp.com/advisors', {
					...model,
					headers: {
						'Authorization': 'Bearer ' + jwtService.getAccessToken()
					}
				})
				.then(response => {
					console.log(response);
					if (response.status >= 200 && response.status <= 299) {
						console.log(response.data);
						dispatch(showMessage({ message: "Your advisor has been registered for review." }));
						window.location.reload();
						resolve(response.data);
					} else {
						console.log(response);
						dispatch(showMessage({ message: "Your application could not be registed, please try again later." }));
						reject(response.data.error);
					}
				}).catch(error => {
					console.log(error)
					dispatch(showMessage({ message: "Your application could not be registed, please try again later." }));
				});
		});
	}




	return (
		<div className="max-w-md m-32">
			<h1>Create a new milestone</h1>
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="description"
					label="Description"
					multiline
					rows={4}
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="user"
					label="Assign to"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="date"
					name="startDate"
					label="Start Date"
					InputLabelProps={{
						shrink: true,
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="date"
					name="endDate"
					label="End Date"
					InputLabelProps={{
						shrink: true,
					}}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"
					required
				/>






				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16 normal-case"
					aria-label="Submit Venture"
					disabled={!isFormValid}
					value="legacy"
				>
					Submit Milestone
				</Button>
			</Formsy>

		</div>
	);
}

export default React.memo(MilestoneForm);

import React, { useState } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';


function VentureForm(props) {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();

	const [isFormValid, setIsFormValid] = useState(false);
	const [isWaitingForRequest, setIsWaitingForRequest] = useState(false);

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
			setIsWaitingForRequest(true);
		});
	}




	return (
		<div className="max-w-lg">
			<Typography variant="h3" color="inherit" className="font-700 leading-tight mb-32">
				Complete your advisor application
			</Typography>
			{ isWaitingForRequest ? <CircularProgress /> : <Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				className="flex flex-col justify-center w-full"
			>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="firstName"
					label="First Name"
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
					name="lastName"
					label="Last Name"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
					required
				/>

				<SelectFormsy
					className="mb-16"
					name="gender"
					label="Gender"
					variant="outlined"
				>
					<MenuItem value="Male">Male</MenuItem>
					<MenuItem value="Female">Female</MenuItem>
				</SelectFormsy>

				<TextFieldFormsy
					className="mb-16"
					type="date"
					name="birthDate"
					label="Birth Date"
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
					type="text"
					name="shortBio"
					label="Short Bio"
					multiline
					rows={4}
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
					type="text"
					name="whyYouWantToBeAdvisor"
					label="Why do you want to be an advisor?"
					multiline
					rows={2}
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
					type="text"
					name="challengesYouMayFace"
					label="Do you know of any challenges you may face?"
					multiline
					rows={2}
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					variant="outlined"
					required
				/>

				<RadioGroupFormsy
					className="my-16"
					name="timeCommitment"
					label="Are you able to commit to at least 3-6 hours per month as an advisor?"
					required
				>
					<FormControlLabel value="true" control={<Radio color="primary" />} label="Yes" />
					<FormControlLabel value="false" control={<Radio color="primary" />} label="No" />
				</RadioGroupFormsy>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="howWillYouDemonstrateCommitmentToEntrepreneurGoals"
					label="How will you demonstrate your commitment to entreprenuer goals?"
					multiline
					rows={2}
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
					type="text"
					name="countryOfResidence"
					label="Country Of Residence"
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
					name="cityOfResidence"
					label="City Of Residence"
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
					name="nationality"
					label="Nationality"
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
					name="firstLanguage"
					label="First Language"
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
					name="secondLanguage"
					label="Second Language"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="socialInterests"
					label="Social Interests"
					multiline
					rows={2}
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="hobbies"
					label="Hobbies"
					multiline
					rows={2}
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="highestLevelOfEducation"
					label="Highest Level Of Education"
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
					name="fieldOfStudy"
					label="Field Of Study"
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
					name="industry"
					label="Industry"
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
					name="companyName"
					label="Company Name"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="jobTitle"
					label="Job Title"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="number"
					name="yearsOfWorkExperience"
					label="Years Of Work Experience"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="number"
					name="yearsOfAdvisoryExperience"
					label="Years Of Advisory Experience"
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
				/>

				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="otherUniversityProfessionalAffiliations"
					label="Other University Professional Affiliations"
					multiline
					rows={2}
					validations={{
						minLength: 1
					}}
					validationErrors={{
						minLength: 'Min character length is 1'
					}}
					variant="outlined"
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
					Submit Advisor Application
				</Button>
			</Formsy>}

		</div>
	);
}

export default React.memo(VentureForm);

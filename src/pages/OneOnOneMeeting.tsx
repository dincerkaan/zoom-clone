import React, { useState } from 'react';
import Header from '../componenets/Header';
import { EuiFlexGroup, EuiForm, EuiSpacer } from '@elastic/eui';
import MeetingNameField from '../componenets/FormComponents/MeetingNameField';
import MeetingUsersField from '../componenets/FormComponents/MeetingUsersField';
import useAuth from '../app/hooks/useAuth';
import useFetchUsers from '../app/hooks/useFetchUsers';
import moment from 'moment';
import MeetingDateField from '../componenets/FormComponents/MeetingDateField';
import CreateMeetingButton from '../componenets/FormComponents/CreateMeetingButton';
import { FieldErrorType, UserType } from '../utils/Types';
import { meetingsRef } from '../utils/FirebaseConfig';
import { addDoc } from 'firebase/firestore';
import { useAppSelector } from '../app/hooks';
import { generateMeetingId } from '../utils/generateMeetingId';
import { useNavigate } from 'react-router-dom';
import useToast from '../app/hooks/useToast';

function OneOnOneMeeting() {
	useAuth();
	const [users] = useFetchUsers();
	const uid = useAppSelector((zoom) => zoom.auth.userInfo?.uid);
	const navigate = useNavigate();
	const [meetingName, setMeetingName] = useState('');
	const [selectedUsers, setSelectedUsers] = useState<Array<UserType>>([]);
	const [startDate, setStartDate] = useState(moment());
	const [createToas] = useToast();
	const [showErrors, setshowErrors] = useState<{
		meetingName: FieldErrorType;
		meetingUsers: FieldErrorType;
	}>({
		meetingName: {
			show: false,
			message: [],
		},
		meetingUsers: {
			show: false,
			message: [],
		},
	});

	const onUserChange = (selectedOptions: any) => {
		setSelectedUsers(selectedOptions);
	};

	const validateForm = () => {
		let errors = false;
		const clonedShowErrors = { ...showErrors };
		if (!meetingName.length) {
			clonedShowErrors.meetingName.show = true;
			clonedShowErrors.meetingName.message = ['Please Enter Meeting Name'];
			errors = true;
		} else {
			clonedShowErrors.meetingName.show = false;
			clonedShowErrors.meetingName.message = [];
		}
		if (!selectedUsers.length) {
			clonedShowErrors.meetingUsers.show = true;
			clonedShowErrors.meetingUsers.message = ['Please Select a User'];
		} else {
			clonedShowErrors.meetingUsers.show = false;
			clonedShowErrors.meetingUsers.message = [];
		}
		setshowErrors(clonedShowErrors);
		return errors;
	};

	const createMeeting = async () => {
		if (!validateForm()) {
			const meetingId = generateMeetingId();
			await addDoc(meetingsRef, {
				userId: uid,
				meetingId,
				psychologistId: selectedUsers[0].uid,
				meetingDate: startDate.format('L'),
				meetingHour: 11,
				status: true,
			});
			createToas({
				title: 'One on One Meeting Creatd Successfully.',
				type: 'success',
			});
		}
		navigate('/');
	};

	return (
		<div
			style={{
				display: 'flex',
				height: '100vh',
				flexDirection: 'column',
			}}
		>
			<Header />
			<EuiFlexGroup justifyContent='center' alignItems='center'>
				<EuiForm>
					<MeetingNameField
						label='Meeting Name'
						placeholder='Meeting Name'
						value={meetingName}
						setMeetingName={setMeetingName}
						isInvalid={showErrors.meetingName.show}
						error={showErrors.meetingName.message}
					/>
					<MeetingUsersField
						label='Invite User'
						options={users}
						onChange={onUserChange}
						selectedOptions={selectedUsers}
						singleSelection={{ asPlainText: true }}
						isClearable={false}
						placeholder='Select a user'
						isInvalid={showErrors.meetingUsers.show}
						error={showErrors.meetingUsers.message}
					/>
					<MeetingDateField selected={startDate} setStartDate={setStartDate} />
					<EuiSpacer />
					<CreateMeetingButton createMeeting={createMeeting} />
				</EuiForm>
			</EuiFlexGroup>
		</div>
	);
}

export default OneOnOneMeeting;
function generateMeetingID() {
	throw new Error('Function not implemented.');
}

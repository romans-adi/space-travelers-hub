import React from 'react';
import JoinedMissions from '../../components/Profile/JoinedMissions';
import './Profile.scss';
import AddedRockets from '../../components/Profile/AddedRockets';

const Profile = () => (
  <div className="profile">
    <JoinedMissions />
    <AddedRockets />
  </div>
);

export default Profile;

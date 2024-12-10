import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveAs } from 'file-saver';
import { importData } from '../redux/actions';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Navigator from './Navigator';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const Profile = () => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const beans = useSelector((state) => state.beans);
  const roasts = useSelector((state) => state.roasts);
  const cups = useSelector((state) => state.cups);
  const dispatch = useDispatch();

  const handleExportData = () => {
    const data = { beans, roasts, cups };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'BeanToCupData.json');
    setDialogMessage('Data exported successfully!');
    setDialogOpen(true);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedData = JSON.parse(e.target.result);
        dispatch(importData(importedData));
        setDialogMessage('Data imported successfully!');
        setDialogOpen(true);
      };
      reader.readAsText(file);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
      localStorage.setItem('user', JSON.stringify(codeResponse));
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      setDialogMessage('Login Failed with error: ' + error.error);
      setDialogOpen(true);
    }
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        })
        .then((res) => {
          setProfile(res.data);
          localStorage.setItem('profile', JSON.stringify(res.data));
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const logOut = () => {
    googleLogout();
    setProfile(null);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('profile');
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Navigator />
      <br />
      {profile?.name ? (
        <div style={{ textAlign: 'center' }}>
          <Avatar alt="Profile Picture" src={profile.picture} style={{ margin: '0 auto', width: '100px', height: '100px' }} />
          <br />
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button className="styled-button" onClick={logOut}>Log out</button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <button className="styled-button" onClick={login}>Sign in with Google 🚀</button>
        </div>
      )}
      <br />
        <button className="styled-button" style={{margin: '10px'}} onClick={handleExportData}>Export Data</button>
        <input
          type="file"
          accept="application/json"
          style={{ display: 'none' }}
          id="import-data"
          onChange={handleImportData}
        />
        <label htmlFor="import-data" className="styled-button">Import Data</label>
        <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogMessage}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Profile;
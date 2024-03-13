import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: grid;
`;

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;

    // Add an onerror handler to catch loading errors
    script.onerror = (error) => {
      console.error('Error loading Google API script:', error);
    };

    document.head.appendChild(script);

    script.onload = () => {
      window.gapi.load('auth2', () => {
        window.gapi.auth2.init({
          client_id: 'YOUR_GOOGLE_CLIENT_ID',
        });
      });
    };
  }, []);

  const handleSignInWithGoogle = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then((googleUser) => {
      const profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
      // You can now use the user information as needed
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ marginLeft: '200px' }}>
        <StyledContainer>
          <h4
            style={{
              textAlign: 'left',
              marginBottom: '8px',
              fontFamily: 'Lato',
            }}
          >
            Email
          </h4>
          <input
            type="text"
            id="username"
            style={{
              width: '395px',
              height: '40px',
              background: '#e0e0e0',
              border:'1px solid black',
            }}
          />
          <h4
            style={{
              textAlign: 'left',
              marginBottom: '8px',
              fontFamily: 'Lato',
            }}
          >
            Password
          </h4>
          <input
            type="password"
            id="password"
            style={{
              width: '395px',
              height: '40px',
              background: '#e0e0e0',
              border:'1px solid black',
              marginBottom: '20px',
            }}
          />
          <button className="login-button" onClick={() => {}}>
            Log in
          </button>
          <h4
            style={{
              textAlign: 'center',
              marginBottom: '2px',
              fontFamily: 'Lato',
            }}
          >
            OR
          </h4>
          <h5
            style={{
              textAlign: 'center',
              marginBottom: '8px',
              fontFamily: 'Lato',
            }}
          >
            Verify with  KMITL email
          </h5>
          <button
            className="google-signin-button"
            onClick={handleSignInWithGoogle}
          >
            Sign In With Google
          </button>
        </StyledContainer>
      </div>
    </div>
  );
}

export default App;

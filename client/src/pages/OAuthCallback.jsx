import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the code or token from the URL (if applicable)
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    
    // Handle the code or token (e.g., send it to your server for exchange)
    if (code) {
      // You may want to send this code to your server to exchange it for an access token
      // For example:
      // fetch('http://localhost:9999/auth/google/callback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code })
      // }).then(response => response.json()).then(data => {
      //   // Handle response from your server
      //   // E.g., store token and redirect user
      // });

      // Redirect to the home page or any other page
      navigate('/');
    }
  }, [navigate]);

  return (
    <div>
      <h1>Processing OAuth Callback...</h1>
      {/* You can include a loading spinner or message here */}
    </div>
  );
}

export default OAuthCallback;

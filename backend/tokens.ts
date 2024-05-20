export function storeTokens(accessToken: string, refreshToken: string) {
  try {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    console.log('Tokens stored successfully.');
  } catch (error) {
    console.error('Error storing tokens:', error);
  }
}


export function retrieveTokens() {
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return { accessToken, refreshToken };
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    return { accessToken: null, refreshToken: null };
  }
}

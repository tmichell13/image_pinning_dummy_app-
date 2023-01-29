export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== 'undefined' 
    ? JSON.parse(String(localStorage.getItem('user'))) 
    : localStorage.clear()
    return userInfo
} 
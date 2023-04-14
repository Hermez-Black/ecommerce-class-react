
export const getConfig = (tokenParam = null) => {
    let token = tokenParam ? tokenParam : localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } }
};
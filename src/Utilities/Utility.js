export const emailPattern =
  "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+(?:\\.[a-zA-Z0-9_!#$%&'*+/=?`{|}~^-]+)*@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$";

export const namePattern = "^[A-Za-z0-9]{3,30}";

export const passwordPattern =  "^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-@]{6,30}";


export const handleLogout = (setIsLoggedIn,history) => {
  localStorage.removeItem("userInfo");
  setIsLoggedIn(false);
  
  history.push("/");
};

export function dateFormat(date) {
  if(date == null){
    return null;
  }
  let dateFormat = new Date(date);

  let year = dateFormat.getFullYear();
  let month = dateFormat.getMonth() + 1;
  let day = dateFormat.getDate();

  let time =
    dateFormat.getHours() +
    ":" +
    dateFormat.getMinutes() +
    ":" +
    dateFormat.getSeconds();

  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return time + "  " + year + "-" + month + "-" + day;
}
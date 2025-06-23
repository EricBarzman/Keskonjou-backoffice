function firebaseTimeToJs(obj : { seconds : number}) {
  return new Date(obj.seconds * 1000);
}

export default firebaseTimeToJs;
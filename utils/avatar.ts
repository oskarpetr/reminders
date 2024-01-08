// get avatar with user id
export function getAvatar(id: number) {
  return `https://firebasestorage.googleapis.com/v0/b/reminders-oskarpetr.appspot.com/o/avatars%2F${id}?alt=media`;
}

export function getAvatar(id: number) {
  return `https://firebasestorage.googleapis.com/v0/b/reminders-oskarpetr.appspot.com/o/avatars%2F${id}?alt=media`;
}

export function getUserId(avatar: string) {
  return avatar.substring(88).split("?")[0];
}

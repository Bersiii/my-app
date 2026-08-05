export const blurhash = "LEHV6nWB2yk8pyo0adR*.7kCMdnj";

export const getRoomId = (userId1, userId2) => {
  const sortedIds = [userId1, userId2].sort();
  const roomId = sortedIds.join("-");
  return roomId;
};
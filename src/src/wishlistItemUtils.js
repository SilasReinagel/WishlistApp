
export const howManyAreYouGiving = (userId, row) => (row.item?.givers ?? []).filter(g => g.userId === userId).length;
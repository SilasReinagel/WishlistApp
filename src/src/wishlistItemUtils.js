
export const howManyAreYouGiving = (userId, row) => (row.item?.givers ?? []).filter(g => g.userId === userId).length;
export const howManyStillGivable = (row) => row.item.maxGivers - (row.item.givers?.length ?? 0);

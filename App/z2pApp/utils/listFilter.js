function listFilter(list1, list2) {
  const list1ItemIds = list1.map((item) => item.id);
  const updatedList2 = list2.filter((item) => !list1ItemIds.includes(item.id));
  return updatedList2;
}

export default listFilter;

var getLength = function (head) {
  count = 0;
  while (head != null) {
    count++;
    head = head.next;
  }
  return count;
};

var middleNode = function (head) {
  let iteration = Math.floor(getLength(head) / 2);
  for (let i = 0; i < iteration; i++) {
    head = head.next;
  }
  return head;
};

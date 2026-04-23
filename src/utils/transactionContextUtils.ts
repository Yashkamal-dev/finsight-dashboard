// month generater
export const monthStringGen = (date: Date) => {
  return date.toISOString().slice(0, 7);
};

// data fetcher from a month
export const getData = (month: string) => {
  const key = `Transactions_${month}`;

  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([]));
  }

  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

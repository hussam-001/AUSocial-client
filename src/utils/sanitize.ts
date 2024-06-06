export const cleanEmpty: any = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj
      .map((v) => (v && typeof v === "object" ? cleanEmpty(v) : v))
      .filter((v) => !(v == null));
  } else {
    return Object.entries(obj)
      .map(([k, v]) => [k, v && typeof v === "object" ? cleanEmpty(v) : v])
      .reduce(
        (a: any, [k, v]) => (v == null ? a : ((a[k] = v === "" ? null : v), a)),
        {}
      );
  }
};

export const getChangedValues = (oldData: any, newData: any) => {
  const changedValues = {} as any;

  for (const [key, value] of Object.entries(newData)) {
    if (oldData.hasOwnProperty(key) && oldData[key] !== value) {
      changedValues[key] = value;
    }
  }

  return changedValues;
};

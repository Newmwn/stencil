
export const createSTest = ({
  color,
  text,
}) => {
  const st = `<div style="color:${color}; border:1px solid">${text}</div>`
  return st;
};

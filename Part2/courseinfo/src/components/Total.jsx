const Total = ({ parts }) => {
  const sum = parts.reduce((acc, part) => {
    return acc + part.exercises;
  }, 0);

  return <b>Total of {sum} exercises</b>;
};

export default Total;

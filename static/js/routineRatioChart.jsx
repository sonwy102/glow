const RoutineRatioChart = (props) => {
  
  const data = {
      labels: props.routineRatioKeys,
      datasets: [
        {
          label: 'Routine',
          data: props.routineRatioValues
        }
      ]
  }
  return (
    <div className="routine-ratio-chart">
      <Doughnut data={data} />
    </div>
  );
}
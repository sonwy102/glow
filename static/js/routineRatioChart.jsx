const RoutineRatioChart = (props) => {
  
  const data = {
    labels: props.routineRatioKeys,
    datasets: [
      {
        label: "Routine",
        data: props.routineRatioValues,
        backgroundColor: ["#958079", "#442621"]
      },
    ],
  };

  const options = {
    legend: {
      position: "right",
    },
  };
  return (
    <div className="routine-ratio-chart">
      <Doughnut data={data} options={options} />
    </div>
  );
}
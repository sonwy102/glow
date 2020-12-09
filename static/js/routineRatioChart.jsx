const RoutineRatioChart = (props) => {
  
  const data = {
    // labels: props.routineRatioKeys,
    labels: ['AM', 'PM'],
    datasets: [
      {
        label: "Routine",
        // data: props.routineRatioValues,
        data: [45, 55],
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
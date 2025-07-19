function ProgressBar({ current, target }) {
  const percent = Math.min((current / target) * 100, 100);
  return (
    <div
      style={{ background: "#eee", borderRadius: 5, height: 10, width: "100%" }}
    >
      <div
        style={{
          width: `${percent}%`,
          background: percent === 100 ? "green" : "#007bff",
          height: "100%",
          borderRadius: 5,
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;

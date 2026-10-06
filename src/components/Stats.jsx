// One horizontal strip with the live statistics of the session
function Stats({ time, total, correct, incorrect, accuracy, cpm }) {
  return (
    <div className="stats-strip">
      <div className="stat">
        <div className="stat-label">Time</div>
        <div className="stat-value">{time}</div>
      </div>

      <div className="stat">
        <div className="stat-label">Characters</div>
        <div className="stat-value">{total}</div>
      </div>

      <div className="stat">
        <div className="stat-label">Correct</div>
        <div className="stat-value">{correct}</div>
      </div>

      <div className="stat">
        <div className="stat-label">Incorrect</div>
        <div className="stat-value">{incorrect}</div>
      </div>

      <div className="stat">
        <div className="stat-label">Accuracy</div>
        <div className="stat-value">{accuracy}%</div>
      </div>

      <div className="stat">
        <div className="stat-label">CPM</div>
        <div className="stat-value">{cpm}</div>
      </div>
    </div>
  )
}

export default Stats

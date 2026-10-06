// Which finger presses each home-row key
export const FINGERS = {
  a: 'Left pinky',
  s: 'Left ring',
  d: 'Left middle',
  f: 'Left index',
  j: 'Right index',
  k: 'Right middle',
  l: 'Right ring',
  ';': 'Right pinky',
}

const LEFT_KEYS = ['a', 's', 'd', 'f']
const RIGHT_KEYS = ['j', 'k', 'l', ';']

// Compact finger guide: two small rows, only the needed finger is highlighted
function FingerGuide({ nextKey }) {
  return (
    <div className="finger-guide">
      <div className="finger-row">
        {LEFT_KEYS.map((key) => (
          <span
            key={key}
            className={
              nextKey === key ? 'finger-item finger-item-active' : 'finger-item'
            }
          >
            {key.toUpperCase()} → {FINGERS[key]}
          </span>
        ))}
      </div>

      <div className="finger-row">
        {RIGHT_KEYS.map((key) => (
          <span
            key={key}
            className={
              nextKey === key ? 'finger-item finger-item-active' : 'finger-item'
            }
          >
            {key.toUpperCase()} → {FINGERS[key]}
          </span>
        ))}
      </div>
    </div>
  )
}

export default FingerGuide

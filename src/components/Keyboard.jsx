import { FINGERS } from './FingerGuide'

const LEFT_KEYS = ['a', 's', 'd', 'f']
const RIGHT_KEYS = ['j', 'k', 'l', ';']

// The 8 home-row keys, the next one to type is highlighted
function Keyboard({ nextKey }) {
  // Small indicator above the keyboard: which key comes next
  let displayKey = nextKey
  let fingerName = FINGERS[nextKey]

  if (nextKey === ' ') {
    displayKey = 'Space'
    fingerName = 'Either thumb'
  } else if (displayKey) {
    displayKey = displayKey.toUpperCase()
  }

  return (
    <div className="keyboard-block">
      <div className="next-key-indicator">
        <div className="next-key-line">
          <span className="next-key-label">NEXT KEY:</span>
          <span className="next-key-value">{displayKey}</span>
        </div>
        <div className="next-key-finger">{fingerName}</div>
      </div>

      {/* Left hand and right hand are kept apart */}
      <div className="keyboard">
        <div className="key-group">
          {LEFT_KEYS.map((key) => (
            <div
              key={key}
              className={nextKey === key ? 'key key-active' : 'key'}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>

        <div className="key-group">
          {RIGHT_KEYS.map((key) => (
            <div
              key={key}
              className={nextKey === key ? 'key key-active' : 'key'}
            >
              {key.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Keyboard

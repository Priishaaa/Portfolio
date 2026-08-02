import './marquee.css';

// A slow, continuous horizontal ticker. Used under the hero and in the
// footer -- the site's ambient, always-moving element so the page never
// feels static, without adding any visual noise.
export default function Marquee({ items = [], speed = 28, className = '' }){
  const track = [...items, ...items];

  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {track.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}
            <span className="marquee-dot">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
}

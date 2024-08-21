export default function PulsatingCircle(props: {
  className?: string;
  radius: number;
}) {
  return (
    <svg
      className={props.className}
      viewBox="0 0 400 400"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g transform="translate(200,200)">
        <circle
          id="core"
          cx="0"
          cy="0"
          r={props.radius}
          className="animate-pulse-2"
        ></circle>
        <circle
          id="radar"
          cx="0"
          cy="0"
          r={props.radius}
          className="animate-pulse-1"
        ></circle>
      </g>
    </svg>
  );
}

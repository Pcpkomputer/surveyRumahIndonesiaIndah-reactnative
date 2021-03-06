import * as React from "react"
import Svg, { Defs, Path } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: style, title */

const SvgComponent = (props) => (
  <Svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 128 128"
    {...props}
  >
    <Defs></Defs>
    <Path
      fill="#38d49f"
      className="cls-1"
      d="M93.036 39.806H57.884a2.224 2.224 0 1 0 0 4.448h35.152a2.224 2.224 0 0 0 0-4.448ZM57.884 58.814h18.745a2.224 2.224 0 0 0 0-4.448H57.884a2.224 2.224 0 1 0 0 4.448ZM44.468 44.121l-6.284 6.284-2.148-2.147a1.93 1.93 0 0 0-2.729 2.73l3.512 3.51a1.93 1.93 0 0 0 2.73 0l7.648-7.648a1.93 1.93 0 1 0-2.73-2.729ZM93.036 80.394H57.884a2.224 2.224 0 1 0 0 4.448h35.152a2.224 2.224 0 0 0 0-4.448ZM76.629 94.953H57.884a2.224 2.224 0 1 0 0 4.448h18.745a2.224 2.224 0 1 0 0-4.448ZM44.468 84.709l-6.284 6.284-2.148-2.148a1.93 1.93 0 0 0-2.729 2.73l3.512 3.511a1.93 1.93 0 0 0 2.73 0l7.648-7.648a1.93 1.93 0 1 0-2.73-2.73Z"
    />
    <Path
      d="M100.835 12.803h-15.03l-1.529-8.599a3.301 3.301 0 0 0-3.23-2.62H46.968a3.33 3.33 0 0 0-3.244 2.62l-1.528 8.6H27.165a13.069 13.069 0 0 0-13.052 13.051v87.508a13.078 13.078 0 0 0 13.052 13.052h73.67a13.069 13.069 0 0 0 13.052-13.052V25.855a13.06 13.06 0 0 0-13.052-13.052Zm-36.9-8.614a3.012 3.012 0 1 1-3.013 3.012 3.009 3.009 0 0 1 3.013-3.012Zm41.702 109.174a4.806 4.806 0 0 1-4.802 4.802h-73.67a4.806 4.806 0 0 1-4.802-4.802V25.855a4.819 4.819 0 0 1 4.802-4.816h13.561l-.014.015h46.576v-.015h13.547a4.819 4.819 0 0 1 4.802 4.816Z"
      style={{
        fill: "#2d3e50",
      }}
    />
  </Svg>
)

export default SvgComponent

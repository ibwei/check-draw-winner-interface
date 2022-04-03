import React from "react"
import ContentLoader from "react-content-loader"

const NumberLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={135}
    height={77}
    viewBox="0 0 135 77"
    backgroundColor="#222020"
    foregroundColor="#2F2F2F"
    {...props}
  >
    <rect x="0" y="0" rx="3" ry="3" width="135" height="77" style={{borderRadius: '8px'}}/> 
  </ContentLoader>
)

export default NumberLoader


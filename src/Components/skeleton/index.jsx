import React from "react"
import ContentLoader from "react-content-loader"

const ItemLoader = (props) => (
      <ContentLoader
            speed={2}
            width={359}
            height={509}
            viewBox="0 0 359 509"
            backgroundColor="#212120"
            foregroundColor="#212425"
            {...props}
      >
            <rect x="3" y="1" rx="0" ry="0" width="350" height="466" />
            <rect x="3" y="477" rx="0" ry="0" width="350" height="8" />
            <rect x="3" y="490" rx="0" ry="0" width="199" height="11" />
      </ContentLoader>
)

export default ItemLoader


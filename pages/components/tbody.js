import React from 'react';




function Tbody() {
  return (
    <div className="table-body mt-5">
      <div className="table-row">
        <div className="table-data col-rank">
          <div className="component-ranking-table-rank rank-1"><span className="current-rank">
            1
          </span>
            <span className="past-rank"></span>
          </div>
        </div>
        <div className="flex table-main">
          <div className="table-data col-name">
            <div className="component-ranking-table-name">
              <div className="icon-place mr-4">
                <div className="icon-wrapper">
                  <p>sd</p>
                  {/* <a className="icon-link">
                  <img src="..\images\nftonpulse-logo.png" className="icon-image" />
                </a> */}
                </div>
              </div>

              <div className="right-wrapper">
                <div className="top-wrapper">
                  <div className="name-description-wrapper">
                    <div className="name-description-top-wrapper">
                      <h4 className="name">
                        <a className="link">
                          NFTonPulse.io
                        </a>
                      </h4>
                    </div>
                    <p className="description">NFT Marketplace</p>
                  </div>
                </div>
                <div className="bottom-wrapper">
                  <div className="app-type bottom-partial">NFT</div>
                  <div className="category bottom-partial">MARKETPLACE</div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-data col-dau">
            <span className="col-title-mobile">Users 24h</span>
            <div className="component-ranking-table-value-pct">
              <span className="value">3,140,124</span>
              <div className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </div>
            </div>
          </div>
          <div className="table-data col-tx">
            <span className="col-title-mobile">Transactions 24h</span>
            <div className="component-ranking-table-value-pct">
              <span className="value">31,40,124</span>
              <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span>
            </div>
          </div>
          <div className="table-data col-vol">
            <span className="col-title-mobile">Volume 24h</span>
            <div className="component-ranking-table-volume">
              <span className="value">45,260 </span>
              <span className="pct is-negative">-9.00%</span>
            </div>
          </div>
          <div className="table-data col-vol col-vol-hbd">
            <span className="col-title-mobile">Volume HBD 24h</span>
            <div className="component-ranking-table-volume">
              <span className="value">93 HBD</span>
              <span className="pct is-positive">
                <span>^</span>
                154.80%
              </span>
            </div>
          </div>
          <div className="table-data col-rewards col-rewards-hive">
            <span className="col-title-mobile">Rewards 24h</span>
            <div className="component-ranking-table-volume">
              <span className="value">506</span>
              <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}


export default Tbody;
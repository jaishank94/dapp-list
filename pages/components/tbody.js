import React from 'react';




function Tbody(props) {



  function getDisplayType(val) {

    // let tot_count = val.length;
    // let count = "";
    // if (val.length > 2) {
    //   return count = val.length - tot_count;
    // }
    // return (
    //   <div className="app-type bottom-partial">{count}</div>
    // )

    let TypeLength = val.length;
    let TypeBadge = "";
    if (TypeLength > 2) {
      let restCount = TypeLength - 2;
      TypeBadge = val.slice(0, 2).map((type, index) => {
        return (
          <div className="app-type bottom-partial">{type}</div>
        );
      });
      return (
        <>
          {TypeBadge} <span className="line-h">+{restCount}</span>
        </>
      );
    } else {
      TypeBadge = val.map((type, index) => {
        return (
          <div className="app-type bottom-partial">{type}</div>
        );
      });
      return TypeBadge;
    }
  }



  return (
    <div className="table-body mt-5">
      <div className="table-row">
        <div className="table-data col-rank">
          <div className="component-ranking-table-rank rank-1"><span className="current-rank">
            {props.index}
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
                  <img src="https://images.hive.blog/u/splinterlands/avatar" className="icon-image" />
                </a> */}
                </div>
              </div>

              <div className="right-wrapper">
                <div className="top-wrapper">
                  <div className="name-description-wrapper">
                    <div className="name-description-top-wrapper">
                      <h4 className="name">
                        <a className="link">
                          {props.name}
                        </a>
                      </h4>
                    </div>
                    <p className="description">{props.short_description}</p>
                  </div>
                </div>
                <div className="bottom-wrapper">
                  {getDisplayType(props.types)}
                  {/* {props.types.map((res, i) => {
                    
                  })} */}
                </div>
              </div>
            </div>
          </div>
          <div className="table-data col-dau">
            <span className="col-title-mobile">Page Views</span>
            <div className="component-ranking-table-value-pct">
              <span className="value">-</span>
              {/* <div className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </div> */}
            </div>
          </div>
          <div className="table-data col-tx">
            <span className="col-title-mobile">Status</span>
            <div className="component-ranking-table-value-pct">
              <span className="value">{props.app_status}</span>
              {/* <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span> */}
            </div>
          </div>
          <div className="table-data col-vol">
            <span className="col-title-mobile">Ticker</span>
            <div className="component-ranking-table-volume">
              <span className="value">-</span>
              {/* <span className="pct is-negative">-9.00%</span> */}
            </div>
          </div>
          <div className="table-data col-vol col-vol-hbd">
            <span className="col-title-mobile">Sacrifice</span>
            <div className="component-ranking-table-volume">
              <span className="value">-</span>
              {/* <span className="pct is-positive">
                <span>^</span>
                154.80%
              </span> */}
            </div>
          </div>
          <div className="table-data col-rewards col-rewards-hive">
            <span className="col-title-mobile">Total Supply</span>
            <div className="component-ranking-table-volume">
              <span className="value">-</span>
              {/* <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span> */}
            </div>
          </div>
          <div className="table-data col-rewards col-rewards-hive">
            <span className="col-title-mobile">Vote</span>
            <div className="component-ranking-table-volume">
              <span className="value flex">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" />
                </svg>
              </span>
              {/* <span className="pct is-positive">
                <div className="is-positive-value">
                  <span>^</span>
                  11.40%
                </div>
              </span> */}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}


export default Tbody;
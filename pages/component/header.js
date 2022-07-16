import React, { Component, Fragment } from 'react';
import Image from 'next/image';
import logo from "/public/images/pp_final_icon_black.png"

class Header extends Component {
  render() {
    return (
      <Fragment>
        <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div className="flex items-center justify-between w-full md:w-auto">
              <a href="#">
                <Image
                  alt="logo"
                  width={50}
                  height={50}
                  className="rounded-t-lg"
                  src={logo}
                />
              </a>
              <p className="font-bold">PulseChainProjects.io</p>

            </div>
          </div>
        </nav>
      </Fragment>
    )
  }
}

export default Header;
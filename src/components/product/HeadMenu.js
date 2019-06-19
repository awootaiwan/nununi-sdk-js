import React from "react";

const HeadMenu = ( ) => {
    return (
        <div className="orders">
            <ul className="head-menu">
                <li className="head-menu-item"><a href=""><span>預設排序</span></a></li>
                <li className="head-menu-item"><a href=""><span>銷量排序</span></a></li>
                <li className="head-menu-item"><a href=""><span>新品上市</span></a></li>
                <li className="head-menu-item"><a href=""><span>價格由低到高</span></a></li>
                <li className="head-menu-item"><a href=""><span>價格由高到低</span></a></li>
            </ul>
        </div>
    )
}
export default HeadMenu;
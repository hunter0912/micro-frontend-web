import React from 'react';
import { withRouter } from "react-router-dom";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuArr: [
                {
                    menuId: "0",
                    menuName: "首页",
                    menuAddress: "#/main/home"
                },
                {
                    menuId: "1",
                    menuName: "产品管理",
                    menuAddress: "#/main/product"
                }
            ]
        };
        this.hasActive = false;
    };

    componentDidMount() {
        this.setDefaultActive();
    };

    componentDidUpdate() {
        this.setDefaultActive();
    };

    setDefaultActive() {
        if (!this.refs.menu.getElementsByClassName("app-menu-item is-active").length) {
            this.props.history.push(this.state.menuArr[0].menuAddress.replace("#/", ""));
        }
    };

    menuCssClass(menuInfo) {
        const cssClass = ["app-menu-item"];
        if (window.location.hash === menuInfo.menuAddress) {
            cssClass.push("is-active");
            this.hasActive = true;
        }

        return cssClass.join(" ");
    };

    menuClick(e) {
        _.each(this.refs.menu.getElementsByClassName("app-menu-item"), item => {
            item.classList.remove("is-active");
        });

        e.target.classList.add("is-active");
    };

    render() {
        return (
            <div className="app-menu" ref="menu">
                {
                    this.state.menuArr.map((menuInfo) => {
                        return (
                            <a
                                href={menuInfo.menuAddress}
                                className={this.menuCssClass(menuInfo)}
                                key={menuInfo.menuId}
                                onClick={(e) => this.menuClick(e)}
                            >
                                {menuInfo.menuName}
                            </a>
                        );
                    })
                }
            </div>
        );
    };
};

export default withRouter(Menu);
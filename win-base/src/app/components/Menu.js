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
                    menuAddress: "#/main/product1"
                }
            ]
        };
        this.hasActive = false;
    };

    componentDidMount() {
        this.setDefaultActive();
        this.checkOverflow();
    };

    componentDidUpdate() {
        this.setDefaultActive();
        this.checkOverflow();
    };

    // 设置默认选择项，默认选中第一个
    setDefaultActive() {
        if (!this.refs.menu.getElementsByClassName("app-menu-item is-active").length) {
            this.props.history.push(this.state.menuArr[0].menuAddress.replace("#/", ""));
        }
    };

    // 检查菜单内容是否溢出
    checkOverflow() {
        if (this.refs.navScroll.clientWidth > this.refs.menuContent.clientWidth) {
            this.refs.menuContent.style.margin = "0 20px";
            this.refs.menuContent.style.width = "calc(100% - 101px)";
            _.each(this.refs.menu.getElementsByClassName("nav-bar"), item => {
                item.style.display = "inline-block";
            });
        }
    };

    // 获取 transform 的值，并转换成 Numer
    getTransFormNum(transform) {
        return transform ? Number(transform.replace(/[^0-9\-,]/g, "")) : 0;
    };

    // 移动菜单内容
    moveContent(e, add) {
        const addX = 60;
        const maxX = this.refs.navScroll.clientWidth - this.refs.menuContent.clientWidth;
        const oldX = this.getTransFormNum(this.refs.navScroll.style.transform);
        if (add && !oldX || !add && -oldX > maxX) {
            return;
        }

        this.refs.navScroll.style.transform = `translateX(${oldX + (add ? addX : -addX)}px)`;
    };

    // 设置菜单样式 class
    setMenuCssClass(menuInfo) {
        const cssClass = ["app-menu-item"];
        if (window.location.hash === menuInfo.menuAddress) {
            cssClass.push("is-active");
            this.hasActive = true;
        }

        return cssClass.join(" ");
    };

    // 点击菜单
    menuClick(e) {
        _.each(this.refs.menu.getElementsByClassName("app-menu-item"), item => {
            item.classList.remove("is-active");
        });

        e.target.classList.add("is-active");
    };

    // 更多按钮
    moreClick() {
        const menuId = new Date().getTime()
        this.setState((prevState, props) => ({
            menuArr: [
                ...prevState.menuArr,
                {
                    menuId: menuId,
                    menuName: "产品管理",
                    menuAddress: "#/main/product" + menuId
                }
            ]
        }));
    };

    drawnSelect(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="app-menu" ref="menu">
                <span className="nav-bar prev" onClick={(e) => this.moveContent(e, true)}>{"<"}</span>
                <span className="nav-bar next" onClick={(e) => this.moveContent(e)}>{">"}</span>
                <div className="menu-content" ref="menuContent">
                    <div className="nav-scroll" ref="navScroll">
                        {
                            this.state.menuArr.map((menuInfo) => {
                                return (
                                    <a
                                        href={menuInfo.menuAddress}
                                        className={this.setMenuCssClass(menuInfo)}
                                        key={menuInfo.menuId}
                                        onClick={(e) => this.menuClick(e)}
                                        onContextMenu={(e) => this.drawnSelect(e)}
                                    >
                                        {menuInfo.menuName}
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
                <span className="menu-tools" onClick={(e) => { this.moreClick(e) }}>更多</span>
            </div>
        );
    };
};

export default withRouter(Menu);
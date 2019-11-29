import React from 'react';
import { withRouter } from "react-router-dom";
import Icon from "@lugia/lugia-web/dist/Icon";

class Menu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuArr: [
                {
                    menuId: "0",
                    menuName: "首页",
                    menuAddress: "/main/home"
                },
                {
                    menuId: "1",
                    menuName: "产品管理",
                    menuAddress: "/main/product1"
                }
            ]
        };
    };

    componentDidMount() {
        this.setDefaultActive();
        this.checkOverflow();
    };

    componentDidUpdate() {
        this.checkOverflow();
    };

    // 设置默认选择项，默认选中第一个
    setDefaultActive() {
        const oldPath = this.props.history.location.pathname;
        const hasActive = _.find(this.state.menuArr, v => {
            return oldPath === v.menuAddress;
        });

        // 已存在选中项
        if (!hasActive) {
            this.props.history.push(this.state.menuArr[0].menuAddress);
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

    // 移动视图区内容
    moveContent(e, add) {
        const addX = 60;
        const maxX = this.refs.navScroll.clientWidth - this.refs.menuContent.clientWidth;
        const oldX = this.getTransFormNum(this.refs.navScroll.style.transform);
        if (add && !oldX || !add && -oldX > maxX) {
            return;
        }

        this.refs.navScroll.style.transform = `translateX(${oldX + (add ? addX : -addX)}px)`;
    };

    // 点击菜单
    menuClick(e, menuInfo) {
        if (!e.target.classList.contains("app-menu-item")) {
            return;
        }

        _.each(this.refs.menu.getElementsByClassName("app-menu-item"), item => {
            item.classList.remove("is-active");
        });

        e.target.classList.add("is-active");
        this.props.history.push(menuInfo.menuAddress);
    };

    // 右键菜单功能
    onContextMenu(e) {
        e.preventDefault();
    }

    // 删除菜单
    removeMenu(e, menuInfo) {
        e.stopPropagation();

        const menuIndex = _.findIndex(this.state.menuArr, {
            menuId: menuInfo.menuId
        });

        this.setState((prevState, props) => {
            prevState.menuArr.splice(menuIndex, 1);

            const nexMenu = prevState.menuArr[menuIndex] ||
                prevState.menuArr[menuIndex - 1] ||
                prevState.menuArr[0];
            this.props.history.replace(nexMenu.menuAddress);

            return {
                menuArr: prevState.menuArr
            };
        });


    }

    // 更多按钮
    moreClick() {
        const menuId = new Date().getTime()
        this.setState((prevState, props) => ({
            menuArr: [
                ...prevState.menuArr,
                {
                    menuId: menuId,
                    menuName: "产品管理",
                    menuAddress: "/main/product" + menuId
                }
            ]
        }));
    };

    render() {
        return (
            <div className="app-menu" ref="menu">
                <span className="nav-bar prev" onClick={(e) => this.moveContent(e, true)}>{"<"}</span>
                <span className="nav-bar next" onClick={(e) => this.moveContent(e)}>{">"}</span>
                <div className="menu-content" ref="menuContent">
                    <div className="nav-scroll" ref="navScroll">
                        {
                            this.state.menuArr.map((menuInfo, index) => {
                                return (
                                    <span
                                        className={"app-menu-item " +
                                            (this.props.history.location.pathname === menuInfo.menuAddress ? "is-active" : "")}
                                        key={menuInfo.menuId}
                                        onClick={(e) => this.menuClick(e, menuInfo)}
                                        onContextMenu={(e) => this.onContextMenu(e)}
                                    >
                                        {menuInfo.menuName}
                                        {index > 0 && <Icon
                                            iconClass={"lugia-icon-reminder_close"}
                                            onClick={(e) => { this.removeMenu(e, menuInfo) }}
                                        />}
                                    </span>
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
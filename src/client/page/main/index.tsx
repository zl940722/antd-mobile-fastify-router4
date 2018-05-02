import React, {Component} from 'react'
import {observer, inject} from 'mobx-react'
import {IStore} from '../../store/types'
import {Drawer, List, NavBar, Icon} from 'antd-mobile'
import {mainStore, MainStore} from "../../store"
import * as style from './mainStyle.pcss'

@inject((allStores: IStore) => ({
    mainStore: allStores.mainStore
}))
@observer
export default class Main extends Component<{ mainStore: MainStore }, any> {

    public state = {
        open: true,
    };
    public onOpenChange = (...args) => {
        console.log(args);
        this.setState({open: !this.state.open});
    };

    public render() {
        const sidebar = (<List>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((i, index) => {
                if (index === 0) {
                    return (<List.Item key={index}
                                       thumb={require('./resource/img.jpg')}
                                       multipleLine={true}
                    >沙僧</List.Item>);
                }
                return (<List.Item key={index}
                                   thumb={require('./resource/img.jpg')}
                >沙僧{index}</List.Item>);
            })}
        </List>);

        return (<div>
            <NavBar icon={<Icon type="ellipsis"/>} onLeftClick={this.onOpenChange}> {mainStore.value}</NavBar>
            <Drawer
                className={style.myDrawer}
                style={{minHeight: document.documentElement.clientHeight}}
                contentStyle={{color: '#A6A6A6', textAlign: 'center', paddingTop: 42}}
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
            >
                {mainStore.value}
            </Drawer>
        </div>);
    }
}



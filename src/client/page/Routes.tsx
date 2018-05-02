/***
 * zl 2018/5/2 routes
 */
import React from 'react'
import LazyLoad from "page/LazyLoad";
import { map } from "lodash";

export interface Route {
  path: string;
  render: any;
}

export interface IRoutes {
  main:Route,
}

export const RouterConfig: IRoutes = {
    main: {
    path: '/main',
    render: (props) => {
      return (
        <LazyLoad {...props} component={import("./main")}/>
      )
    }
  }
};

export const routes: Route[] = map(RouterConfig, (item) => {
  return item;
});



